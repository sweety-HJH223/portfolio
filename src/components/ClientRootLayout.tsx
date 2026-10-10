"use client"

import React, { useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Navigation from "@/components/navigation";
import ProjectsPopup from "@/components/ProjectsPopup";
import AIChatbot from "@/components/AIChatbot";
import { LanguageProvider } from "@/context/LanguageContext"; // Import the LanguageProvider
import { UIProvider, useUI } from "@/context/UIContext"; // Import UIProvider and useUI

import { ThemeProvider } from "next-themes";
import { AuroraBackground } from "@/components/fx/AuroraBackground";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

interface ClientRootLayoutProps {
  children: ReactNode;
}

const ProjectsPopupWrapper = () => {
  const { isProjectsPopupOpen, closeProjectsPopup } = useUI();
  return (
    <ProjectsPopup
      isOpen={isProjectsPopupOpen}
      onClose={closeProjectsPopup}
    />
  );
};

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        <AuroraBackground />
        <CursorGlow />
        <ScrollProgress />
        <UIProvider>
          <LanguageProvider> {/* Wrap children with LanguageProvider */}
            <Navigation />{/* Navigation no longer needs onOpenProjects prop */}
            {children}
            <ProjectsPopupWrapper />
            <AIChatbot />
          </LanguageProvider>
        </UIProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
