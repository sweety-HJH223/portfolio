"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"

const skills = [
  { name: "Frontend", level: 90 },
  { name: "Python", level: 95 },
  { name: "AI/ML", level: 85 },
  { name: "Automation", level: 90 },
  { name: "UI/UX", level: 80 },
]

export default function SkillRadar() {
  const { getText } = useLanguage()

  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
      <h4 className="text-xl font-bold text-foreground mb-6">{getText("Skill Proficiency")}</h4>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-foreground">{skill.name}</span>
              <span className="text-primary">{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
