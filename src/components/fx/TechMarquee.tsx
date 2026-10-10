"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

const rowA = [
  ["💎", "Gemini API"], ["🧠", "OpenAI API"], ["🤖", "Multi-Agent Systems"], ["🛠️", "Function Calling"], ["🧾", "Structured Output"],
  ["🧪", "AI Evaluation"], ["✅", "Pydantic"], ["📚", "RAG"], ["🦜", "LangChain"], ["🔌", "MCP"], ["🐳", "Docker"],
]
const rowB = [
  ["▲", "Next.js"], ["⚛️", "React"], ["📜", "TypeScript"], ["🐍", "Python"], ["⚡", "FastAPI"],
  ["🔥", "Firebase"], ["🎨", "Tailwind CSS"], ["🖥️", "Node.js"], ["🚀", "Vercel"], ["🚂", "Railway"],
]

function Row({ items, reverse = false }: { items: string[][]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="flex w-max gap-4 motion-safe:animate-[marquee_40s_linear_infinite]" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {loop.map(([icon, label], i) => (
        <span
          key={`${label}-${i}`}
          className="glass inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-5 py-3 font-display text-sm font-semibold text-foreground"
        >
          <span className="text-lg">{icon}</span>
          {label}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const xA = useTransform(scrollYProgress, [0, 1], [80, -220])
  const xB = useTransform(scrollYProgress, [0, 1], [-220, 80])

  return (
    <div ref={ref} aria-hidden className="relative overflow-x-clip py-10 [perspective:1200px]">
      <div className="mask-fade-x flex flex-col gap-4 overflow-hidden [transform:rotateX(18deg)_rotateZ(-2deg)]">
        <motion.div style={reduceMotion ? undefined : { x: xA }}>
          <Row items={rowA} />
        </motion.div>
        <motion.div style={reduceMotion ? undefined : { x: xB }}>
          <Row items={rowB} reverse />
        </motion.div>
      </div>
    </div>
  )
}
