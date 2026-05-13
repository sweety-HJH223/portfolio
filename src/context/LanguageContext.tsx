"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "ko";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  getText: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "Open for Work": "Open for Work",
    "I build digital experiences that": "I build digital experiences that",
    "matter": "matter",
    "View My Work": "View My Work",
    "Freelance Credentials": "Freelance Credentials",
    About: "About",
    Work: "Work",
    Projects: "Projects",
    Resume: "Resume",
    "Hackathons Won": "Hackathons Won",
    "Certs Earned": "Certs Earned",
    "Bilingual Developer": "Bilingual Developer",
    "Hours Self-learned": "Hours Self-learned",
    "TOPIK Prep in Progress": "TOPIK Prep in Progress",
  },
  ko: {
    "Open for Work": "구직 중",
    "I build digital experiences that": "중요한 디지털 경험을",
    "matter": "만듭니다",
    "View My Work": "내 작업 보기",
    "Freelance Credentials": "프리랜서 자격",
    About: "소개",
    Work: "경력",
    Projects: "프로젝트",
    Resume: "이력서",
    "Hackathons Won": "해커톤 수상",
    "Certs Earned": "취득 자격증",
    "Bilingual Developer": "이중 언어 개발자",
    "Hours Self-learned": "자기 학습 시간",
    "TOPIK Prep in Progress": "TOPIK 준비 중",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ko" : "en"));
  };

  const getText = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, getText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
