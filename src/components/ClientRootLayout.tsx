"use client"

import React, { useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/navigation";
import ProjectsPopup from "@/components/ProjectsPopup";
import AIChatbot from "@/components/AIChatbot";
import { LanguageProvider } from "@/context/LanguageContext"; // Import the LanguageProvider
import { UIProvider, useUI } from "@/context/UIContext"; // Import UIProvider and useUI

import { ThemeProvider } from "next-themes";

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
      <UIProvider>
        <LanguageProvider> {/* Wrap children with LanguageProvider */}
          <Navigation />{/* Navigation no longer needs onOpenProjects prop */}
          {children}
          <ProjectsPopupWrapper />
          <AIChatbot />
        </LanguageProvider>
      </UIProvider>
    </ThemeProvider>
  );
}
