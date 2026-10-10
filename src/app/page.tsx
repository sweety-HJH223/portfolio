"use client"
import React from "react"
import { HeroSection } from "../components/hero-section"
import AboutSection from "../components/AboutSection"
import ServicesSection from "../components/ServicesSection"
import WorkSection from "../components/WorkSection"
import WhyHireMe from "../components/WhyHireMe"
import Link from "next/link"
import { Mail, ArrowUpRight } from "lucide-react"
import { KakaoTalkIcon, WhatsAppIcon, GitHubIcon, LinkedInIcon } from "../components/social-icons"
import { useLanguage } from "@/context/LanguageContext" // Import useLanguage
import { TechMarquee } from "../components/fx/TechMarquee"
import { TiltCard } from "../components/fx/TiltCard"
import { Reveal } from "../components/fx/Reveal"

export default function Home() {
  const { getText } = useLanguage(); // Get getText function from context

  const contacts = [
    {
      href: "mailto:sweety22313@gmail.com",
      title: getText("Email"),
      subtitle: "sweety22313@gmail.com",
      Icon: Mail,
      tile: "from-sky-400 to-indigo-600",
      external: false,
    },
    {
      href: "https://open.kakao.com/o/your-open-chat-code",
      title: getText("KakaoTalk"),
      subtitle: "KakaoTalk",
      Icon: KakaoTalkIcon,
      tile: "from-yellow-300 to-amber-500",
      external: true,
    },
    {
      href: "https://wa.me/917008088959",
      title: getText("WhatsApp"),
      subtitle: "WhatsApp",
      Icon: WhatsAppIcon,
      tile: "from-emerald-400 to-green-600",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/sweetycodes",
      title: getText("LinkedIn"),
      subtitle: getText("Professional Profile"),
      Icon: LinkedInIcon,
      tile: "from-blue-400 to-blue-700",
      external: true,
    },
    {
      href: "https://github.com/sweety-HJH223",
      title: getText("GitHub"),
      subtitle: getText("Source Code"),
      Icon: GitHubIcon,
      tile: "from-slate-500 to-slate-800",
      external: true,
    },
  ]

  return (
    <main className="min-h-screen">
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <WhyHireMe />

      <section id="contact" className="scroll-mt-28 px-6 pb-12 pt-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="gradient-border relative overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16">
              <div className="absolute inset-0 bg-brand-gradient opacity-[0.14]" />
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.35)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[hsl(var(--pink)/0.3)] blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <span className="h-px w-8 bg-brand-gradient" />05<span className="h-px w-8 bg-brand-gradient" />
                </span>
                <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                  {getText("Let's Build Something Together")}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
                  {getText("Open to remote internships...")}
                </p>
                <Link
                  href="mailto:sweety22313@gmail.com"
                  className="btn-3d group mt-9 inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 font-semibold text-white"
                >
                  <Mail size={18} />
                  sweety22313@gmail.com
                  <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contacts.map(({ href, title, subtitle, Icon, tile, external }, idx) => (
              <Reveal key={href} delay={idx * 0.06}>
                <Link
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block h-full"
                >
                  <TiltCard max={12} className="glass h-full rounded-3xl">
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <div className={`icon-3d mb-4 inline-flex rounded-2xl bg-gradient-to-br ${tile} p-3.5 text-white transition-transform duration-500 group-hover/tilt:-translate-y-1 group-hover/tilt:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
                      <p className="w-full truncate text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>

          <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm text-muted-foreground">
                {getText("Made with ❤️ by SweetyCodes")}
              </p>
              <p className="text-sm text-muted-foreground">
                {getText("Full-Stack Developer & AI Engineer")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              🇰🇷 한국 기회를 찾고 있습니다 | © 2026
            </p>
          </footer>
        </div>
      </section>
    </main>
  )
}
