"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Braces,
  GraduationCap,
  Layers,
  MapPin,
  Rocket,
  ScanSearch,
  Server,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { TiltCard } from "./fx/TiltCard"
import { Reveal } from "./fx/Reveal"
import { SectionHeading } from "./fx/SectionHeading"
import { useUI } from "@/context/UIContext"
import { projects } from "@/data/projects"

// --- Local Translations ---
const localAboutTranslations: Record<string, any> = {
  en: {
    bio1: "AI engineer and full-stack developer. I build AI systems that hold up in the real world — multi-agent pipelines, LLM apps with schema-enforced output — and the full-stack products that put them in front of real users.",
    bio2: "As an AI Evaluation Engineer via Handshake AI, I design agentic benchmark tasks that evaluate AI coding agents. On my own, I've shipped InterviewLens, a 5-agent interview simulator, and K-Trust, a compliance portal that returns typed JSON from Gemini — both built end to end with Next.js, TypeScript, Python and FastAPI. Reliability is what I care about most: retries and fallbacks, confidence-gated writes, and evals that separate real model failures from bugs.",
    factEdu: "Education",
    factEduValue: "B.Sc Computer Science · 8.41 CGPA",
    factLoc: "Location",
    factLocValue: "Open to Remote Globally",
    factStatus: "Status",
    factStatusValue: "Available Immediately",
    focusTitle: "What I Build",
    tagAI: "AI",
    tagFS: "Full-Stack",
    f1Title: "Multi-Agent Systems",
    f1Desc: "5-agent pipelines with memory, retries & fallbacks",
    f2Title: "AI Evaluation",
    f2Desc: "Agentic benchmarks with Dockerized verifiers",
    f3Title: "Structured LLM Output",
    f3Desc: "Schema-enforced JSON via Pydantic + Gemini",
    f4Title: "Agent Reliability",
    f4Desc: "Confidence-gated writes and graceful failure",
    f5Title: "Full-Stack Web Apps",
    f5Desc: "Next.js, React & TypeScript — from UI to deploy",
    f6Title: "APIs & Backends",
    f6Desc: "FastAPI + Pydantic services, Firebase & SQL data",
    journeyTitle: "My Journey",
    journey: [
      { year: "2023", title: "Started B.Sc Computer Science", sub: "Where it all began", icon: "🎓" },
      { year: "2024", title: "Discovered Frontend Development", sub: "Built first web projects and fell in love with UI", icon: "⚡" },
      { year: "2025", title: "Deep Dived into Python & AI", sub: "100+ hours of self-learning + KMOOC Data Science & AI certificate", icon: "🐍" },
      { year: "Jan 2026", title: "3 Hackathon Podiums", sub: "1st Code Relay · 1st Solution Sprint · 2nd Bug Buster", icon: "🏆" },
      { year: "2026", title: "Graduated & Shipping AI Apps", sub: "8.41 CGPA — InterviewLens, K-Trust, Draping, CarbonIQ", icon: "🚀" },
      { year: "Jul 2026", title: "AI Evaluation Engineer", sub: "Building benchmarks that test AI coding agents — via Handshake AI", icon: "🤖" },
    ],
    buildsTitle: "Featured Builds",
    buildsSub: "Full-stack AI apps — live, on GitHub, and built end to end.",
    viewAll: "View all projects",
    liveDemo: "Live demo",
    caseStudy: "Read case study",
    details: "View details",
    stackTitle: "Tech Stack",
    catAI: "AI & LLMs",
    catAgents: "Agents & Evaluation",
    catLang: "Languages",
    catFrontend: "Frontend",
    catBackend: "Backend & Data",
    catPython: "Python Libraries",
    catTools: "Dev & Deploy",
    catAITools: "AI Dev Tools",
    skillsTitle: "Highlights",
    learningTitle: "Currently Learning",
  },
  ko: {
    bio1: "AI 엔지니어이자 풀스택 개발자입니다. 실제 환경에서 제대로 작동하는 AI 시스템 — 멀티 에이전트 파이프라인, 스키마로 출력이 보장되는 LLM 앱 — 과 이를 실제 사용자에게 전달하는 풀스택 제품을 만듭니다.",
    bio2: "Handshake AI를 통해 AI 평가 엔지니어로 일하며 AI 코딩 에이전트를 평가하는 에이전틱 벤치마크 태스크를 설계하고 있습니다. 개인 프로젝트로는 5개 에이전트로 구성된 면접 시뮬레이터 InterviewLens와 Gemini에서 타입이 지정된 JSON을 반환하는 컴플라이언스 포털 K-Trust를 Next.js, TypeScript, Python, FastAPI로 처음부터 끝까지 직접 구축했습니다. 재시도와 폴백, 신뢰도 기반 저장, 실제 모델 실패와 버그를 구분하는 평가까지 — 무엇보다 신뢰성을 중요하게 생각합니다.",
    factEdu: "학력",
    factEduValue: "컴퓨터공학 학사 · 학점 8.41",
    factLoc: "위치",
    factLocValue: "전 세계 원격 근무 가능",
    factStatus: "상태",
    factStatusValue: "즉시 근무 가능",
    focusTitle: "주요 분야",
    tagAI: "AI",
    tagFS: "풀스택",
    f1Title: "멀티 에이전트 시스템",
    f1Desc: "메모리, 재시도, 폴백을 갖춘 5-에이전트 파이프라인",
    f2Title: "AI 평가",
    f2Desc: "Docker 기반 검증기를 갖춘 에이전틱 벤치마크",
    f3Title: "구조화된 LLM 출력",
    f3Desc: "Pydantic + Gemini로 스키마가 보장된 JSON",
    f4Title: "에이전트 신뢰성",
    f4Desc: "신뢰도 기반 저장과 안정적인 실패 처리",
    f5Title: "풀스택 웹 앱",
    f5Desc: "Next.js, React, TypeScript — UI부터 배포까지",
    f6Title: "API & 백엔드",
    f6Desc: "FastAPI + Pydantic 서비스, Firebase & SQL 데이터",
    journeyTitle: "나의 여정",
    journey: [
      { year: "2023", title: "컴퓨터공학 학사 시작", sub: "모든 것이 시작된 곳", icon: "🎓" },
      { year: "2024", title: "프론트엔드 개발 발견", sub: "첫 웹 프로젝트를 빌드하며 UI와 사랑에 빠지다", icon: "⚡" },
      { year: "2025", title: "파이썬 및 AI 심층 학습", sub: "100시간 이상 독학 + KMOOC 데이터 과학 및 AI 수료", icon: "🐍" },
      { year: "2026년 1월", title: "해커톤 3회 수상", sub: "코드 릴레이 1위 · 솔루션 스프린트 1위 · 버그 버스터 2위", icon: "🏆" },
      { year: "2026", title: "졸업 및 AI 앱 출시", sub: "학점 8.41 — InterviewLens, K-Trust, Draping, CarbonIQ", icon: "🚀" },
      { year: "2026년 7월", title: "AI 평가 엔지니어", sub: "AI 코딩 에이전트를 평가하는 벤치마크 구축 — Handshake AI", icon: "🤖" },
    ],
    buildsTitle: "주요 프로젝트",
    buildsSub: "풀스택 AI 앱 — 모두 배포되어 있고, GitHub에 공개되어 있으며, 처음부터 끝까지 직접 구축했습니다.",
    viewAll: "전체 프로젝트 보기",
    liveDemo: "라이브 데모",
    caseStudy: "케이스 스터디 보기",
    details: "자세히 보기",
    stackTitle: "기술 스택",
    catAI: "AI & LLM",
    catFrontend: "프론트엔드",
    catBackend: "백엔드 & 데이터",
    catPython: "파이썬 라이브러리",
    catTools: "개발 & 배포",
    catAgents: "에이전트 & 평가",
    catLang: "프로그래밍 언어",
    catAITools: "AI 개발 도구",
    skillsTitle: "하이라이트",
    learningTitle: "현재 학습 중",
  },
}

// --- Terminal Typing Logic ---
const TerminalBio = () => {
  const { language } = useLanguage()
  const [displayedLines, setDisplayedLines] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingLine, setTypingLine] = useState<{type: string, text: string}>({type: "", text: ""})
  const terminalRef = useRef<HTMLDivElement>(null)

  const terminalLines = [
    { type: "command", text: "whoami" },
    { type: "output", text: "SweetyCodes — AI Engineer & Full-Stack Developer", delay: 500 },
    { type: "command", text: "realname" },
    { type: "output", text: "Subhashree Behera — (Open for professional inquiries)", delay: 500 },
    { type: "command", text: "role" },
    { type: "output", text: language === "ko" ? "AI 평가 엔지니어 (계약직) — Handshake AI를 통해" : "AI Evaluation Engineer (Contract) — via Handshake AI", delay: 500 },
    { type: "command", text: "focus" },
    { type: "output", text: "Multi-agent systems · AI evaluation · Full-stack web apps", delay: 300 },
    { type: "command", text: "stack" },
    { type: "output", text: "AI: Gemini API, OpenAI API, AI Agents, Function Calling", delay: 300 },
    { type: "output", text: "Web: Next.js, React, TypeScript, Tailwind | Python, FastAPI", delay: 500 },
    { type: "command", text: "languages" },
    { type: "output", text: "English (Fluent) | Korean (Conversational) 🇰🇷", delay: 500 },
    { type: "command", text: "status" },
    { type: "output", text: "🟢 Available — AI / Full-Stack roles | Internship | Freelance", delay: 500 },
  ]

  useEffect(() => {
    setDisplayedLines([])
    let isCancelled = false

    async function typeLines() {
      for (const line of terminalLines) {
        if (isCancelled) break

        setIsTyping(true)
        setTypingLine({ type: line.type, text: "" })

        const typingSpeed = line.type === "command" ? 50 : 20

        for (let i = 0; i <= line.text.length; i++) {
          if (isCancelled) break
          setTypingLine({ type: line.type, text: line.text.slice(0, i) })
          await new Promise((resolve) => setTimeout(resolve, typingSpeed))
        }

        if (isCancelled) break
        setIsTyping(false)
        setDisplayedLines((prev) => [...prev, line])
        setTypingLine({ type: "", text: "" })
        await new Promise((resolve) => setTimeout(resolve, 400))
      }
    }

    typeLines()
    return () => { isCancelled = true }
  }, [language])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedLines, typingLine])

  return (
    <div className="gradient-border relative w-full rounded-[2rem] bg-[#070a18]/90 overflow-hidden shadow-[0_30px_70px_-25px_hsl(var(--accent)/0.45)] font-mono text-sm h-full min-h-[400px] flex flex-col backdrop-blur-xl">
      <div className="bg-white/[0.03] px-5 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-gray-400 text-xs">sweetycodes@portfolio:~$</div>
        <div className="w-12" />
      </div>
      <div ref={terminalRef} className="p-4 overflow-y-auto flex-1 max-h-[420px] custom-scrollbar">
        {displayedLines.map((line, idx) => (
          <div key={idx} className="mb-2">
            {line.type === "command" ? (
              <div className="flex text-[#22d3ee]">
                <span className="mr-2 text-[#22d3ee]/60">{">"}</span>
                <span>{line.text}</span>
              </div>
            ) : (
              <div className="text-gray-100 ml-4">{line.text}</div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="mb-2">
            {typingLine.type === "command" ? (
              <div className="flex text-[#22d3ee]">
                <span className="mr-2 text-[#22d3ee]/60">{">"}</span>
                <span>{typingLine.text}</span>
                <span className="w-2 h-4 bg-[#22d3ee] ml-1 animate-pulse" />
              </div>
            ) : (
              <div className="text-gray-100 ml-4">{typingLine.text}</div>
            )}
          </div>
        )}

        {!isTyping && (
          <div className="flex text-[#22d3ee]">
            <span className="mr-2 text-[#22d3ee]/60">{">"}</span>
            <span className="w-2 h-4 bg-[#22d3ee] animate-[blink_1s_infinite]" />
          </div>
        )}
      </div>
    </div>
  )
}

// --- Data ---
type Skill = { name: string; icon: string; tooltip: string; match?: string }

const skillCategories: { key: string; tone: string; wide?: boolean; skills: Skill[] }[] = [
  {
    key: "catAI",
    tone: "from-violet-500 to-fuchsia-500",
    wide: true,
    skills: [
      { name: "Gemini API", icon: "💎", tooltip: "2.5 Flash / Flash Lite — InterviewLens, K-Trust, Draping, CarbonIQ", match: "Gemini" },
      { name: "OpenAI API", icon: "🧠", tooltip: "Desktop automation AI bot" },
      { name: "Google AI Studio", icon: "🧪", tooltip: "Prompt prototyping for Gemini apps" },
      { name: "Prompt Engineering", icon: "📐", tooltip: "Rubrics and prompts for K-Trust & InterviewLens" },
      { name: "Structured Output", icon: "🧾", tooltip: "Pydantic + response_schema in K-Trust", match: "Pydantic" },
      { name: "Function Calling & Tool Use", icon: "🛠️", tooltip: "Tools for AI agents" },
      { name: "Multimodal (Vision + PDF)", icon: "🖼️", tooltip: "Selfie analysis in Draping, resume PDFs in InterviewLens" },
      { name: "Long Context Optimization", icon: "📜", tooltip: "Fitting resumes, history and rubrics into one context" },
      { name: "RAG", icon: "📚", tooltip: "Retrieval-augmented generation over your own data" },
      { name: "Vector Databases & Embeddings", icon: "🧭", tooltip: "Semantic search for RAG pipelines" },
      { name: "LangChain", icon: "🦜", tooltip: "Chains, retrievers and tool-using agents" },
      { name: "MCP", icon: "🔌", tooltip: "Model Context Protocol — connecting LLMs to tools and data" },
    ],
  },
  {
    key: "catAgents",
    tone: "from-fuchsia-500 to-pink-500",
    wide: true,
    skills: [
      { name: "Multi-Agent Systems", icon: "🤖", tooltip: "5-agent pipeline in InterviewLens", match: "AI Agents" },
      { name: "Agent Memory & State", icon: "🧠", tooltip: "Candidate memory that compounds across sessions" },
      { name: "Retries & Fallbacks", icon: "🔁", tooltip: "Exponential backoff so AI failures never crash a session" },
      { name: "AI Evaluation", icon: "📊", tooltip: "Agentic benchmarks at Handshake AI" },
      { name: "Automated Verifiers", icon: "✅", tooltip: "Reference solutions + verifiers for coding-agent tasks" },
      { name: "pass@k Testing", icon: "🎯", tooltip: "pass@2 / pass@5 agent trial gating" },
      { name: "LLM Evals & Tracing", icon: "🔬", tooltip: "Scoring LLM output and tracing every step of a chain" },
      { name: "Agent Observability", icon: "🔭", tooltip: "Real-time agent pipeline logging" },
      { name: "Agent Security", icon: "🛡️", tooltip: "Safe tool use and input handling for agents" },
    ],
  },
  {
    key: "catLang",
    tone: "from-sky-400 to-indigo-500",
    skills: [
      { name: "TypeScript", icon: "📘", tooltip: "InterviewLens, CarbonIQ, this portfolio" },
      { name: "JavaScript", icon: "🟨", tooltip: "ES6+" },
      { name: "Python", icon: "🐍", tooltip: "AI backends, automation, scraping" },
      { name: "SQL", icon: "🗄️", tooltip: "SQLite and relational data" },
      { name: "HTML5 / CSS3", icon: "🌐", tooltip: "Semantic, responsive markup", match: "HTML" },
      { name: "C++", icon: "➕", tooltip: "University coursework" },
    ],
  },
  {
    key: "catFrontend",
    tone: "from-cyan-400 to-blue-500",
    skills: [
      { name: "Next.js 15/16", icon: "▲", tooltip: "All recent AI apps", match: "Next.js" },
      { name: "React", icon: "⚛️", tooltip: "Every frontend project" },
      { name: "Tailwind CSS", icon: "🎨", tooltip: "Styling across all apps" },
      { name: "shadcn/ui", icon: "🧩", tooltip: "Accessible UI components" },
      { name: "Framer Motion", icon: "🎬", tooltip: "Animations in this portfolio" },
      { name: "Recharts", icon: "📈", tooltip: "10-year projection chart in CarbonIQ" },
    ],
  },
  {
    key: "catBackend",
    tone: "from-emerald-400 to-teal-500",
    skills: [
      { name: "FastAPI", icon: "⚡", tooltip: "K-Trust backend on Railway" },
      { name: "REST APIs", icon: "🔌", tooltip: "Designing and consuming APIs" },
      { name: "Node.js", icon: "🖥️", tooltip: "Backend projects" },
      { name: "Flask", icon: "🧪", tooltip: "Python web backends" },
      { name: "Firebase", icon: "🔥", tooltip: "Firestore + Auth in InterviewLens and CarbonIQ" },
      { name: "SQLite", icon: "🗃️", tooltip: "Lightweight relational storage" },
    ],
  },
  {
    key: "catPython",
    tone: "from-amber-400 to-orange-500",
    skills: [
      { name: "Pydantic", icon: "✅", tooltip: "Typed LLM output in K-Trust" },
      { name: "pytest", icon: "🧪", tooltip: "Unit and integration tests for Python code" },
      { name: "pandas", icon: "🐼", tooltip: "Sales Reporter + Scraper" },
      { name: "NumPy", icon: "🔢", tooltip: "Numerical data processing" },
      { name: "requests", icon: "📡", tooltip: "HTTP clients and API calls" },
      { name: "BeautifulSoup", icon: "🔍", tooltip: "Web Scraper project" },
      { name: "Selenium", icon: "🕹️", tooltip: "Browser automation" },
      { name: "Playwright", icon: "🎭", tooltip: "Browser automation" },
    ],
  },
  {
    key: "catTools",
    tone: "from-pink-400 to-rose-500",
    skills: [
      { name: "Git/GitHub", icon: "🐙", tooltip: "Every project, every day" },
      { name: "Docker", icon: "🐳", tooltip: "Dockerized benchmark environments" },
      { name: "Vercel", icon: "🚀", tooltip: "Frontend deployments" },
      { name: "Railway", icon: "🚂", tooltip: "FastAPI deployment for K-Trust" },
      { name: "Netlify", icon: "🌍", tooltip: "Static site deployments" },
      { name: "Cloudinary", icon: "☁️", tooltip: "Image pipeline in Draping" },
    ],
  },
  {
    key: "catAITools",
    tone: "from-violet-400 to-indigo-500",
    skills: [
      { name: "Cursor", icon: "⚡", tooltip: "AI-powered code editor" },
      { name: "Claude AI", icon: "🤖", tooltip: "Daily AI coding assistant" },
      { name: "GitHub Copilot", icon: "🧑‍✈️", tooltip: "AI pair programming" },
      { name: "v0.dev", icon: "✨", tooltip: "AI UI prototyping" },
    ],
  },
]

const highlights = [
  { en: "Live AI apps", ko: "배포된 AI 앱", subEn: "InterviewLens, K-Trust, Draping and CarbonIQ — all live and on GitHub", subKo: "InterviewLens, K-Trust, Draping, CarbonIQ — 모두 배포 및 GitHub 공개", icon: Rocket, tone: "from-violet-500 to-fuchsia-500" },
  { en: "Multi-agent pipelines", ko: "멀티 에이전트 파이프라인", subEn: "Five agents with memory, retries and fallbacks", subKo: "메모리, 재시도, 폴백을 갖춘 다섯 개의 에이전트", icon: Bot, tone: "from-cyan-400 to-blue-500" },
  { en: "Hackathon podiums", ko: "해커톤 입상", subEn: "Two 1st places and a 2nd, in one month", subKo: "한 달 동안 1위 2회, 2위 1회", icon: Trophy, tone: "from-amber-400 to-orange-500" },
  { en: "Self-taught in AI", ko: "AI 자기주도 학습", subEn: "100+ hours, plus the KMOOC Data Science & AI certificate", subKo: "100시간 이상 + KMOOC 데이터 사이언스 & AI 수료", icon: BookOpen, tone: "from-emerald-400 to-cyan-500" },
]

const aiBuilds = [
  {
    name: "InterviewLens",
    icon: "🎙️",
    tone: "from-violet-500 to-fuchsia-500",
    en: "5-agent AI interview simulator with memory that compounds across sessions.",
    ko: "세션을 거듭할수록 기억이 쌓이는 5-에이전트 AI 면접 시뮬레이터.",
    stack: ["Next.js 15", "Gemini", "Firestore"],
    url: "https://interview-lense.vercel.app/",
    slug: "interview-lens",
    caseStudy: true,
  },
  {
    name: "K-Trust",
    icon: "⚖️",
    tone: "from-cyan-400 to-blue-500",
    en: "Audits Korean merchants and returns trust scores as schema-enforced JSON.",
    ko: "한국 판매자를 감사하고 스키마가 보장된 JSON으로 신뢰 점수를 반환.",
    stack: ["FastAPI", "Pydantic", "Gemini"],
    url: "https://project-4xzgu-blush.vercel.app/",
    slug: "k-trust",
    caseStudy: true,
  },
  {
    name: "Draping",
    icon: "🎨",
    tone: "from-pink-400 to-rose-500",
    en: "AI personal colour analysis from a selfie, plus virtual outfit try-on.",
    ko: "셀카로 퍼스널 컬러를 분석하고 가상으로 옷을 입어보는 AI 앱.",
    stack: ["Gemini Vision", "YouCam API", "Next.js"],
    url: "https://draping-nine.vercel.app/",
    slug: "draping",
    caseStudy: false,
  },
  {
    name: "CarbonIQ",
    icon: "🌱",
    tone: "from-emerald-400 to-teal-500",
    en: "Log your footprint in plain language; low-confidence AI reads ask before saving.",
    ko: "자연어로 탄소 발자국을 기록하고, 신뢰도가 낮은 AI 결과는 저장 전에 확인.",
    stack: ["Gemini", "Firebase", "Recharts"],
    url: "https://carbon-emission-iq.vercel.app",
    slug: "carbon-iq",
    caseStudy: true,
  },
]

const learning = [
  { icon: "🇰🇷", en: "TOPIK Korean", ko: "TOPIK 한국어" },
  { icon: "🤖", en: "Agent Frameworks", ko: "에이전트 프레임워크", detail: "LangGraph · CrewAI · OpenAI Agents SDK" },
  { icon: "📈", en: "Machine Learning", ko: "머신러닝" },
  { icon: "🧠", en: "Deep Learning", ko: "딥러닝" },
  { icon: "☁️", en: "Azure AI-103 Prep", ko: "Azure AI-103 준비" },
]

// --- Building blocks ---
const SkillTag = ({ skill }: { skill: Skill }) => {
  const { selectedSkill, setSelectedSkill, openProjectsPopup } = useUI()
  const filter = skill.match ?? skill.name
  const term = filter.toLowerCase()
  const clickable = projects.some((p) => p.techStack.some((tech) => tech.toLowerCase().includes(term)))
  const isActive = clickable && selectedSkill?.toLowerCase() === term

  const handleClick = () => {
    if (!clickable) return
    if (isActive) {
      setSelectedSkill(null)
    } else {
      setSelectedSkill(filter)
      openProjectsPopup()
    }
  }

  return (
    <div className="relative group/tag" onClick={handleClick}>
      <div
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
          clickable ? "cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "cursor-default"
        } ${
          isActive
            ? "border-primary bg-primary/25 text-primary shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            : "border-border/60 bg-secondary/60 text-foreground hover:border-primary/50"
        }`}
      >
        <span className={`transition-transform text-sm group-hover/tag:rotate-[10deg] ${isActive ? "rotate-[10deg]" : ""}`}>
          {skill.icon}
        </span>
        <span className="text-[13px] font-semibold tracking-wide">{skill.name}</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[180px] px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded border border-border/50 opacity-0 group-hover/tag:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
        {skill.tooltip}
      </div>
    </div>
  )
}

const SkillGroup = ({ label, tone, skills, highlight = false }: { label: string; tone: string; skills: Skill[]; highlight?: boolean }) => (
  <div className={highlight ? "rounded-2xl border border-accent/20 bg-accent/[0.04] p-4" : ""}>
    <p className="mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/80">
      <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${tone}`} />
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => <SkillTag key={s.name} skill={s} />)}
    </div>
  </div>
)

const BentoBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`glass gradient-border relative p-6 md:p-7 rounded-[2rem] hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_hsl(var(--accent)/0.4)] transition-all duration-500 group ${className}`}>
    {children}
  </div>
)

const TileHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
    <span className="h-px w-6 bg-gradient-to-r from-primary to-accent" />
    {children}
  </h4>
)

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [terminalKey, setTerminalKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { getText, language } = useLanguage()
  const { openProjectsPopup, setSelectedSkill } = useUI()

  const t = localAboutTranslations[language] || localAboutTranslations.en
  const ko = language === "ko"

  useEffect(() => {
    const currentRef = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTerminalKey(prev => prev + 1)
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    )
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.disconnect()
    }
  }, [])

  const facts = [
    { label: t.factEdu, value: t.factEduValue, icon: GraduationCap, tone: "from-sky-400 to-indigo-500" },
    { label: t.factLoc, value: t.factLocValue, icon: MapPin, tone: "from-fuchsia-400 to-pink-500" },
    { label: t.factStatus, value: t.factStatusValue, icon: Zap, tone: "from-emerald-400 to-cyan-500", live: true },
  ]

  const focus = [
    { title: t.f1Title, desc: t.f1Desc, icon: Bot, tone: "from-violet-500 to-fuchsia-500", ai: true },
    { title: t.f2Title, desc: t.f2Desc, icon: ScanSearch, tone: "from-cyan-400 to-blue-500", ai: true },
    { title: t.f3Title, desc: t.f3Desc, icon: Braces, tone: "from-amber-400 to-orange-500", ai: true },
    { title: t.f4Title, desc: t.f4Desc, icon: ShieldCheck, tone: "from-emerald-400 to-teal-500", ai: true },
    { title: t.f5Title, desc: t.f5Desc, icon: Layers, tone: "from-sky-400 to-indigo-500", ai: false },
    { title: t.f6Title, desc: t.f6Desc, icon: Server, tone: "from-rose-400 to-pink-500", ai: false },
  ]

  const openAllProjects = () => {
    setSelectedSkill(null)
    openProjectsPopup()
  }

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="01" title={getText("About")} />
        <div className={`grid grid-cols-1 md:grid-cols-6 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Profile */}
          <BentoBox className="md:col-span-2 flex flex-col items-center justify-center text-center">
            <TiltCard max={12} className="w-full rounded-[1.5rem] mb-6">
              <div className="relative w-full aspect-[1229/819] rounded-[1.5rem] overflow-hidden ring-1 ring-white/15 shadow-[0_25px_50px_-20px_hsl(var(--accent)/0.6)]">
                <Image src="/profile.png" alt="SweetyCodes" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t.factStatusValue}
                </span>
              </div>
            </TiltCard>
            <h2 className="text-2xl font-bold text-foreground mb-1">SweetyCodes</h2>
            <p className="text-gradient text-sm font-semibold">{getText("Full-Stack Developer & AI Engineer")}</p>
          </BentoBox>

          {/* Terminal */}
          <div className="md:col-span-4">
            <TerminalBio key={terminalKey} />
          </div>

          {/* Bio + quick facts */}
          <BentoBox className="md:col-span-6">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="relative pl-6">
                <span className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-brand-gradient shadow-[0_0_18px_hsl(var(--accent)/0.8)]" />
                <p className="font-display text-2xl md:text-[1.7rem] font-semibold text-foreground mb-4 leading-snug tracking-tight">
                  {t.bio1}
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t.bio2}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {facts.map(({ label, value, icon: Icon, tone, live }) => (
                  <TiltCard key={label} max={10} className="rounded-2xl">
                    <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-colors duration-300 hover:border-primary/50 lg:flex-row lg:items-center lg:gap-4">
                      <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${tone} opacity-20 blur-2xl`} />
                      <span className={`icon-3d relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white`}>
                        <Icon size={18} />
                        {live && <span className="absolute -right-0.5 -top-0.5 z-10 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background animate-pulse" />}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                        <p className="mt-0.5 text-sm font-bold leading-snug text-foreground">{value}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </BentoBox>

          {/* What I build */}
          <BentoBox className="flex flex-col md:col-span-3">
            <TileHeading>{t.focusTitle}</TileHeading>
            <div className="grid flex-1 grid-cols-1 gap-3 sm:auto-rows-fr sm:grid-cols-2">
              {focus.map(({ title, desc, icon: Icon, tone, ai }) => (
                <TiltCard key={title} max={8} className="h-full rounded-2xl">
                  <div className="group/item relative flex h-full flex-col items-start justify-center overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-colors duration-300 hover:border-primary/50">
                    <div className={`pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${tone} opacity-15 blur-2xl`} />
                    <span
                      className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        ai ? "border-accent/30 bg-accent/10 text-accent" : "border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {ai ? t.tagAI : t.tagFS}
                    </span>
                    <span className={`icon-3d mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white transition-transform duration-300 group-hover/item:-rotate-6 group-hover/item:scale-110`}>
                      <Icon size={19} />
                    </span>
                    <p className="font-display text-base font-bold text-foreground">{title}</p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </BentoBox>

          {/* Journey */}
          <BentoBox className="md:col-span-3">
            <TileHeading>{t.journeyTitle}</TileHeading>
            <ol className="relative space-y-3 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:rounded-full before:bg-gradient-to-b before:from-primary before:via-accent before:to-[hsl(var(--pink))]">
              {t.journey.map((step: { year: string; title: string; sub: string; icon: string }, idx: number) => {
                const isLast = idx === t.journey.length - 1
                return (
                  <li key={idx} className="group/step relative flex items-start gap-4">
                    <span className={`relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 group-hover/step:scale-110 ${isLast ? "border-transparent bg-brand-gradient shadow-[0_0_24px_hsl(var(--accent)/0.8)]" : "border-primary/40 bg-background shadow-[0_0_14px_hsl(var(--primary)/0.35)]"}`}>
                      {step.icon}
                      {isLast && <span className="absolute inset-0 rounded-full bg-brand-gradient opacity-60 animate-ping" />}
                    </span>
                    <div className="flex-1 rounded-2xl border border-transparent px-4 py-2 transition-all duration-300 group-hover/step:translate-x-1 group-hover/step:border-border/60 group-hover/step:bg-secondary/40">
                      <span className="mb-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-primary ring-1 ring-primary/25">
                        {step.year}
                      </span>
                      <p className="font-display text-[15px] font-semibold leading-tight text-foreground">{step.title}</p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">{step.sub}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </BentoBox>

          {/* Featured AI builds */}
          <BentoBox className="md:col-span-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <TileHeading>{t.buildsTitle}</TileHeading>
                <p className="-mt-3 text-sm text-muted-foreground">{t.buildsSub}</p>
              </div>
              <button
                onClick={openAllProjects}
                className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Layers size={15} />
                {t.viewAll}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {aiBuilds.map((build, idx) => (
                <Reveal key={build.name} delay={idx * 0.08} className="h-full">
                  <TiltCard max={10} className="h-full rounded-2xl">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 p-5 transition-colors duration-300 hover:border-primary/50">
                      <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${build.tone} opacity-20 blur-2xl`} />
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`icon-3d inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${build.tone} text-2xl`}>
                          {build.icon}
                        </span>
                        <a
                          href={build.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${build.name} ${t.liveDemo}`}
                          className="relative z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                      <Link href={`/projects/${build.slug}`} className="font-display text-lg font-bold text-foreground after:absolute after:inset-0 after:z-10">
                        {build.name}
                      </Link>
                      <p className="mt-1 flex-1 text-sm leading-snug text-muted-foreground">{ko ? build.ko : build.en}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {build.stack.map((tech) => (
                          <span key={tech} className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-primary">
                        {build.caseStudy ? t.caseStudy : t.details} →
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </BentoBox>

          {/* Highlights */}
          <BentoBox className="md:col-span-6">
            <TileHeading>{t.skillsTitle}</TileHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map(({ en, ko: koLabel, subEn, subKo, icon: Icon, tone }) => (
                <TiltCard key={en} max={8} className="h-full rounded-2xl">
                  <div className="relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-colors duration-300 hover:border-primary/50">
                    <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${tone} opacity-20 blur-2xl`} />
                    <span className={`icon-3d inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white`}>
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-snug text-foreground">{ko ? koLabel : en}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{ko ? subKo : subEn}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </BentoBox>

          {/* Tech stack */}
          <BentoBox className="md:col-span-6">
            <TileHeading>{t.stackTitle}</TileHeading>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {skillCategories.filter((cat) => cat.wide).map((cat) => (
                <SkillGroup key={cat.key} label={t[cat.key]} tone={cat.tone} skills={cat.skills} highlight />
              ))}
            </div>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillCategories.filter((cat) => !cat.wide).map((cat) => (
                <SkillGroup key={cat.key} label={t[cat.key]} tone={cat.tone} skills={cat.skills} />
              ))}
            </div>
          </BentoBox>

          {/* Currently learning */}
          <BentoBox className="md:col-span-6">
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                {t.learningTitle}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {learning.map((item) => (
                  <span
                    key={item.en}
                    className="group/learn relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-border/60 bg-secondary/50 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/15 to-transparent transition-transform duration-700 group-hover/learn:translate-x-full" />
                    <span className="text-base">{item.icon}</span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-xs font-bold text-foreground">{ko ? item.ko : item.en}</span>
                      {item.detail && <span className="text-[10px] text-muted-foreground">{item.detail}</span>}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </BentoBox>
        </div>
      </div>
    </section>
  )
}
