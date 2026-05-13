import React from "react"
import { HeroSection } from "../components/hero-section"
import Link from "next/link"
import { Mail } from "lucide-react"
import { KakaoTalkIcon, WhatsAppIcon } from "../components/social-icons"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      <section
        id="contact"
        className="scroll-mt-28 border-t border-border/50 py-20 px-6"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm always open to discussing new projects, global opportunities, or how I can contribute to your team in Korea and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link
              href="mailto:sweety22313@gmail.com"
              className="group p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">sweety22313@gmail.com</p>
            </Link>

            <Link
              href="https://open.kakao.com/o/your-open-chat-code"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-yellow-500/10 text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                <KakaoTalkIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">KakaoTalk</h3>
              <p className="text-sm text-muted-foreground">Open Chat</p>
            </Link>

            <Link
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Message Me</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
