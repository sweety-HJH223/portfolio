"use client"

import React, { useEffect, useId, useState } from "react"
import { motion } from "framer-motion"

export type RobotState =
  | "idle" | "typing" | "thinking" | "replying" | "greeting"
  | "sleepy" | "lying" | "winking" | "heart" | "waving"
  | "peeking" | "dancing" | "singing" | "eating" | "spinning" | "blinking"
  | "bounce" | "roll"

const EYE = "#67e8f9"
const EYE_HOT = "#f472b6"

function getBodyMotion(state: RobotState) {
  switch (state) {
    case "dancing":  return { rotate: [0, -12, 12, -12, 12, 0], y: [0, -10, 0, -10, 0], x: [0, 6, -6, 6, -6, 0] }
    case "singing":  return { y: [0, -6, 0, -6, 0], rotate: [0, -6, 6, -6, 0] }
    case "eating":   return { y: [0, -4, 0, -4, 0], scale: [1, 1.06, 1, 1.06, 1] }
    case "spinning": return { rotate: [0, 360] }
    case "lying":    return { rotate: 80, y: 40, x: 12, scale: [1, 1.03, 1] }
    case "sleepy":   return { rotate: [0, 4, -4, 4, 0], y: [0, 3, 0, 3, 0] }
    case "waving":   return { rotate: [0, -5, 5, -5, 0], y: [0, -3, 0] }
    case "bounce":   return { y: [0, -36, 0, -20, 0], scaleY: [1, 0.75, 1.2, 0.9, 1], scaleX: [1, 1.2, 0.85, 1.05, 1] }
    case "roll":     return { rotate: [0, 360, 720], x: [0, 18, -18, 0] }
    case "idle":     return { y: [0, -6, 0], rotate: [0, 1.5, 0, -1.5, 0] }
    default:         return { y: [0, -5, 0] }
  }
}

/**
 * Glossy floating companion bot. Hovers instead of walking, with a dark glass
 * visor whose glowing LED eyes change shape with mood.
 */
export function RobotIcon({
  state,
  size = 90,
  isTyping = false,
  isReplying = false,
  isHovered = false,
}: {
  state: RobotState
  size?: number
  isTyping?: boolean
  isReplying?: boolean
  isHovered?: boolean
}) {
  const uid = useId().replace(/:/g, "")
  const id = (name: string) => `${name}-${uid}`
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setLook({
        x: Math.max(-4, Math.min(4, (e.clientX / window.innerWidth - 0.5) * 8)),
        y: Math.max(-2.5, Math.min(2.5, (e.clientY / window.innerHeight - 0.5) * 5)),
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        schedule()
      }, 2200 + Math.random() * 2800)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [])

  const isHeart = state === "heart" || (isHovered && !isTyping)
  const isSleepy = state === "lying" || state === "sleepy"
  const isHappy = state === "dancing" || state === "waving" || state === "greeting" || state === "bounce"
  const blushOpacity = isHeart || isHappy ? 0.75 : 0.4
  const ex = look.x
  const ey = look.y

  const renderEyes = () => {
    if (isHeart) {
      const heart = (cx: number) =>
        `M${cx} ${44} c-1.6 -3.2 -7.2 -3 -7.2 1.6 c0 3.4 4.4 6.2 7.2 8.4 c2.8 -2.2 7.2 -5 7.2 -8.4 c0 -4.6 -5.6 -4.8 -7.2 -1.6 z`
      return (
        <g filter={`url(#${id("glow")})`}>
          <motion.path d={heart(38)} fill={EYE_HOT} animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
          <motion.path d={heart(62)} fill={EYE_HOT} animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }} />
        </g>
      )
    }
    if (isReplying) {
      const spiral = (cx: number, dir: number) => (
        <motion.g animate={{ rotate: 360 * dir }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
          <path d={`M${cx} 46 m0 -5 a5 5 0 1 1 -4.5 3 a3 3 0 1 1 2.7 -1.8`} stroke={EYE} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </motion.g>
      )
      return <g filter={`url(#${id("glow")})`}>{spiral(38, 1)}{spiral(62, -1)}</g>
    }
    if (isSleepy) {
      return (
        <g filter={`url(#${id("glow")})`} stroke={EYE} strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M32 47 Q38 50 44 47" />
          <path d="M56 47 Q62 50 68 47" />
        </g>
      )
    }
    if (state === "winking") {
      return (
        <g filter={`url(#${id("glow")})`}>
          <rect x={34 + ex} y={40 + ey} width="8" height="12" rx="4" fill={EYE} />
          <path d="M56 47 Q62 41 68 47" stroke={EYE} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>
      )
    }
    if (isHappy) {
      return (
        <g filter={`url(#${id("glow")})`} stroke={EYE} strokeWidth="2.8" strokeLinecap="round" fill="none">
          <path d="M32 48 Q38 40 44 48" />
          <path d="M56 48 Q62 40 68 48" />
        </g>
      )
    }
    const w = isTyping ? 10 : 8
    const h = blink ? 1.5 : isTyping ? 14 : 12
    return (
      <g filter={`url(#${id("glow")})`}>
        <rect x={38 - w / 2 + ex} y={46 - h / 2 + ey} width={w} height={h} rx={w / 2} fill={EYE} />
        <rect x={62 - w / 2 + ex} y={46 - h / 2 + ey} width={w} height={h} rx={w / 2} fill={EYE} />
        {!blink && (
          <>
            <circle cx={36.5 + ex} cy={43 + ey} r="1.4" fill="#ffffff" />
            <circle cx={60.5 + ex} cy={43 + ey} r="1.4" fill="#ffffff" />
          </>
        )}
      </g>
    )
  }

  const renderMouth = () => {
    if (isSleepy) return <path d="M47 58 Q50 59 53 58" stroke={EYE} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
    if (isTyping || state === "singing" || state === "eating") {
      return (
        <motion.ellipse cx="50" cy="58.5" rx="3.2" ry="2.4" fill={EYE} filter={`url(#${id("glow")})`}
          animate={{ scaleY: [0.67, 1.42, 0.67] }} transition={{ repeat: Infinity, duration: state === "singing" ? 0.5 : 0.35 }} />
      )
    }
    const d = isHeart || isHappy ? "M44 56.5 Q50 62.5 56 56.5" : "M45.5 57 Q50 60.5 54.5 57"
    return <path d={d} stroke={EYE} strokeWidth="2.2" strokeLinecap="round" fill="none" filter={`url(#${id("glow")})`} />
  }

  const armWave = state === "waving" || state === "greeting"
  const leftArm = armWave ? { rotate: [0, -50, -20, -50, 0] } : state === "dancing" ? { rotate: [0, 25, -15, 25, 0] } : { rotate: [0, 6, 0] }
  const rightArm = state === "dancing" ? { rotate: [0, -25, 15, -25, 0] } : state === "eating" ? { rotate: [0, -35, 0, -35, 0] } : { rotate: [0, -6, 0] }

  return (
    <motion.div
      animate={getBodyMotion(state)}
      transition={{ repeat: Infinity, duration: state === "spinning" ? 0.9 : state === "idle" ? 3 : 1.8, ease: "easeInOut" }}
      style={{ width: size, height: size * 1.3 }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={id("shell")} cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef0fb" />
            <stop offset="100%" stopColor="#b9bfdc" />
          </radialGradient>
          <radialGradient id={id("body")} cx="38%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e7e9f8" />
            <stop offset="100%" stopColor="#a9b0d3" />
          </radialGradient>
          <linearGradient id={id("visor")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#070a1c" />
          </linearGradient>
          <linearGradient id={id("ear")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id={id("bulb")} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff1f8" />
            <stop offset="45%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
          <radialGradient id={id("jet")} cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={id("soft")} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#312e81" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <motion.ellipse
          cx="50" cy="125" rx="20" ry="3.5" fill="#000" opacity="0.25"
          animate={{ scaleX: [1, 0.8, 1], opacity: [0.25, 0.15, 0.25] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Hover jet glow */}
        <motion.ellipse
          cx="50" cy="111" rx="10" ry="9" fill={`url(#${id("jet")})`}
          animate={{ scaleY: [0.89, 1.22, 0.89], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
        />

        {/* Body */}
        <g filter={`url(#${id("soft")})`}>
          <path d="M30 82 C30 70 70 70 70 82 L68 98 C66 108 34 108 32 98 Z" fill={`url(#${id("body")})`} />
          <ellipse cx="42" cy="80" rx="6" ry="3" fill="#ffffff" opacity="0.8" />
          {/* Chest light */}
          <motion.circle
            cx="50" cy="90" r="4.5" fill={isHeart ? EYE_HOT : EYE} filter={`url(#${id("glow")})`}
            animate={{ opacity: [0.6, 1, 0.6], scale: isTyping ? [1, 1.25, 1] : [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: isTyping ? 0.4 : 1.6 }}
          />
        </g>

        {/* Arms (floating mittens) */}
        <motion.g animate={leftArm} transition={{ repeat: Infinity, duration: armWave ? 1 : 2.4 }} style={{ originX: 0.9, originY: 0.1 }}>
          <ellipse cx="22" cy="90" rx="6" ry="8.5" transform="rotate(18 22 90)" fill={`url(#${id("shell")})`} filter={`url(#${id("soft")})`} />
          <ellipse cx="20.5" cy="86" rx="2" ry="3" fill="#ffffff" opacity="0.9" />
        </motion.g>
        <motion.g animate={rightArm} transition={{ repeat: Infinity, duration: 2.4 }} style={{ originX: 0.1, originY: 0.1 }}>
          <ellipse cx="78" cy="90" rx="6" ry="8.5" transform="rotate(-18 78 90)" fill={`url(#${id("shell")})`} filter={`url(#${id("soft")})`} />
          <ellipse cx="76.5" cy="86" rx="2" ry="3" fill="#ffffff" opacity="0.9" />
        </motion.g>

        {/* Antenna */}
        <path d="M50 22 Q50 14 54 9" stroke="#a5b4fc" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <motion.circle
          cx="55" cy="7.5" r="4.6" fill={`url(#${id("bulb")})`} filter={`url(#${id("glow")})`}
          animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
        />

        {/* Head */}
        <g filter={`url(#${id("soft")})`}>
          {/* Ear pods */}
          <rect x="9" y="38" width="10" height="18" rx="5" fill={`url(#${id("ear")})`} />
          <rect x="81" y="38" width="10" height="18" rx="5" fill={`url(#${id("ear")})`} />
          <rect x="15" y="20" width="70" height="56" rx="28" fill={`url(#${id("shell")})`} />
        </g>
        {/* Specular highlight */}
        <ellipse cx="34" cy="26" rx="12" ry="4.5" fill="#ffffff" opacity="0.95" transform="rotate(-12 34 26)" />

        {/* Visor */}
        <rect x="22" y="31" width="56" height="37" rx="18.5" fill={`url(#${id("visor")})`} />
        <path d="M30 35 Q50 31 70 35" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Blush */}
        <ellipse cx="29" cy="57" rx="5" ry="2.6" fill={EYE_HOT} opacity={blushOpacity} />
        <ellipse cx="71" cy="57" rx="5" ry="2.6" fill={EYE_HOT} opacity={blushOpacity} />

        {renderEyes()}
        {renderMouth()}

        {/* State decorations */}
        {state === "eating" && (
          <motion.text x="70" y="78" fontSize="13" animate={{ y: [78, 70, 78] }} transition={{ repeat: Infinity, duration: 0.5 }}>🍕</motion.text>
        )}
        {state === "singing" && (
          <>
            <motion.text x="78" y="28" fontSize="12" animate={{ y: [28, 14, 28], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>🎵</motion.text>
            <motion.text x="6" y="30" fontSize="10" animate={{ y: [30, 16, 30], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}>🎶</motion.text>
          </>
        )}
        {isSleepy && (
          <>
            <motion.text x="72" y="20" fontSize="13" animate={{ y: [20, 8, 20], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.6 }}>💤</motion.text>
            <motion.text x="62" y="14" fontSize="9" fill="#a5b4fc" animate={{ y: [14, 4, 14], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.5 }}>z</motion.text>
          </>
        )}
        {(state === "spinning" || state === "roll") && (
          <motion.text x="72" y="20" fontSize="13" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.6 }}>🌀</motion.text>
        )}
        {state === "bounce" && (
          <motion.text x="72" y="20" fontSize="13" animate={{ y: [20, 10, 20] }} transition={{ repeat: Infinity, duration: 0.4 }}>✨</motion.text>
        )}
        {armWave && (
          <motion.text x="74" y="22" fontSize="13" animate={{ rotate: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 0.5 }}>👋</motion.text>
        )}
      </svg>
    </motion.div>
  )
}
