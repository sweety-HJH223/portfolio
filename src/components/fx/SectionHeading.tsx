"use client"

import React, { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "./Reveal"

interface SectionHeadingProps {
  index: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: "center" | "left"
}

const words = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const word = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -60 },
  show: { opacity: 1, y: "0em", rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function SectionHeading({ index, title, subtitle, align = "center" }: SectionHeadingProps) {
  const centered = align === "center"
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const numberY = useTransform(scrollYProgress, [0, 1], [70, -70])

  return (
    <div ref={ref} className="relative">
      <Reveal className={`relative mb-14 flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start text-left"}`}>
        <motion.span
          aria-hidden
          style={reduceMotion ? undefined : { y: numberY }}
          className={`text-outline pointer-events-none absolute top-1/2 -z-10 -mt-[3.5rem] select-none font-display text-[7rem] font-bold leading-none [mask-image:linear-gradient(to_bottom,#000_20%,transparent_95%)] md:-mt-[5rem] md:text-[10rem] ${
            centered ? "inset-x-0 text-center" : "-left-3"
          }`}
        >
          {index}
        </motion.span>
        <span className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          <motion.span
            className="h-px w-8 origin-right bg-brand-gradient"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {index}
          <motion.span
            className="h-px w-8 origin-left bg-brand-gradient"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </span>
        <h2 className="text-4xl font-bold tracking-tight text-foreground [filter:drop-shadow(0_8px_24px_hsl(var(--accent)/0.25))] md:text-5xl">
          {typeof title === "string" ? (
            <motion.span
              className="inline-block [perspective:600px]"
              variants={words}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {title.split(" ").map((w, i) => (
                <React.Fragment key={`${w}-${i}`}>
                  {i > 0 && " "}
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </React.Fragment>
              ))}
            </motion.span>
          ) : (
            title
          )}
        </h2>
        {subtitle && <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
      </Reveal>
    </div>
  )
}
