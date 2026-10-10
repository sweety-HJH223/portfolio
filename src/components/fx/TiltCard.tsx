"use client"

import React, { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees */
  max?: number
  glare?: boolean
}

export function TiltCard({ children, className = "", max = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)
  const spring = { stiffness: 180, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.025]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, hsl(var(--primary) / 0.16), hsl(var(--accent) / 0.06) 35%, transparent 60%)`
  const edgeBg = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, hsl(var(--primary) / 0.95), hsl(var(--accent) / 0.6) 40%, transparent 75%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    hover.set(1)
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    hover.set(0)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, scale, transformPerspective: 1100, transformStyle: "preserve-3d" }
      }
      className={`group/tilt relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: glareBg }}
          />
          {/* Cursor-tracking light on the card edge */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mask-border opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: edgeBg }}
          />
        </>
      )}
    </motion.div>
  )
}
