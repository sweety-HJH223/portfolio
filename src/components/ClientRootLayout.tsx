"use client";

import React, { useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/navigation";
import ProjectsPopup from "@/components/ProjectsPopup";
import AIChatbot from "@/components/AIChatbot";
import { LanguageProvider } from "@/context/LanguageContext";

type ClientRootLayoutProps = {
  children: ReactNode;
};

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  const [isProjectsPopupOpen, setIsProjectsPopupOpen] = useState(false);

  return (
    <LanguageProvider>
      <Navigation onOpenProjects={() => setIsProjectsPopupOpen(true)} />
      {children}
      <ProjectsPopup
        isOpen={isProjectsPopupOpen}
        onClose={() => setIsProjectsPopupOpen(false)}
      />
      <AIChatbot />
    </LanguageProvider>
  );
}
