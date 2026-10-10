"use client"

import { useEffect, useRef } from "react"
import { ReactLenis, type LenisRef } from "lenis/react"
import { cancelFrame, frame } from "framer-motion"

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => lenisRef.current?.lenis?.raf(timestamp)
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, allowNestedScroll: true, anchors: true }}
    />
  )
}
