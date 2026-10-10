"use client"
import React from "react"
import { Globe, Bot, Braces, FlaskConical, Server, Languages, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { TiltCard } from "./fx/TiltCard"
import { Reveal } from "./fx/Reveal"
import { SectionHeading } from "./fx/SectionHeading"

const services = [
  {
    icon: Bot,
    ai: true,
    title: "AI Agents & Multi-Agent Systems",
    titleKo: "AI 에이전트 & 멀티 에이전트 시스템",
    description: "Agent pipelines with tool use, memory, retries and fallbacks — built on Gemini and OpenAI",
    descriptionKo: "도구 사용, 메모리, 재시도, 폴백을 갖춘 에이전트 파이프라인 — Gemini와 OpenAI 기반",
    gradient: "from-violet-400 to-fuchsia-600",
  },
  {
    icon: Braces,
    ai: true,
    title: "LLM Apps with Structured Output",
    titleKo: "구조화된 출력의 LLM 앱",
    description: "AI features that return typed, schema-validated JSON your frontend can trust",
    descriptionKo: "프론트엔드가 신뢰할 수 있는, 스키마로 검증된 타입 JSON을 반환하는 AI 기능",
    gradient: "from-amber-300 to-orange-500",
  },
  {
    icon: FlaskConical,
    ai: true,
    title: "AI Evaluation & Benchmarks",
    titleKo: "AI 평가 및 벤치마크",
    description: "Benchmarks and automated verifiers that test how well LLMs and AI agents really perform",
    descriptionKo: "LLM과 AI 에이전트의 실제 성능을 검증하는 벤치마크 및 자동 검증기",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    icon: Globe,
    ai: false,
    title: "Full-Stack Web Apps",
    titleKo: "풀스택 웹 앱",
    description: "Production Next.js, React and TypeScript apps — from UI to deployment",
    descriptionKo: "Next.js, React, TypeScript로 만드는 실서비스 앱 — UI부터 배포까지",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    icon: Server,
    ai: false,
    title: "APIs & Python Backends",
    titleKo: "API & 파이썬 백엔드",
    description: "FastAPI services with Pydantic models, plus Firebase and SQL data layers",
    descriptionKo: "Pydantic 모델 기반 FastAPI 서비스와 Firebase, SQL 데이터 레이어",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    icon: Languages,
    ai: false,
    title: "Bilingual EN/KO Products",
    titleKo: "영어/한국어 이중 언어 제품",
    description: "Fully localized English and Korean experiences, end to end",
    descriptionKo: "처음부터 끝까지 완전히 현지화된 영어 및 한국어 경험",
    gradient: "from-cyan-300 to-indigo-500",
  },
]

export default function ServicesSection() {
  const { getText, language } = useLanguage()
  const ko = language === "ko"

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" title={getText("What I Can Build For You")} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 0.07}>
              <TiltCard className="glass gradient-border h-full rounded-3xl">
                <div className="relative flex h-full flex-col p-8 preserve-3d">
                  <span className="absolute right-7 top-6 font-display text-5xl font-bold text-foreground/[0.06]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-7 flex items-center gap-3">
                    <div
                      className={`icon-3d inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white transition-transform duration-500 translate-z-12 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110`}
                    >
                      <service.icon size={26} strokeWidth={2.2} />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        service.ai ? "border-accent/30 bg-accent/10 text-accent" : "border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {service.ai ? "AI" : ko ? "풀스택" : "Full-Stack"}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground translate-z-6">{ko ? service.titleKo : service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground translate-z-6">
                    {ko ? service.descriptionKo : service.description}
                  </p>
                  <ArrowUpRight
                    size={20}
                    className="mt-auto self-end pt-4 text-muted-foreground/40 transition-all duration-300 group-hover/tilt:-translate-y-1 group-hover/tilt:translate-x-1 group-hover/tilt:text-primary"
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
