"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { KakaoTalkIcon, WhatsAppIcon, GitHubIcon, LinkedInIcon, EmailIcon } from "./social-icons"
import { useLanguage } from "@/context/LanguageContext"
import SkillRadar from "./SkillRadar"
import LanguagesWorkflow from "./LanguagesWorkflow"

// --- Terminal Typing Logic ---
const terminalLines = [
  { type: "command", text: "whoami" },
  { type: "output", text: "SweetyCodes — Full-Stack Developer & AI Engineer", delay: 500 },
  { type: "command", text: "realname" },
  { type: "output", text: "Subhashree Behera — (Open for professional inquiries)", delay: 500 },
  { type: "command", text: "skills" },
  { type: "output", text: "Frontend: React, Next.js, JavaScript, Tailwind", delay: 300 },
  { type: "output", text: "Python: Automation, Scraping, Data Analysis", delay: 300 },
  { type: "output", text: "AI: OpenAI API, Gemini API, LLM Integration", delay: 500 },
  { type: "command", text: "achievements" },
  { type: "output", text: "🏆 1st Place — Solution Sprint 2026", delay: 300 },
  { type: "output", text: "🏆 1st Place — Code Relay 2026", delay: 300 },
  { type: "output", text: "🥈 2nd Place — Bug Buster 2026", delay: 300 },
  { type: "command", text: "languages" },
  { type: "output", text: "English (Fluent) | Korean (Conversational) 🇰🇷", delay: 500 },
  { type: "command", text: "status" },
  { type: "output", text: "🟢 Available — Internship | Junior Dev | Freelance", delay: 500 },
]

const TerminalBio = () => {
  const [displayedLines, setDisplayedLines] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingLine, setTypingLine] = useState<{type: string, text: string}>({type: "", text: ""})
  const terminalRef = useRef<HTMLDivElement>(null)

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
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedLines, typingLine])

  return (
    <div className="w-full bg-[#0a1a1a] rounded-lg border border-border/50 overflow-hidden shadow-2xl font-mono text-sm h-[400px] flex flex-col">
      <div className="bg-[#122424] px-4 py-2 border-b border-border/50 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-gray-400 text-xs">sweetycodes@portfolio:~$</div>
        <div className="w-12" />
      </div>
      <div ref={terminalRef} className="p-4 overflow-y-auto flex-1 custom-scrollbar">
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

// --- Skills Data ---
const skillCategories = [
  {
    title: "AI & AGENTIC AUTOMATION",
    skills: [
      { name: "AI Agents", icon: "🤖", tooltip: "Autonomous agents for desktop & web tasks", color: "cyan" },
      { name: "LLM Orchestration", icon: "🧠", tooltip: "Bridging LLMs with complex workflows", color: "cyan" },
      { name: "Playwright", icon: "🎭", tooltip: "Used in Web Scraper & Automation projects", color: "white" },
      { name: "xlsxwriter", icon: "📊", tooltip: "Used in Automated Sales Analysis project", color: "white" },
    ],
  },
  {
    title: "FRONTEND",
    skills: [
      { name: "React", icon: "⚛️", tooltip: "Used in Portfolio + Weather App" },
      { name: "Next.js", icon: "🌐", tooltip: "Used in Portfolio site" },
      { name: "JavaScript", icon: "📜", tooltip: "Used in all frontend projects" },
      { name: "Tailwind CSS", icon: "🎨", tooltip: "Used in Portfolio site" },
      { name: "HTML5/CSS3", icon: "📱", tooltip: "Used in Weather App + Portfolio" },
    ],
  },
  {
    title: "PYTHON & AUTOMATION",
    skills: [
      { name: "Python", icon: "🐍", tooltip: "Used in 4+ automation projects" },
      { name: "BeautifulSoup", icon: "🔍", tooltip: "Used in Web Scraper project" },
      { name: "Selenium", icon: "🤖", tooltip: "Used in automation projects" },
      { name: "pandas", icon: "📊", tooltip: "Used in Sales Reporter + Scraper" },
      { name: "NumPy", icon: "📈", tooltip: "Used in data analysis projects" },
      { name: "Playwright", icon: "🎭", tooltip: "Used in automation testing", color: "white" },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "OpenAI API", icon: "🧠", tooltip: "Used in AI Chatbot project" },
      { name: "Gemini API", icon: "💎", tooltip: "Used in Portfolio Chatbot" },
      { name: "LLM Integration", icon: "🔧", tooltip: "Used in AI Chatbot project" },
      { name: "Prompt Engineering", icon: "📐", tooltip: "Used in all AI projects" },
      { name: "RAG", icon: "📚", tooltip: "Retrieval-Augmented Generation for smart context", color: "cyan" },
    ],
  },
  {
    title: "TOOLS & DEPLOYMENT",
    skills: [
      { name: "Git/GitHub", icon: "🐙", tooltip: "All projects version controlled" },
      { name: "Vercel", icon: "🚀", tooltip: "Deployed Portfolio site" },
      { name: "Netlify", icon: "🌐", tooltip: "Deployed Weather App" },
      { name: "npm", icon: "📦", tooltip: "Used in all Node projects" },
      { name: "SQLite", icon: "🗄️", tooltip: "Used in data projects" },
    ],
  },
]

const SkillTag = ({ skill }: { skill: any }) => {
  const getStyle = () => {
    if (skill.color === "cyan") {
      return "bg-cyan-50 border-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
    }
    if (skill.color === "white") {
      return "bg-slate-100 border-slate-200 text-slate-900 dark:bg-slate-500/10 dark:border-slate-500/30 dark:text-slate-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
    }
    return "bg-secondary/50 border-border/50 text-foreground dark:bg-[#1a2235] dark:hover:border-primary/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
  }

  return (
    <div className="relative group/tag">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 cursor-default ${getStyle()}`}>
        <span className="transition-transform text-xs group-hover/tag:rotate-[10deg]">{skill.icon}</span>
        <span className="text-[11px] font-medium">{skill.name}</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] px-2 py-1 bg-popover text-popover-foreground text-[9px] rounded border border-border/50 opacity-0 group-hover/tag:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
        {skill.tooltip}
      </div>
    </div>
  )
}

const BentoBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 rounded-[2.5rem] border border-border/50 bg-white/60 dark:bg-[#1a2235]/40 backdrop-blur-sm shadow-xl hover:border-primary/30 transition-all duration-500 group ${className}`}>
    {children}
  </div>
)

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [terminalKey, setTerminalKey] = useState(0)
  const sectionRef = useRef(null)
  const { getText } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTerminalKey(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          {/* Tile 1: Profile Photo */}
          <BentoBox className="md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center text-center">
            <div className="relative w-full aspect-[1536/1026] rounded-[2rem] border-4 border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden mb-6">
              <Image src="/profile.png" alt="SweetyCodes" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">SweetyCodes</h2>
            <p className="text-primary text-sm font-medium">{getText("Full-Stack Developer & AI Engineer")}</p>
          </BentoBox>

          {/* Tile 2: Terminal */}
          <BentoBox className="md:col-span-2 lg:col-span-4 p-0 border-none bg-transparent shadow-none backdrop-blur-none">
            <TerminalBio key={terminalKey} />
          </BentoBox>

          {/* Tile 3: Bio */}
          <BentoBox className="md:col-span-4 lg:col-span-4 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">
              {getText("Building Intelligent Systems for the Global Market.")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {getText("bioParagraph")}
            </p>
          </BentoBox>

          {/* Tile 4: Tech Stack */}
          <BentoBox className="md:col-span-2 lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border/50 pb-2">
              {getText("Tech Stack")}
            </h4>
            <div className="space-y-6">
              {skillCategories.map((cat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-primary mb-2 uppercase tracking-tighter">{cat.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s, si) => <SkillTag key={s.name} skill={s} />)}
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* Tile 5 & 6: Charts */}
          <BentoBox className="md:col-span-3 lg:col-span-3">
             <SkillRadar />
          </BentoBox>
          <BentoBox className="md:col-span-3 lg:col-span-3">
             <LanguagesWorkflow />
          </BentoBox>

          {/* Tile 7: Learning Footer */}
          <BentoBox className="md:col-span-full lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{getText("Currently Learning:")}</p>
             <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "⚡ TypeScript", color: "text-blue-600 dark:text-blue-500" },
                  { label: "🇰🇷 TOPIK Korean", color: "text-red-600 dark:text-red-500" },
                  { label: "🤖 Machine Learning", color: "text-emerald-600 dark:text-emerald-500" },
                ].map((item, idx) => (
                  <span key={idx} className={`px-4 py-1.5 rounded-xl bg-secondary/30 text-[10px] font-bold ${item.color} animate-pulse shadow-sm border border-border/30`}>
                    {item.label}
                  </span>
                ))}
             </div>
          </BentoBox>
        </div>
      </div>
    </section>
  )
}
