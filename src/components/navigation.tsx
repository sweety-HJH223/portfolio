"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { profileSocialLinks } from "./social-icons"
import ResumeModal from "./ResumeModal"
import { useLanguage } from "@/context/LanguageContext";

function opensInNewTab(href: string) {
  return /^https?:\/\//i.test(href)
}

const navLinks = [
]

interface NavigationProps {
  onOpenProjects: () => void;
}

export default function Navigation({ onOpenProjects }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const { language, toggleLanguage, getText } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              <span className="text-primary">{"<"}</span>
              dev
              <span className="text-primary">{" />"}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between flex-1 gap-4">
              {/* Spacer to push nav links to center (for smaller screens) */}
              <div className="flex-1" /> 

              {/* Nav Links */}
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    href="#about"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {getText("About")}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#work"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {getText("Work")}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onOpenProjects}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {getText("Projects")}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              </ul>

              {/* Right-aligned group: Social, Toggles, Resume */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="h-6 w-px bg-border/50 mx-2" />
                {/* Social icons */}
                <div className="flex items-center gap-1">
                  {profileSocialLinks.map(({ href, label, Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      {...(opensInNewTab(href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={label}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      <Icon />
                    </Link>
                  ))}
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                  aria-label="Toggle language"
                >
                  {language === "en" ? "🇬🇧" : "🇰🇷"}
                </button>

                {/* Resume Button */}
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="ml-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  {getText("Resume")}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-in slide-in-from-top duration-300">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getText("About")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#work"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getText("Work")}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenProjects();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getText("Projects")}
                  </button>
                </li>

                <li className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    {profileSocialLinks.map(({ href, label, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        {...(opensInNewTab(href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        aria-label={label}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                      >
                        <Icon />
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                      onClick={toggleLanguage}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {language === "en" ? "🇬🇧" : "🇰🇷"}
                    </button>
                  </div>
                </li>

                <li className="pt-2">
                  <button
                    onClick={() => {
                      setIsResumeOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-200"
                  >
                    {getText("Resume")}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  )
}