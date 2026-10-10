"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

const SIZE = 1120

export function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-SIZE)
  const y = useMotionValue(-SIZE)
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [reduceMotion, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background: "radial-gradient(closest-side, hsl(var(--primary) / 0.11), hsl(var(--accent) / 0.07) 50%, transparent)",
      }}
    />
  )
}
