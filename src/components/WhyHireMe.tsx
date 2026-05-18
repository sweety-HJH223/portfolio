"use client"
import React from "react"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const reasons = [
  "Frontend AND Python skills combined",
  "Already works with AI tools professionally",
  "Speaks Korean — rare for Indian developers",
  "Hackathon winner — proven under pressure",
  "Available immediately for remote work",
  "Self-learner — 100+ hours Python & AI",
  "Multiple certifications — always learning",
  "Custom Internal Tools",
  "AI Bots & Agents",
]

export default function WhyHireMe() {
  const { getText } = useLanguage()

  return (
    <section className="py-20 px-6 bg-secondary/20 border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          {getText("Why Work With Me?")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-all group"
            >
              <CheckCircle2 className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <p className="text-foreground font-medium">{getText(reason as any)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
