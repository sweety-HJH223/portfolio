"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Languages, Workflow } from "lucide-react"

export default function LanguagesWorkflow() {
  const { getText } = useLanguage()

  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-lg space-y-6">
      <h4 className="text-xl font-bold text-foreground">{getText("Languages & Workflow")}</h4>
      
      <div>
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Languages size={18} />
          <span className="font-semibold">{getText("Languages")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">English (Fluent)</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Korean (Conversational) 🇰🇷</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Workflow size={18} />
          <span className="font-semibold">{getText("Dev Workflow")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">VS Code</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Git/GitHub</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Agile Sprints</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Vibe Coding (AI-Assisted Prototyping)</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Docker</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">ESLint/Prettier</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">Jest/Testing</span>
          <span className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium">CI/CD</span>
        </div>
      </div>
    </div>
  )
}
