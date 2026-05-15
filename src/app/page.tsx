"use client"
import React from "react"
import { HeroSection } from "../components/hero-section"
import AboutSection from "../components/AboutSection"
import ServicesSection from "../components/ServicesSection"
import WorkSection from "../components/WorkSection"
import WhyHireMe from "../components/WhyHireMe"
import Link from "next/link"
import { Mail } from "lucide-react"
import { KakaoTalkIcon, WhatsAppIcon, GitHubIcon, LinkedInIcon } from "../components/social-icons"
import { useLanguage } from "@/context/LanguageContext" // Import useLanguage

export default function Home() {
  const { getText } = useLanguage(); // Get getText function from context

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WorkSection />
      <WhyHireMe />
      
      <section
        id="contact"
        className="scroll-mt-28 border-t border-border/50 py-20 px-6 bg-secondary/30"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {getText("Let's Build Something Together")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {getText("Open to remote internships...")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            <Link
              href="mailto:sweety22313@gmail.com"
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{getText("Email")}</h3>
              <p className="text-xs text-muted-foreground truncate w-full">sweety22313@gmail.com</p>
            </Link>

            <Link
              href="https://open.kakao.com/o/your-open-chat-code"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-yellow-500/10 text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                <KakaoTalkIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{getText("KakaoTalk")}</h3>
              <p className="text-xs text-muted-foreground">KakaoTalk</p>
            </Link>

            <Link
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{getText("WhatsApp")}</h3>
              <p className="text-xs text-muted-foreground">WhatsApp</p>
            </Link>

            <Link
              href="https://www.linkedin.com/in/sweety-jh-39a96a405"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <LinkedInIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{getText("Professional Profile")}</h3>
              <p className="text-xs text-muted-foreground">Professional Profile</p>
            </Link>

            <Link
              href="https://github.com/sweety-HJH223"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-slate-500/10 text-slate-500 mb-4 group-hover:scale-110 transition-transform">
                <GitHubIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{getText("Source Code")}</h3>
              <p className="text-xs text-muted-foreground">Source Code</p>
            </Link>
          </div>

          <div className="pt-8 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              {getText("Made with ❤️ by SweetyCodes")}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              {getText("Full-Stack Developer & AI Engineer")}
            </p>
            <p className="text-xs text-muted-foreground">
              🇰🇷 한국 기회를 찾고 있습니다 | © 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
