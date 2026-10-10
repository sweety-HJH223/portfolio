"use client"

import { useEffect, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

export function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.6 })
  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, hsl(var(--primary) / 0.11), hsl(var(--accent) / 0.07) 35%, transparent 70%)`

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [reduceMotion, x, y])

  if (!enabled) return null
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background }} />
}
