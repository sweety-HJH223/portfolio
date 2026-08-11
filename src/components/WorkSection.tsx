"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ExternalLink, Award, BookOpen, GraduationCap, Briefcase } from "lucide-react"
import ProjectsCarousel from "./ProjectsCarousel"

const achievements = [
  { title: "1st Place Solution Sprint", org: "Intercollege Hackathon", date: "Jan 2026", type: "Team" },
  { title: "1st Place Code Relay", org: "Intercollege Hackathon", date: "Jan 2026", type: "Team" },
  { title: "2nd Place Bug Buster", org: "Intercollege Hackathon", date: "Jan 2026", type: "Individual" },
  { title: "Keynote Speaker Blockchain Seminar", org: "Khallikote University", date: "Year 1", type: "" },
]

const certifications = [
  { 
    title: "HackerRank Python Basic", 
    year: "2025",
    link: "https://www.hackerrank.com/certificates/iframe/e6fcdb602387"
  },
  { 
    title: "KMOOC Data Science and AI", 
    year: "Oct 2025",
    link: "/kmooc-certificate.pdf"
  },
  {
    title: "Full Stack Web Development",
    year: "Self-Learned — FreeCodeCamp + CS50W",
    badge: "Self-Learned"
  },
  {
    title: "Git and GitHub Version Control",
    year: "Self-Learned — Practiced Daily",
    badge: "Self-Learned"
  }
]

const experiences = [
  {
    role: "AI Evaluation Engineer (Contract)",
    roleKo: "AI 평가 엔지니어 (계약직)",
    company: "via Handshake AI",
    companyKo: "Handshake AI를 통해",
    duration: "july 2026 — ongoing",
    durationKo: "july 2026 — 진행 중",
    description: [
      "Designed and built agentic, terminal-based benchmark tasks to evaluate AI coding agents, including Dockerized environments, reference solutions, and automated verifiers",
      "Calibrated task difficulty empirically by measuring real oracle output variance to set verification tolerances, ensuring tasks reliably distinguish genuine agent failure from task/infra bugs",
      "Navigated a multi-stage automated review pipeline (static checks, rubric review, similarity detection, agent trial gating) to deliver production-ready evaluation tasks end-to-end"
    ],
    descriptionKo: [
      "AI 코딩 에이전트를 평가하기 위한 에이전틱(agentic) 터미널 기반 벤치마크 태스크를 설계 및 구축 — Docker 환경, 참조 솔루션(reference solution), 자동 검증기(verifier) 포함",
      "실제 오라클 출력값의 편차를 측정하여 검증 허용 오차(tolerance)를 경험적으로 보정함으로써, 추측이 아닌 데이터 기반으로 설정하여 태스크가 에이전트의 실제 실패와 태스크/인프라 버그를 정확히 구분하도록 함",
      "다단계 자동 검토 파이프라인(정적 검사, 루브릭 평가, 유사도 검사, pass@2 및 pass@5 에이전트 시험)을 통과시켜 프로덕션 수준의 평가 태스크를 엔드투엔드로 전달"
    ]
  }
]

const education = [
  { degree: "B.Sc Computer Science", school: "Khallikote University", year: "2023-2026", details: "8.41 CGPA" },
  { degree: "Senior Secondary XII Science CBSE", school: "Kendriya Vidyalaya", year: "2021", details: "88%" },
  { degree: "Secondary X CBSE", school: "Kendriya Vidyalaya", year: "2019", details: "91.4%" },
]

export default function WorkSection() {
  const { getText, language } = useLanguage()

  return (
    <section id="work" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">{getText("Work")}</h2>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Briefcase /> {language === "ko" ? "경력" : "EXPERIENCE"}
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-border">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-foreground text-lg">
                  {language === "ko" ? exp.roleKo : exp.role}
                </h4>
                <p className="text-muted-foreground">
                  {language === "ko" ? exp.companyKo : exp.company} • {language === "ko" ? exp.durationKo : exp.duration}
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  {(language === "ko" ? exp.descriptionKo : exp.description).map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ProjectsCarousel />

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Award /> {getText("ACHIEVEMENTS")}
          </h3>
          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div key={idx} className="p-4 bg-card rounded-lg border border-border flex items-center justify-between hover:border-primary transition-colors">
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.org} • {item.date}</p>
                </div>
                <span className="text-xs font-bold bg-secondary px-2 py-1 rounded">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <BookOpen /> {getText("CERTIFICATIONS")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => {
              const Content = (
                <div className={`p-6 bg-card rounded-xl border border-border flex items-center justify-between group transition-all ${cert.link ? 'hover:shadow-lg hover:border-primary' : ''}`}>
                  <div>
                    <h4 className="font-semibold text-foreground">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.year}</p>
                  </div>
                  {cert.badge ? (
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                      {cert.badge}
                    </span>
                  ) : (
                    <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
              );

              return cert.link ? (
                <a 
                  key={idx} 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  {Content}
                </a>
              ) : (
                <div key={idx}>{Content}</div>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <GraduationCap /> {getText("EDUCATION")}
          </h3>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-border">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-foreground text-lg">{edu.degree}</h4>
                <p className="text-muted-foreground">{edu.school} • {edu.year}</p>
                {edu.details && <p className="text-sm font-semibold text-primary mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
