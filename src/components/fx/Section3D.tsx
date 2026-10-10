"use client"

import React, { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

interface Section3DProps {
  children: React.ReactNode
  id?: string
  className?: string
}

// Keep anchor ids on the untransformed outer wrapper: a transformed ancestor
// skews anchor scroll targets and traps position:fixed descendants.
export function Section3D({ children, id, className }: Section3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] })
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 36, restDelta: 0.0005 })

  const rotateX = useTransform(progress, [0, 1], [-22, 0])
  const y = useTransform(progress, [0, 1], [120, 0])
  const scale = useTransform(progress, [0, 1], [0.9, 1])
  const opacity = useTransform(progress, [0, 0.55], [0, 1])
  const willChange = useTransform(progress, (v) => (v < 0.999 ? "transform, opacity" : "auto"))

  return (
    <div ref={ref} id={id} className={className}>
      <motion.div
        style={
          reduceMotion
            ? undefined
            : { rotateX, y, scale, opacity, willChange, transformPerspective: 1400, transformOrigin: "50% 0%" }
        }
      >
        {children}
      </motion.div>
    </div>
  )
}
