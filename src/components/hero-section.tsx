"use client"

import React, { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Layers } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext";
import { useUI } from "@/context/UIContext";
import { TiltCard } from "./fx/TiltCard"

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-brand-gradient opacity-30 blur-3xl animate-pulse" />
    </div>
  ),
})

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease },
  }),
}

export function HeroSection() {
  const { getText, language } = useLanguage();
  const { openProjectsPopup } = useUI();
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const sceneOpacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0])

  const ko = language === "ko"
  const stats = [
    { value: "🧪 AI Eval", label: ko ? "Handshake AI 엔지니어" : "@ Handshake AI" },
    { value: "🚀 4", label: ko ? "배포된 AI 앱" : "Live AI Apps" },
    { value: "⚡ Full-Stack", label: "Next.js + FastAPI" },
    { value: "🇰🇷 EN+KR", label: getText("Bilingual Developer") },
  ]

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] overflow-hidden [perspective-origin:50%_0%] [perspective:380px] [mask-image:linear-gradient(to_bottom,transparent,#000_35%,#000_65%,transparent)]"
      >
        <div className="grid-floor absolute -inset-x-full bottom-0 h-[320%] opacity-50 dark:opacity-60" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,hsl(var(--accent)/0.35),transparent_70%)]" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* Main content */}
        <motion.div className="max-w-2xl will-change-transform" style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}>
          {/* Open for Work Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {getText("Open for Work")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {language === "en" ? (
              <>
                <span className="text-balance">I turn ideas into</span>{" "}
                <span className="text-gradient [filter:drop-shadow(0_10px_30px_hsl(var(--accent)/0.4))]">intelligent software</span>
              </>
            ) : (
              <>
                <span className="text-balance">아이디어를</span>
                <br />
                <span className="text-gradient break-keep [filter:drop-shadow(0_10px_30px_hsl(var(--accent)/0.4))]">지능형 소프트웨어로</span>
                <br />
                <span>만듭니다</span>
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {ko
              ? "AI 엔지니어이자 풀스택 개발자입니다. 멀티 에이전트 시스템, 스키마가 보장된 LLM 앱, 그리고 이를 검증하는 벤치마크를 만들고 — Next.js, TypeScript, FastAPI로 실제 사용자가 쓰는 제품으로 배포합니다."
              : "AI engineer and full-stack developer. I build multi-agent systems, LLM apps with schema-enforced output and the benchmarks that test them — then ship them as real products with Next.js, TypeScript and FastAPI."}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mb-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={openProjectsPopup}
              className="btn-3d group inline-flex items-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {getText("View My Work")}
              <Layers size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#contact"
              className="glass group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:!border-primary/50"
            >
              {language === "ko" ? "연락하기" : "Let's Talk"}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-6 bg-brand-gradient" />
              {ko ? "한눈에 보기" : "At a Glance"}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <TiltCard key={stat.label} max={14} className="glass rounded-2xl">
                  <div className="flex flex-col items-center p-3 text-center">
                    <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-tight text-muted-foreground">{stat.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                🇰🇷 {getText("TOPIK Prep in Progress")}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          style={reduceMotion ? undefined : { y: sceneY, opacity: sceneOpacity }}
          className="relative order-first h-[280px] will-change-transform sm:h-[340px] lg:order-none lg:h-[min(560px,78vh)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="h-full w-full"
          >
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 dark:opacity-100 bg-[radial-gradient(circle,hsl(var(--accent)/0.35),hsl(var(--primary)/0.12)_45%,transparent_70%)] blur-2xl" />
            <HeroScene />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-muted-foreground/40 p-1">
          <span className="h-2 w-1 rounded-full bg-primary motion-safe:animate-bounce" />
        </div>
      </div>
    </section>
  )
}
