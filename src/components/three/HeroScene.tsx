"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Billboard,
  Environment,
  Float,
  Lightformer,
  PerformanceMonitor,
  Sparkles,
  Trail,
} from "@react-three/drei"
import { useTheme } from "next-themes"

const CYAN = "#22d3ee"
const VIOLET = "#a855f7"
const PINK = "#f472b6"

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const NEURAL_RADIUS = 1.15

/** Jittered Fibonacci sphere of nodes, each linked to its nearest neighbours. */
function buildNeural(count: number, neighbours: number) {
  const rand = seededRandom(5)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = golden * i + (rand() - 0.5) * 0.5
    nodes.push(
      new THREE.Vector3(Math.cos(theta) * ring, y, Math.sin(theta) * ring).multiplyScalar(NEURAL_RADIUS * (0.9 + rand() * 0.2)),
    )
  }

  const seen = new Set<string>()
  const edges: [number, number][] = []
  const adjacency: number[][] = nodes.map(() => [])
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
      .filter(({ j }) => j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, neighbours)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        edges.push([i, j])
        adjacency[i].push(j)
        adjacency[j].push(i)
      })
  })

  const nodePositions = new Float32Array(count * 3)
  const nodeScales = new Float32Array(count)
  const nodePhases = new Float32Array(count)
  nodes.forEach((n, i) => {
    n.toArray(nodePositions, i * 3)
    nodeScales[i] = 0.8 + Math.pow(rand(), 3) * 1.6
    nodePhases[i] = rand()
  })

  const linePositions = new Float32Array(edges.length * 6)
  const lineColors = new Float32Array(edges.length * 6)
  const top = new THREE.Color(CYAN)
  const bottom = new THREE.Color(VIOLET)
  const mixed = new THREE.Color()
  edges.forEach(([a, b], e) => {
    ;[a, b].forEach((n, end) => {
      nodes[n].toArray(linePositions, e * 6 + end * 3)
      mixed.copy(bottom).lerp(top, (nodes[n].y / NEURAL_RADIUS + 1) / 2)
      mixed.toArray(lineColors, e * 6 + end * 3)
    })
  })

  return { nodes, adjacency, nodePositions, nodeScales, nodePhases, linePositions, lineColors }
}

const NEURAL = buildNeural(160, 3)
const PULSE_COUNT = 46

const glowPointsVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uScan; // x: scan height in local space, y: strength
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float pulse = 0.7 + 0.3 * sin(uTime * (1.2 + aPhase * 2.0) + aPhase * 6.2831);
    float scan = uScan.y * smoothstep(0.18, 0.0, abs(position.y - uScan.x));
    gl_PointSize = uSize * aScale * (pulse + scan * 1.3) / -mvPosition.z;
    vAlpha = pulse + scan;
  }
`

const glowPointsFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uLight;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.2);
    float core = smoothstep(0.16, 0.0, d);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.7 * (1.0 - uLight)), (glow + core * 0.6) * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fresnelFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), uPower);
    gl_FragColor = vec4(uColor, rim * uIntensity);
    #include <colorspace_fragment>
  }
`

function useGlowMaterial(color: string, size: number, opacity: number, dark: boolean) {
  const dpr = useThree((state) => state.viewport.dpr)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: glowPointsVertex,
        fragmentShader: glowPointsFragment,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: size * dpr },
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
          uLight: { value: dark ? 0 : 1 },
          uScan: { value: new THREE.Vector2(0, 0) },
        },
        transparent: true,
        depthWrite: false,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    [color, size, opacity, dark, dpr],
  )
  useEffect(() => () => material.dispose(), [material])
  return material
}

function useFresnelMaterial(color: string, intensity: number, power: number, dark: boolean) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fresnelVertex,
        fragmentShader: fresnelFragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uPower: { value: power },
        },
        transparent: true,
        depthWrite: false,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    [color, intensity, power, dark],
  )
  useEffect(() => () => material.dispose(), [material])
  return material
}

const SHELL_RADIUS = NEURAL_RADIUS * 1.12

/** Height of the scanner plane in the sphere's local space. */
function scanHeight(time: number) {
  return Math.sin(time * 0.7) * SHELL_RADIUS * 0.92
}

const hudVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const hudRingFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uInner;
  uniform float uOuter;
  uniform float uMode;
  varying vec2 vPos;

  void main() {
    float a = atan(vPos.y, vPos.x) / 6.28318 + 0.5;
    float r = (length(vPos) - uInner) / (uOuter - uInner);
    float alpha;
    if (uMode < 0.5) {
      float dash = step(0.5, fract(a * 90.0 + uTime * 0.5)) * step(0.45, r);
      float tick = step(0.96, fract(a * 12.0));
      alpha = max(dash * 0.6, tick);
    } else {
      float seg = fract(a * 3.0 - uTime * 0.06);
      alpha = step(seg, 0.22) * (0.35 + 0.65 * smoothstep(0.22, 0.0, seg));
    }
    gl_FragColor = vec4(uColor, alpha * uOpacity);
    #include <colorspace_fragment>
  }
`

const scanDiscFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vPos;

  void main() {
    float r = length(vPos);
    float fill = pow(r, 3.0) * 0.28;
    float rings = step(0.94, fract(r * 5.0)) * 0.12;
    float rim = smoothstep(0.93, 1.0, r) * smoothstep(1.0, 0.985, r);
    gl_FragColor = vec4(uColor, (fill + rings + rim) * uOpacity);
    #include <colorspace_fragment>
  }
`

function useHudMaterial(fragmentShader: string, uniforms: Record<string, THREE.IUniform>, dark: boolean) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: hudVertex,
        fragmentShader,
        uniforms: { uTime: { value: 0 }, ...uniforms },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fragmentShader, dark],
  )
  useEffect(() => () => material.dispose(), [material])
  return material
}

const BRACKETS = (() => {
  const s = 1.78
  const l = 0.32
  const corners: [number, number][] = [[-1, 1], [1, 1], [1, -1], [-1, -1]]
  const out: number[] = []
  corners.forEach(([x, y]) => {
    out.push(x * s, y * s, 0, x * (s - l), y * s, 0)
    out.push(x * s, y * s, 0, x * s, y * (s - l), 0)
  })
  return new Float32Array(out)
})()

/** Holographic scanner around the neural sphere: HUD rings, a sweeping scan plane and target brackets. */
function ScannerHUD({ dark }: { dark: boolean }) {
  const equator = useRef<THREE.Mesh>(null!)
  const tilted = useRef<THREE.Mesh>(null!)
  const scan = useRef<THREE.Group>(null!)
  const brackets = useRef<THREE.LineBasicMaterial>(null!)

  const primary = dark ? CYAN : "#0891b2"
  const secondary = dark ? VIOLET : "#7c3aed"
  const dashed = useHudMaterial(
    hudRingFragment,
    {
      uColor: { value: new THREE.Color(primary) },
      uOpacity: { value: dark ? 0.75 : 0.8 },
      uInner: { value: 1.44 },
      uOuter: { value: 1.5 },
      uMode: { value: 0 },
    },
    dark,
  )
  const arcs = useHudMaterial(
    hudRingFragment,
    {
      uColor: { value: new THREE.Color(secondary) },
      uOpacity: { value: dark ? 0.9 : 0.85 },
      uInner: { value: 1.6 },
      uOuter: { value: 1.625 },
      uMode: { value: 1 },
    },
    dark,
  )
  const disc = useHudMaterial(
    scanDiscFragment,
    { uColor: { value: new THREE.Color(primary) }, uOpacity: { value: dark ? 1 : 0.7 } },
    dark,
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    dashed.uniforms.uTime.value = t
    arcs.uniforms.uTime.value = t
    equator.current.rotation.z += delta * 0.12
    tilted.current.rotation.z -= delta * 0.2

    const y = scanHeight(t)
    const radius = Math.sqrt(Math.max(SHELL_RADIUS * SHELL_RADIUS - y * y, 0.0001))
    scan.current.position.y = y
    scan.current.scale.set(radius, radius, radius)

    brackets.current.opacity = (dark ? 0.45 : 0.55) + Math.sin(t * 1.6) * 0.15
  })

  return (
    <>
      <mesh ref={equator} material={dashed} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.44, 1.5, 256, 1]} />
      </mesh>
      <group rotation={[-Math.PI / 2 + 0.55, 0.35, 0]}>
        <mesh ref={tilted} material={arcs}>
          <ringGeometry args={[1.6, 1.625, 256, 1]} />
        </mesh>
      </group>
      <group ref={scan}>
        <mesh material={disc} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1, 96]} />
        </mesh>
      </group>
      <Billboard>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[BRACKETS, 3]} />
          </bufferGeometry>
          <lineBasicMaterial ref={brackets} color={primary} transparent depthWrite={false} toneMapped={false} />
        </lineSegments>
      </Billboard>
    </>
  )
}

/** AI "brain": a glowing network of nodes with signals travelling along its links. */
function NeuralCore({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const pulseGeometry = useRef<THREE.BufferGeometry>(null!)
  const [hovered, setHovered] = useState(false)
  const speed = useRef(1)

  const nodeMaterial = useGlowMaterial(dark ? "#bdf4ff" : "#6d28d9", 30, dark ? 1 : 0.9, dark)
  const pulseMaterial = useGlowMaterial(dark ? "#ffffff" : "#0e7490", 52, 1, dark)
  const shellMaterial = useFresnelMaterial(dark ? VIOLET : "#6d28d9", dark ? 0.9 : 0.8, 2.6, dark)
  const coreMaterial = useFresnelMaterial(dark ? CYAN : "#0e7490", dark ? 2.4 : 1.3, 1.1, dark)
  const coreHalo = useGlowMaterial(dark ? CYAN : "#0891b2", 1250, dark ? 0.75 : 0.25, dark)

  const pulses = useMemo(() => {
    const rand = seededRandom(17)
    const from = new Int32Array(PULSE_COUNT)
    const to = new Int32Array(PULSE_COUNT)
    const progress = new Float32Array(PULSE_COUNT)
    const rate = new Float32Array(PULSE_COUNT)
    for (let i = 0; i < PULSE_COUNT; i++) {
      from[i] = Math.floor(rand() * NEURAL.nodes.length)
      const options = NEURAL.adjacency[from[i]]
      to[i] = options[Math.floor(rand() * options.length)]
      progress[i] = rand()
      rate[i] = 0.6 + rand() * 0.9
    }
    return {
      from,
      to,
      progress,
      rate,
      positions: new Float32Array(PULSE_COUNT * 3),
      scales: new Float32Array(PULSE_COUNT).fill(1),
      phases: new Float32Array(PULSE_COUNT).map((_, i) => i / PULSE_COUNT),
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    speed.current = THREE.MathUtils.damp(speed.current, hovered ? 2.4 : 1, 4, delta)
    nodeMaterial.uniforms.uTime.value = t
    pulseMaterial.uniforms.uTime.value = t
    coreHalo.uniforms.uTime.value = t * 0.5
    nodeMaterial.uniforms.uScan.value.set(scanHeight(t), 1)

    const g = group.current
    g.rotation.y += delta * 0.16 * speed.current
    g.rotation.x = Math.sin(t * 0.2) * 0.15
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, hovered ? 1.08 : 1, 5, delta))

    const { from, to, progress, rate, positions } = pulses
    for (let i = 0; i < PULSE_COUNT; i++) {
      progress[i] += delta * rate[i] * speed.current
      if (progress[i] >= 1) {
        progress[i] -= 1
        from[i] = to[i]
        const options = NEURAL.adjacency[from[i]]
        to[i] = options[Math.floor(Math.random() * options.length)]
      }
      const a = NEURAL.nodes[from[i]]
      const b = NEURAL.nodes[to[i]]
      const p = progress[i]
      positions[i * 3] = a.x + (b.x - a.x) * p
      positions[i * 3 + 1] = a.y + (b.y - a.y) * p
      positions[i * 3 + 2] = a.z + (b.z - a.z) * p
    }
    pulseGeometry.current.attributes.position.needsUpdate = true
  })

  return (
    <group ref={group}>
      <ScannerHUD dark={dark} />
      <mesh material={shellMaterial} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[NEURAL_RADIUS * 1.12, 64, 64]} />
      </mesh>
      <mesh material={coreMaterial}>
        <sphereGeometry args={[0.48, 48, 48]} />
      </mesh>
      <points material={coreHalo}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[SINGLE_POINT.position, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[SINGLE_POINT.scale, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[SINGLE_POINT.phase, 1]} />
        </bufferGeometry>
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NEURAL.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[NEURAL.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          color={dark ? "#ffffff" : "#8a8a8a"}
          transparent
          opacity={dark ? 0.45 : 0.75}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
          toneMapped={false}
        />
      </lineSegments>
      <points material={nodeMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NEURAL.nodePositions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[NEURAL.nodeScales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[NEURAL.nodePhases, 1]} />
        </bufferGeometry>
      </points>
      <points material={pulseMaterial}>
        <bufferGeometry ref={pulseGeometry}>
          <bufferAttribute attach="attributes-position" args={[pulses.positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[pulses.scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[pulses.phases, 1]} />
        </bufferGeometry>
      </points>
    </group>
  )
}

const SINGLE_POINT = {
  position: new Float32Array(3),
  scale: new Float32Array([1]),
  phase: new Float32Array([0.35]),
}

interface MoonProps {
  orbit: number
  angle: number
  size: number
  color: string
  dark: boolean
  ringed?: boolean
}

/** A glowing moon riding its parent orbit ring, leaving a fading light trail. */
function Moon({ orbit, angle, size, color, dark, ringed = false }: MoonProps) {
  const halo = useGlowMaterial(color, size * 5200, dark ? 0.85 : 0.5, dark)
  useFrame((state) => {
    halo.uniforms.uTime.value = state.clock.elapsedTime
  })
  const position: [number, number, number] = [Math.cos(angle) * orbit, Math.sin(angle) * orbit, 0]

  return (
    <>
      <Trail width={size * 14} length={5} color={color} attenuation={(t) => t * t} decay={1.2}>
        <mesh position={position}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={dark ? 1.6 : 0.6} roughness={0.35} toneMapped={false} />
        </mesh>
      </Trail>
      <group position={position}>
        <points material={halo}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[SINGLE_POINT.position, 3]} />
            <bufferAttribute attach="attributes-aScale" args={[SINGLE_POINT.scale, 1]} />
            <bufferAttribute attach="attributes-aPhase" args={[SINGLE_POINT.phase, 1]} />
          </bufferGeometry>
        </points>
        {ringed && (
          <mesh rotation={[1.1, 0.3, 0]}>
            <ringGeometry args={[size * 1.45, size * 2.1, 64]} />
            <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.55} toneMapped={false} />
          </mesh>
        )}
      </group>
    </>
  )
}

/** Orbit rings with moons travelling along them. */
function Rings({ dark }: { dark: boolean }) {
  const a = useRef<THREE.Mesh>(null!)
  const b = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    a.current.rotation.z += delta * 0.32
    b.current.rotation.z -= delta * 0.22
  })
  const cyan = dark ? CYAN : "#0891b2"
  const violet = dark ? VIOLET : "#7c3aed"
  const pink = dark ? PINK : "#db2777"
  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.05, 0.012, 16, 160]} />
        <meshBasicMaterial color={cyan} toneMapped={false} transparent opacity={0.85} />
        <Moon orbit={2.05} angle={0} size={0.13} color={cyan} dark={dark} />
        <Moon orbit={2.05} angle={Math.PI * 0.9} size={0.085} color={violet} dark={dark} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[2.45, 0.008, 16, 160]} />
        <meshBasicMaterial color={violet} toneMapped={false} transparent opacity={dark ? 0.7 : 0.8} />
        <Moon orbit={2.45} angle={Math.PI * 0.4} size={0.16} color={pink} dark={dark} ringed />
      </mesh>
    </group>
  )
}

const cometFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    float tail = pow(vUv.x, 2.6);
    float across = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float width = smoothstep(0.0, 1.0, across) * mix(0.25, 1.0, vUv.x);
    float head = smoothstep(0.9, 1.0, vUv.x) * smoothstep(0.45, 1.0, across);
    vec3 col = mix(uColor, vec3(1.0), head + tail * 0.4);
    gl_FragColor = vec4(col, (tail * width + head) * uAlpha);
    #include <colorspace_fragment>
  }
`

/** Occasional shooting star streaking across the background. */
function Comet({ dark }: { dark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: siriusVertex,
        fragmentShader: cometFragment,
        uniforms: {
          uColor: { value: new THREE.Color(dark ? "#bfe9ff" : "#6d28d9") },
          uAlpha: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    [dark],
  )
  useEffect(() => () => material.dispose(), [material])
  const state = useRef({ wait: 2.5, t: 0, active: false, duration: 1.3, from: new THREE.Vector3(), dir: new THREE.Vector3() })

  useFrame((_, delta) => {
    const s = state.current
    const m = mesh.current
    if (!s.active) {
      s.wait -= delta
      if (s.wait > 0) return
      const leftToRight = Math.random() < 0.5
      s.from.set(leftToRight ? -3.6 : 3.6, 1.2 + Math.random() * 1.6, -2.5)
      s.dir.set(leftToRight ? 1 : -1, -(0.35 + Math.random() * 0.35), 0).normalize()
      s.duration = 1.1 + Math.random() * 0.6
      s.t = 0
      s.active = true
      m.rotation.z = Math.atan2(s.dir.y, s.dir.x)
    }
    s.t += delta
    const p = s.t / s.duration
    m.position.copy(s.from).addScaledVector(s.dir, p * 6.5)
    material.uniforms.uAlpha.value = Math.sin(Math.min(p, 1) * Math.PI)
    if (p >= 1) {
      s.active = false
      s.wait = 5 + Math.random() * 5
      material.uniforms.uAlpha.value = 0
    }
  })

  return (
    <mesh ref={mesh} material={material} position={[0, 0, -10]}>
      <planeGeometry args={[1.9, 0.05]} />
    </mesh>
  )
}

const GALAXY_INNER = 1.45
const GALAXY_OUTER = 2.85

interface GalaxyOptions {
  count: number
  seed: number
  arms: number
  spin: number
  randomness: number
  minScale: number
  maxScale: number
  colors: string[]
}

/** Deterministic spiral-arm galaxy: positions, per-star colour, size and twinkle phase. */
function buildGalaxy({ count, seed, arms, spin, randomness, minScale, maxScale, colors }: GalaxyOptions) {
  const rand = seededRandom(seed)
  const jitter = (radius: number) => Math.pow(rand(), 3) * (rand() < 0.5 ? 1 : -1) * randomness * radius
  const palette = colors.map((c) => new THREE.Color(c))
  const position = new Float32Array(count * 3)
  const color = new Float32Array(count * 3)
  const scale = new Float32Array(count)
  const phase = new Float32Array(count)
  const mixed = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const t = Math.pow(rand(), 1.4)
    const radius = GALAXY_INNER + t * (GALAXY_OUTER - GALAXY_INNER)
    const angle = ((i % arms) / arms) * Math.PI * 2 + radius * spin
    position[i * 3] = Math.cos(angle) * radius + jitter(radius)
    position[i * 3 + 1] = jitter(radius) * 0.25
    position[i * 3 + 2] = Math.sin(angle) * radius + jitter(radius)

    const scaled = t * (palette.length - 1)
    const from = Math.min(Math.floor(scaled), palette.length - 2)
    mixed.copy(palette[from]).lerp(palette[from + 1], scaled - from)
    color.set([mixed.r, mixed.g, mixed.b], i * 3)

    scale[i] = minScale + Math.pow(rand(), 4) * (maxScale - minScale)
    phase[i] = rand()
  }
  return { position, color, scale, phase }
}

const STARS_SHAPE = { count: 4200, seed: 11, arms: 3, spin: 1.6, randomness: 0.32, minScale: 0.5, maxScale: 2.6 }
const DUST_SHAPE = { count: 420, seed: 29, arms: 3, spin: 1.6, randomness: 0.45, minScale: 4, maxScale: 8 }

const STARS = buildGalaxy({ ...STARS_SHAPE, colors: ["#e0fbff", CYAN, VIOLET, PINK] })
const DUST = buildGalaxy({ ...DUST_SHAPE, colors: [CYAN, VIOLET, PINK, PINK] })
const STARS_LIGHT = buildGalaxy({ ...STARS_SHAPE, colors: ["#0e7490", "#0891b2", "#7c3aed", "#db2777"] })
const DUST_LIGHT = buildGalaxy({ ...DUST_SHAPE, colors: ["#0891b2", "#7c3aed", "#db2777", "#db2777"] })

const galaxyVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uInner;
  uniform float uOuter;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float twinkle = 0.6 + 0.4 * sin(uTime * (0.8 + aPhase * 2.2) + aPhase * 6.2831);
    gl_PointSize = uSize * aScale * (0.75 + 0.25 * twinkle) / -mvPosition.z;

    float radius = length(position.xz);
    float edgeFade = 1.0 - smoothstep(uOuter * 0.78, uOuter * 1.05, radius);
    float innerFade = smoothstep(uInner * 0.85, uInner * 1.1, radius);
    vAlpha = edgeFade * innerFade * twinkle;
    vColor = aColor;
  }
`

const galaxyFragment = /* glsl */ `
  uniform float uOpacity;
  uniform float uLight;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.4);
    float core = smoothstep(0.14, 0.0, d);
    gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.65 * (1.0 - uLight)), (glow + core * 0.6) * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`

function GalaxyLayer({ data, size, opacity, dark }: { data: ReturnType<typeof buildGalaxy>; size: number; opacity: number; dark: boolean }) {
  const dpr = useThree((state) => state.viewport.dpr)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: galaxyVertex,
        fragmentShader: galaxyFragment,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: size * dpr },
          uOpacity: { value: dark ? opacity : Math.min(opacity * 1.3, 1) },
          uLight: { value: dark ? 0 : 1 },
          uInner: { value: GALAXY_INNER },
          uOuter: { value: GALAXY_OUTER },
        },
        transparent: true,
        depthWrite: false,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    [size, opacity, dark, dpr],
  )
  useEffect(() => () => material.dispose(), [material])
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.position, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.color, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[data.scale, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[data.phase, 1]} />
      </bufferGeometry>
    </points>
  )
}

function Galaxy({ dark }: { dark: boolean }) {
  const spin = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    spin.current.rotation.y += delta * 0.07
  })
  return (
    <group rotation={[0.55, 0, 0.2]}>
      <group ref={spin}>
        <GalaxyLayer key={`dust-${dark}`} data={dark ? DUST : DUST_LIGHT} size={30} opacity={0.09} dark={dark} />
        <GalaxyLayer key={`stars-${dark}`} data={dark ? STARS : STARS_LIGHT} size={26} opacity={1} dark={dark} />
      </group>
    </group>
  )
}

const siriusVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const siriusFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uWhite;
  varying vec2 vUv;

  float spike(vec2 p, float width, float len) {
    return (width / (abs(p.y) + width)) * smoothstep(len, 0.0, abs(p.x));
  }

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p);

    float core = smoothstep(0.06, 0.0, d);
    float glow = (0.024 / (d + 0.006)) * smoothstep(0.5, 0.06, d);

    float spikes = spike(p, 0.0022, 0.5) + spike(p.yx, 0.0022, 0.5);
    vec2 r = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
    float diag = (spike(r, 0.0014, 0.24) + spike(r.yx, 0.0014, 0.24)) * 0.45;

    float twinkle = 0.82 + 0.18 * sin(uTime * 3.1) * sin(uTime * 1.7 + 1.3);
    float intensity = (core + glow + spikes * 0.6 + diag) * twinkle;

    vec3 shimmer = uColor + 0.14 * vec3(sin(uTime * 5.0), sin(uTime * 4.3 + 2.0), sin(uTime * 3.7 + 4.0));
    vec3 col = mix(shimmer, vec3(1.0), clamp(core + glow * 0.3, 0.0, 1.0) * uWhite);
    gl_FragColor = vec4(col, clamp(intensity, 0.0, 1.0));
    #include <colorspace_fragment>
  }
`

/** Sirius: a bright, scintillating blue-white star with diffraction spikes. */
function Sirius({ dark }: { dark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: siriusVertex,
        fragmentShader: siriusFragment,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(dark ? "#bfe3ff" : "#3b6cff") },
          uWhite: { value: dark ? 0.9 : 0.25 },
        },
        transparent: true,
        depthWrite: false,
        blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    [dark],
  )
  useEffect(() => () => material.dispose(), [material])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    material.uniforms.uTime.value = t
    mesh.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.06)
    mesh.current.rotation.z = Math.sin(t * 0.25) * 0.08
  })

  return (
    <Float speed={1.6} rotationIntensity={0} floatIntensity={1.2}>
      <Billboard position={[2.1, 1.2, -0.4]}>
        <mesh ref={mesh} material={material}>
          <planeGeometry args={[1.8, 1.8]} />
        </mesh>
      </Billboard>
    </Float>
  )
}

/** Tilts the whole scene toward the pointer and drifts it as the hero scrolls away. */
function PointerRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((state, delta) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1)
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.45 + scroll * 0.9, 2.5, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.3 + scroll * 0.5, 2.5, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 0.8, 3, delta)
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1 - scroll * 0.15, 3, delta))
  })
  return <group ref={group}>{children}</group>
}

function Studio() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} color={CYAN} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={3} color={VIOLET} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={2} />
        <Lightformer form="ring" intensity={3} color={PINK} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={8} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[-5, -1, -1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
      </group>
    </Environment>
  )
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const [dpr, setDpr] = useState(1.5)
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== "light"

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const mount = () => setEventSource(document.body)
    const hasIdle = typeof window.requestIdleCallback === "function"
    const idle = hasIdle ? window.requestIdleCallback(mount, { timeout: 1200 }) : setTimeout(mount, 300)
    const el = wrapper.current
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    if (el) observer.observe(el)
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle as number)
      else clearTimeout(idle)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapper} className={`h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
      {eventSource && (
        <Canvas
          onCreated={() => requestAnimationFrame(() => setReady(true))}
          eventSource={eventSource}
          eventPrefix="client"
          dpr={[1, dpr]}
          camera={{ position: [0, 0, 7.4], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={!visible ? "never" : reduceMotion ? "demand" : "always"}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} flipflops={3} onFallback={() => setDpr(1)} />
          <ambientLight intensity={dark ? 0.3 : 0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <Studio />
          <PointerRig>
            <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
              <NeuralCore dark={dark} />
            </Float>
            <Rings dark={dark} />
            <Galaxy dark={dark} />
            <Sirius dark={dark} />
          </PointerRig>
          <Comet dark={dark} />
          <Sparkles count={70} scale={[7, 5, 4]} size={2.2} speed={0.35} color={dark ? CYAN : "#7c3aed"} opacity={0.8} />
        </Canvas>
      )}
    </div>
  )
}
