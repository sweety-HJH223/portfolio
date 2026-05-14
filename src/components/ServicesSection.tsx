"use client"
import React from "react"
import { Globe, Bot, BarChart3, Search, Smartphone, Languages } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const services = [
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "End-to-end web apps with React, Next.js, and modern backends",
    color: "text-blue-500",
  },
  {
    icon: Bot,
    title: "AI Bots & Agents",
    description: "Custom AI agents and chatbots using Gemini and OpenAI APIs",
    color: "text-purple-500",
  },
  {
    icon: BarChart3,
    title: "Data Automation",
    description: "Python workflows that eliminate repetitive manual processes",
    color: "text-emerald-500",
  },
  {
    icon: Search,
    title: "Web Scrapers",
    description: "Extract and process data from any website ethically",
    color: "text-amber-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Apps",
    description: "Responsive designs that work seamlessly on any device",
    color: "text-rose-500",
  },
  {
    icon: Languages,
    title: "Bilingual Applications",
    description: "Professional English and Korean EN/KO web experiences",
    color: "text-cyan-500",
  },
  {
    icon: Bot,
    title: "AI Powered Tools",
    description: "Intelligent tools for analysis and generation",
    color: "text-indigo-500",
  },
  {
    icon: Search,
    title: "Web Scraping & Mining",
    description: "Turn website data into structured, actionable insights",
    color: "text-teal-500",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Deploying performant, scalable apps to the global market",
    color: "text-orange-500",
  },
]

export default function ServicesSection() {
  const { getText } = useLanguage()

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          {getText("What I Can Build For You")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-2 hover:border-primary shadow-lg hover:shadow-primary/20"
            >
              <service.icon 
                size={40} 
                className={`${service.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 animate-[float_3s_ease-in-out_infinite]`} 
              />
              <h3 className="text-xl font-bold text-foreground mb-3">{getText(service.title as any)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{getText(service.description as any)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
