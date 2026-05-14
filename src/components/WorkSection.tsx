"use client"
import React from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ExternalLink, Award, BookOpen, GraduationCap } from "lucide-react"

const achievements = [
  { title: "1st Place Solution Sprint", org: "Intercollege Hackathon", date: "Jan 2026", type: "Team" },
  { title: "1st Place Code Relay", org: "Intercollege Hackathon", date: "Jan 2026", type: "Team" },
  { title: "2nd Place Bug Buster", org: "Intercollege Hackathon", date: "Jan 2026", type: "Individual" },
  { title: "Keynote Speaker Blockchain Seminar", org: "Khallikote University", date: "Year 1", type: "" },
]

const certifications = [
  { title: "HackerRank Python Basic", year: "2025" },
  { title: "KMOOC Data Science and AI", year: "Sep-Oct 2025" },
  { title: "DeepLearning.ai AI and Agentic Automation", year: "Sep 2025" },
  { title: "Coursera Machine Learning Specialization", year: "Dec 2025" },
  { title: "FreeCodeCamp Full Stack Web CS50W", year: "Jun 2024" },
  { title: "Git and GitHub Version Control", year: "Jan 2026" },
]

const education = [
  { degree: "B.Sc Computer Science", school: "Khallikote University", year: "2023-2026", details: "" },
  { degree: "Senior Secondary XII Science CBSE", school: "Kendriya Vidyalaya", year: "2021", details: "88%" },
  { degree: "Secondary X CBSE", school: "Kendriya Vidyalaya", year: "2019", details: "91.4%" },
]

export default function WorkSection() {
  const { getText } = useLanguage()

  return (
    <section id="work" className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">{getText("Work")}</h2>

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
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-6 bg-card rounded-xl border border-border flex items-center justify-between group hover:shadow-lg hover:border-primary transition-all">
                <div>
                  <h4 className="font-semibold text-foreground">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">{cert.year}</p>
                </div>
                <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
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
