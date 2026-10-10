"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Reveal } from "./fx/Reveal"
import { SectionHeading } from "./fx/SectionHeading"
import { Cube3D } from "./fx/Cube3D"
import { TiltCard } from "./fx/TiltCard"

const reasons = [
  {
    title: "I evaluate AI for a living",
    titleKo: "AI 평가가 저의 일입니다",
    desc: "I build benchmarks that tell real AI agent failures apart from bugs.",
    descKo: "실제 AI 에이전트의 실패와 버그를 구분하는 벤치마크를 만듭니다.",
  },
  {
    title: "Reliability is built in",
    titleKo: "신뢰성을 기본으로 설계합니다",
    desc: "Retries, fallbacks and confidence-gated writes in the AI apps I ship.",
    descKo: "제가 배포하는 AI 앱에는 재시도, 폴백, 신뢰도 기반 저장이 기본으로 들어갑니다.",
  },
  {
    title: "AI and full-stack in one person",
    titleKo: "AI와 풀스택을 한 사람이",
    desc: "From agent pipeline to Next.js UI to FastAPI backend — no hand-offs needed.",
    descKo: "에이전트 파이프라인부터 Next.js UI, FastAPI 백엔드까지 — 인수인계가 필요 없습니다.",
  },
  {
    title: "Everything is live",
    titleKo: "모든 프로젝트가 실제로 동작합니다",
    desc: "4 AI apps deployed and on GitHub — you can try every one of them right now.",
    descKo: "4개의 AI 앱이 배포되어 있고 GitHub에 공개되어 있어 지금 바로 사용해 볼 수 있습니다.",
  },
  {
    title: "Proven under pressure",
    titleKo: "압박 속에서 증명된 실력",
    desc: "Three hackathon podiums in one month — two 1st places and a 2nd.",
    descKo: "한 달 동안 해커톤 3회 입상 — 1위 2회, 2위 1회.",
  },
  {
    title: "Bilingual EN / KR",
    titleKo: "영어 / 한국어 이중 언어",
    desc: "Fluent English, conversational Korean, and preparing for TOPIK.",
    descKo: "유창한 영어, 일상 회화 수준의 한국어, 그리고 TOPIK 준비 중.",
  },
]

export default function WhyHireMe() {
  const { getText, language } = useLanguage()
  const ko = language === "ko"

  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col items-center lg:items-start">
          <SectionHeading index="04" title={getText("Why Work With Me?")} align="left" />
          <div className="py-10 lg:pl-16">
            <Cube3D size={190} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reasons.map((reason, idx) => (
            <Reveal key={reason.title} delay={idx * 0.05} className="h-full">
              <TiltCard max={10} className="glass h-full rounded-2xl">
                <div className="flex h-full items-start gap-4 p-5">
                  <span className="font-display text-2xl font-bold leading-none text-gradient">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-bold text-foreground">{ko ? reason.titleKo : reason.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ko ? reason.descKo : reason.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
