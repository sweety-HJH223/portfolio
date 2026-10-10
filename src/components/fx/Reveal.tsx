"use client"

import React from "react"
import { motion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
