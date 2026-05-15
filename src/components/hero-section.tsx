"use client"

import React from "react"
import { Layers, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext";
import { useUI } from "@/context/UIContext";

const freelancePlatforms = [
  { name: "Upwork", rating: "New Seller", jobs: "Open to Work", href: "#" },
  { name: "Fiverr", rating: "New Seller", jobs: "Open to Work", href: "#" },
]

export function HeroSection() {
  const { getText, language } = useLanguage();
  const { openProjectsPopup } = useUI();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-background dark:bg-[#020617]">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          {/* Main content */}
          <div className="flex-1 max-w-2xl">
            {/* Open for Work Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {getText("Open for Work")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {language === "en" ? (
                <>
                  <span className="text-balance">I build digital experiences that</span>
                  <br />
                  <span className="text-balance">
                    {" "}
                    <span className="text-primary">matter</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="text-balance">가치 있는</span>
                  <br />
                  <span className="text-balance">
                    <span className="text-primary">디지털 경험</span>을 만듭니다
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground dark:text-slate-400 leading-relaxed max-w-xl mb-8">
              I build things at the edge of Web and AI.
              From responsive interfaces to autonomous Python 
              agents — I turn complex ideas into clean, 
              working software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={openProjectsPopup}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 group"
              >
                {getText("View My Work")}
                <Layers
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Freelance Credentials Card */}
          <div className="lg:w-96">
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Professional Stats
                </h2>
              </div>

              <div className="space-y-4">
                {freelancePlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all duration-200"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {platform.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {platform.jobs}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/20">
                  <p className="text-xl font-bold text-foreground">🏆 3x</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{getText("Hackathons Won")}</p>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/20">
                  <p className="text-xl font-bold text-foreground">📜 6+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{getText("Certs Earned")}</p>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/20 group/stat relative cursor-help">
                  <p className="text-xl font-bold text-foreground">🇰🇷 EN+KR</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{getText("Bilingual Developer")}</p>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-lg bg-secondary/20">
                  <p className="text-xl font-bold text-foreground">💡 100+</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{getText("Hours Self-learned")}</p>
                </div>
              </div>

              {/* TOPIK Badge */}
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-medium text-primary uppercase tracking-wider">
                  🇰🇷 {getText("TOPIK Prep in Progress")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  )
}
