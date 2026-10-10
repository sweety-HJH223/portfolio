"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ExternalLink, Award, BookOpen, GraduationCap, Briefcase, Trophy, CheckCircle2 } from "lucide-react"
import ProjectsCarousel from "./ProjectsCarousel"
import { TiltCard } from "./fx/TiltCard"
import { Reveal } from "./fx/Reveal"
import { SectionHeading } from "./fx/SectionHeading"

const achievements = [
  { place: 1, title: "1st Place Solution Sprint", titleKo: "Solution Sprint 1위", org: "Intercollege Hackathon", orgKo: "대학 연합 해커톤", date: "Jan 2026", dateKo: "2026년 1월", type: "Team", typeKo: "팀" },
  { place: 1, title: "1st Place Code Relay", titleKo: "Code Relay 1위", org: "Intercollege Hackathon", orgKo: "대학 연합 해커톤", date: "Jan 2026", dateKo: "2026년 1월", type: "Team", typeKo: "팀" },
  { place: 2, title: "2nd Place Bug Buster", titleKo: "Bug Buster 2위", org: "Intercollege Hackathon", orgKo: "대학 연합 해커톤", date: "Jan 2026", dateKo: "2026년 1월", type: "Individual", typeKo: "개인" },
  { place: 0, title: "Keynote Speaker Blockchain Seminar", titleKo: "블록체인 세미나 기조연설", org: "Khallikote University", orgKo: "Khallikote 대학교", date: "Year 1", dateKo: "1학년", type: "", typeKo: "" },
]

const certifications = [
  {
    title: "KMOOC Data Science and AI",
    titleKo: "KMOOC 데이터 과학 및 AI",
    year: "Oct 2025",
    yearKo: "2025년 10월",
    link: "/kmooc-certificate.pdf"
  },
  {
    title: "Full Stack Web Development",
    titleKo: "풀스택 웹 개발",
    year: "Self-Learned — FreeCodeCamp + CS50W",
    yearKo: "독학 — FreeCodeCamp + CS50W",
    badge: "Self-Learned",
    badgeKo: "독학"
  },
  {
    title: "Git and GitHub Version Control",
    titleKo: "Git 및 GitHub 버전 관리",
    year: "Self-Learned — Practiced Daily",
    yearKo: "독학 — 매일 실무 사용",
    badge: "Self-Learned",
    badgeKo: "독학"
  }
]

const experiences = [
  {
    role: "AI Evaluation Engineer (Contract)",
    roleKo: "AI 평가 엔지니어 (계약직)",
    company: "via Handshake AI",
    companyKo: "Handshake AI를 통해",
    duration: "Jul 2026 — Present",
    durationKo: "2026년 7월 — 현재",
    description: [
      "Designed and built agentic, terminal-based benchmark tasks to evaluate AI coding agents, including Dockerized environments, reference solutions, and automated verifiers",
      "Calibrated task difficulty empirically by measuring real oracle output variance to set verification tolerances, ensuring tasks reliably distinguish genuine agent failure from task/infra bugs",
      "Navigated a multi-stage automated review pipeline (static checks, rubric review, similarity detection, pass@2 and pass@5 agent trial gating) to deliver production-ready evaluation tasks end-to-end"
    ],
    descriptionKo: [
      "AI 코딩 에이전트를 평가하기 위한 에이전틱(agentic) 터미널 기반 벤치마크 태스크를 설계 및 구축 — Docker 환경, 참조 솔루션(reference solution), 자동 검증기(verifier) 포함",
      "실제 오라클 출력값의 편차를 측정해 검증 허용 오차(tolerance)를 데이터 기반으로 보정하여, 태스크가 에이전트의 실제 실패와 태스크/인프라 버그를 정확히 구분하도록 함",
      "다단계 자동 검토 파이프라인(정적 검사, 루브릭 평가, 유사도 검사, pass@2 및 pass@5 에이전트 시험)을 통과시켜 프로덕션 수준의 평가 태스크를 엔드투엔드로 전달"
    ]
  }
]

const education = [
  { degree: "B.Sc Computer Science", degreeKo: "컴퓨터과학 학사 (B.Sc)", school: "Khallikote University", schoolKo: "Khallikote 대학교", year: "2023-2026", details: "8.41 CGPA" },
  { degree: "Senior Secondary XII Science CBSE", degreeKo: "고등학교 졸업 (12학년 이과, CBSE)", school: "Kendriya Vidyalaya", schoolKo: "Kendriya Vidyalaya", year: "2021", details: "88%" },
  { degree: "Secondary X CBSE", degreeKo: "중등 과정 수료 (10학년, CBSE)", school: "Kendriya Vidyalaya", schoolKo: "Kendriya Vidyalaya", year: "2019", details: "91.4%" },
]

function SubHeading({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number }>; children: React.ReactNode }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
      <span className="icon-3d inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
        <Icon size={20} />
      </span>
      {children}
    </h3>
  )
}

export default function WorkSection() {
  const { getText, language } = useLanguage()
  const ko = language === "ko"

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" title={getText("Work")} />

        {/* Experience */}
        <Reveal className="mb-24">
          <SubHeading icon={Briefcase}>{language === "ko" ? "경력" : "EXPERIENCE"}</SubHeading>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="glass gradient-border relative overflow-hidden rounded-3xl p-8 md:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[hsl(var(--accent)/0.18)] blur-3xl" />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {language === "ko" ? exp.roleKo : exp.role}
                    </h4>
                    <p className="mt-2 font-medium text-gradient">
                      {language === "ko" ? exp.companyKo : exp.company}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    {language === "ko" ? exp.durationKo : exp.duration}
                  </span>
                </div>
                <ul className="relative mt-8 grid gap-4 md:grid-cols-3">
                  {(language === "ko" ? exp.descriptionKo : exp.description).map((bullet, bIdx) => (
                    <li key={bIdx} className="rounded-2xl border border-border/60 bg-background/40 p-5 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 size={18} className="mb-3 text-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <ProjectsCarousel />

        {/* Achievements + Certifications */}
        <div className="mb-24 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SubHeading icon={Award}>{getText("ACHIEVEMENTS")}</SubHeading>
            <div className="space-y-4">
              {achievements.map((item, idx) => (
                <TiltCard key={idx} max={5} className="glass rounded-2xl">
                  <div className="flex items-center gap-4 p-5">
                    <span className={`icon-3d inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      item.place === 1
                        ? "bg-gradient-to-br from-amber-300 to-yellow-600 text-white"
                        : item.place === 2
                        ? "bg-gradient-to-br from-slate-200 to-slate-500 text-white"
                        : "bg-gradient-to-br from-violet-400 to-fuchsia-600 text-white"
                    }`}>
                      <Trophy size={22} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground">{ko ? item.titleKo : item.title}</h4>
                      <p className="text-sm text-muted-foreground">{ko ? item.orgKo : item.org} • {ko ? item.dateKo : item.date}</p>
                    </div>
                    {item.type && (
                      <span className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-[11px] font-bold text-foreground/80">
                        {ko ? item.typeKo : item.type}
                      </span>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SubHeading icon={BookOpen}>{getText("CERTIFICATIONS")}</SubHeading>
            <div className="space-y-4">
              {certifications.map((cert, idx) => {
                const Content = (
                  <TiltCard max={5} className="glass rounded-2xl">
                    <div className="flex items-center justify-between gap-4 p-5">
                      <div>
                        <h4 className="font-semibold text-foreground">{ko ? cert.titleKo : cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{ko ? cert.yearKo : cert.year}</p>
                      </div>
                      {cert.badge ? (
                        <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                          {ko ? cert.badgeKo : cert.badge}
                        </span>
                      ) : (
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors group-hover/tilt:border-primary group-hover/tilt:text-primary">
                          <ExternalLink size={16} />
                        </span>
                      )}
                    </div>
                  </TiltCard>
                );

                return cert.link ? (
                  <a key={idx} href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                    {Content}
                  </a>
                ) : (
                  <div key={idx}>{Content}</div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Education */}
        <Reveal>
          <SubHeading icon={GraduationCap}>{getText("EDUCATION")}</SubHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {education.map((edu, idx) => (
              <TiltCard key={idx} className="glass gradient-border h-full rounded-3xl">
                <div className="flex h-full flex-col p-7">
                  <span className="mb-6 font-display text-sm font-semibold text-muted-foreground">{edu.year}</span>
                  <h4 className="text-lg font-bold leading-snug text-foreground">{ko ? edu.degreeKo : edu.degree}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{ko ? edu.schoolKo : edu.school}</p>
                  {edu.details && (
                    <p className="mt-auto pt-6 font-display text-3xl font-bold text-gradient">{edu.details}</p>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
