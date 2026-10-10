import React from "react"
import { Reveal } from "./Reveal"

interface SectionHeadingProps {
  index: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: "center" | "left"
}

export function SectionHeading({ index, title, subtitle, align = "center" }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <Reveal className={`relative mb-14 flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start text-left"}`}>
      <span
        aria-hidden
        className={`text-outline pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[7rem] font-bold leading-none [mask-image:linear-gradient(to_bottom,#000_20%,transparent_95%)] md:text-[10rem] ${
          centered ? "left-1/2 -translate-x-1/2" : "-left-3"
        }`}
      >
        {index}
      </span>
      <span className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        <span className="h-px w-8 bg-brand-gradient" />
        {index}
        <span className="h-px w-8 bg-brand-gradient" />
      </span>
      <h2 className="text-4xl font-bold tracking-tight text-foreground [filter:drop-shadow(0_8px_24px_hsl(var(--accent)/0.25))] md:text-5xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
    </Reveal>
  )
}
