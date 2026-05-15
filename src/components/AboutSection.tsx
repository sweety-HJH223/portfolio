"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Languages, Workflow } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

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
    title: "CORE DEVELOPMENT",
    skills: [
      { name: "React", icon: "⚛️", tooltip: "Used in Portfolio + Weather App" },
      { name: "Next.js", icon: "🌐", tooltip: "Used in Portfolio site" },
      { name: "JavaScript", icon: "📜", tooltip: "Used in all frontend projects" },
      { name: "Tailwind CSS", icon: "🎨", tooltip: "Used in Portfolio site" },
      { name: "Python", icon: "🐍", tooltip: "Used in 4+ automation projects" },
      { name: "Node.js", icon: "🖥️", tooltip: "Used in backend projects" },
    ],
  },
  {
    title: "AI & DATA",
    skills: [
      { name: "OpenAI API", icon: "🧠", tooltip: "Used in AI Chatbot project" },
      { name: "Gemini API", icon: "💎", tooltip: "Used in Portfolio Chatbot" },
      { name: "Prompt Engineering", icon: "📐", tooltip: "Used in all AI projects" },
      { name: "RAG", icon: "📚", tooltip: "Currently learning via IBM RAG course" },
      { name: "Kaggle", icon: "📊", tooltip: "Used for ML datasets" },
    ],
  },
  {
    title: "AUTOMATION",
    skills: [
      { name: "BeautifulSoup", icon: "🔍", tooltip: "Used in Web Scraper project" },
      { name: "Selenium", icon: "🤖", tooltip: "Used in automation projects" },
      { name: "Playwright", icon: "🎭", tooltip: "Used in automation testing" },
      { name: "PyAutoGUI", icon: "🤖", tooltip: "Built desktop automation with OpenAI" },
      { name: "pandas", icon: "📊", tooltip: "Used in Sales Reporter + Scraper" },
      { name: "NumPy", icon: "📈", tooltip: "Used in data analysis projects" },
    ],
  },
  {
    title: "AI TOOLS & DEV",
    skills: [
      { name: "Claude AI", icon: "🤖", tooltip: "Daily AI coding assistant" },
      { name: "Cursor", icon: "⚡", tooltip: "AI-powered code editor" },
      { name: "GitHub Copilot", icon: "🐙", tooltip: "AI coding assistant" },
      { name: "V0.dev", icon: "🎨", tooltip: "AI UI generation tool" },
      { name: "Vibe Coding", icon: "🎯", tooltip: "AI-assisted prototyping" },
    ],
  },
  {
    title: "ECOSYSTEM",
    skills: [
      { name: "Git/GitHub", icon: "🐙", tooltip: "All projects version controlled" },
      { name: "Vercel", icon: "🚀", tooltip: "Deployed Portfolio site" },
      { name: "Netlify", icon: "🌐", tooltip: "Deployed Weather App" },
      { name: "Figma", icon: "🎨", tooltip: "UI/UX design tool" },
      { name: "Railway", icon: "🚂", tooltip: "Backend app deployment" },
      { name: "Command Line", icon: "💻", tooltip: "Daily development tool" },
    ],
  },
]

const SkillTag = ({ skill }: { skill: any }) => {
  return (
    <div className="relative group/tag">
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/50 bg-secondary/50 text-foreground dark:bg-[#1a2235] dark:hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-default hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        <span className="transition-transform text-base group-hover/tag:rotate-[10deg]">{skill.icon}</span>
        <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded border border-border/50 opacity-0 group-hover/tag:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
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

const SkillBars = () => {
  const { getText } = useLanguage();
  const skills = [
    { name: "Python Automation", level: 85, label: "Project-ready" },
    { name: "Frontend (React/Next)", level: 80, label: "Responsive UI" },
    { name: "AI Integration", level: 75, label: "API Implementation" },
    { name: "Backend (Node/Flask)", level: 70, label: "API Focused" },
    { name: "Data Processing", level: 82, label: "Scrapers & Analysis" },
    { name: "UI/UX Design", level: 75, label: "Clean Interfaces" },
  ]

  return (
    <div className="w-full">
      <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border/50 pb-2 mb-6 flex items-center gap-2">
        {getText("Skill Proficiency")}
      </h4>
      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-foreground">{getText(skill.name as any)} <span className="text-[10px] text-muted-foreground ml-1">({getText(skill.label as any)})</span></span>
              <span className="text-primary font-bold">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/30">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WorkflowSection = () => {
  const { getText } = useLanguage();
  return (
    <div className="w-full space-y-8">
      <div>
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border/50 pb-2 mb-4 flex items-center gap-2">
          <Languages size={14} className="text-primary" /> {getText("Languages")}
        </h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-secondary/50 rounded-xl text-xs font-medium border border-border/50">English (Fluent)</span>
          <span className="px-3 py-1.5 bg-secondary/50 rounded-xl text-xs font-medium border border-border/50">Korean (Conversational) 🇰🇷</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border/50 pb-2 mb-4 flex items-center gap-2">
          <Workflow size={14} className="text-primary" /> {getText("Dev Workflow")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "VS Code", "Git/GitHub", "npm", "pip", 
            "Command Line", "Vibe Coding (AI-Assisted)"
          ].map(tool => (
            <span key={tool} className="px-3 py-1.5 bg-primary/5 text-primary rounded-xl text-[11px] font-bold border border-primary/20 hover:bg-primary/10 transition-colors cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [terminalKey, setTerminalKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { getText } = useLanguage();

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTerminalKey(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.disconnect()
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          {/* Tile 1: Profile Photo */}
          <BentoBox className="md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center text-center">
            <div className="relative w-full aspect-[1229/819] rounded-[2rem] border-4 border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden mb-6">
              <Image src="/profile.png" alt="SweetyCodes" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">SweetyCodes</h2>
            <p className="text-primary text-sm font-medium">{getText("Full-Stack Developer & AI Engineer")}</p>
          </BentoBox>

          {/* Tile 2: Terminal */}
          <BentoBox className="md:col-span-2 lg:col-span-4 p-0 border-none bg-transparent shadow-none backdrop-blur-none">
            <TerminalBio key={terminalKey} />
          </BentoBox>

          {/* Tile 3: Bio */}
          <BentoBox className="md:col-span-4 lg:col-span-4 flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">
                {getText("Building Intelligent Systems for the Global Market.")}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line mb-6">
                {getText("bioParagraph")}
              </p>
              
              {/* Quick Info Row */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-t border-border/10">
                 <div className="flex items-center gap-2">
                    <span className="text-primary text-base">🎓</span>
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{getText("Education")}</p>
                      <p className="text-xs font-bold text-foreground/80">{getText("B.Sc Computer Science")}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-primary text-base">📍</span>
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{getText("Location")}</p>
                      <p className="text-xs font-bold text-foreground/80">{getText("Open to Global/KR Remote")}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-primary text-base">⚡</span>
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{getText("Status")}</p>
                      <p className="text-xs font-bold text-foreground/80">{getText("Available Immediately")}</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border/30">
               <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                 {getText("Technical Highlights")}
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "AI Orchestration", desc: "Custom agents using Gemini/OpenAI", icon: "🤖" },
                    { title: "Automated Scrapers", desc: "Scalable Python data pipelines", icon: "🔍" },
                    { title: "Bilingual UI", desc: "English & Korean web experiences", icon: "🌐" }
                  ].map((item, idx) => (
                    <div key={idx} className="group/item">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm group-hover/item:scale-110 transition-transform">{item.icon}</span>
                        <p className="text-xs font-bold text-foreground">{getText(item.title as any)}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug">{getText(item.desc as any)}</p>
                    </div>
                  ))}
               </div>
            </div>
          </BentoBox>

          {/* Tile 4: Tech Stack */}
          <BentoBox className="md:col-span-2 lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border/50 pb-2">
              {getText("Tech Stack")}
            </h4>
            <div className="space-y-6">
              {skillCategories.map((cat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-primary mb-2 uppercase tracking-tighter">{getText(cat.title as any)}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((s, si) => <SkillTag key={s.name} skill={s} />)}
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* Tile 5 & 6: Charts */}
          <BentoBox className="md:col-span-3 lg:col-span-3">
             <SkillBars />
          </BentoBox>
          <BentoBox className="md:col-span-3 lg:col-span-3">
             <WorkflowSection />
          </BentoBox>

          {/* Tile 7: Learning Footer */}
          <BentoBox className="md:col-span-full lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{getText("Currently Learning:")}</p>
             <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "⚡ TypeScript", color: "text-blue-600 dark:text-blue-500" },
                  { label: "🇰🇷 TOPIK Korean", color: "text-red-600 dark:text-red-500" },
                  { label: "🤖 Machine Learning", color: "text-emerald-600 dark:text-emerald-500" },
                  { label: "📚 IBM RAG Course", color: "text-orange-600 dark:text-orange-500" },
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
