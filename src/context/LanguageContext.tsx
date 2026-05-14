"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "ko"

type TextKeys =
  | "About" | "Work" | "Projects"
  | "Open for Work"
  | "I build digital experiences that matter"
  | "View My Work"
  | "CS Graduate specializing..."
  | "New Seller"
  | "Hackathons Won" | "Certs Earned"
  | "Bilingual Developer" | "Hours Self-learned"
  | "TOPIK Prep in Progress"
  | "Building Intelligent Systems for the Global Market."
  | "Tech Stack" | "Currently Learning:"
  | "Download Resume" | "bioParagraph"
  | "Let's Build Something Together"
  | "Open to remote internships..."
  | "Email" | "Open Chat" | "Message Me"
  | "Professional Profile" | "Source Code"
  | "Made with ❤️ by SweetyCodes"
  | "Full-Stack Developer & AI Engineer"| "Resume"
  | "What I Can Build For You"
  | "Full-Stack Development" | "End-to-end web apps with React, Next.js, and modern backends"
  | "AI Bots & Agents" | "Custom AI agents and chatbots using Gemini and OpenAI APIs"
  | "Data Automation" | "Python workflows that eliminate repetitive manual processes"
  | "Web Scrapers" | "Extract and process data from any website ethically"
  | "Mobile Friendly Apps" | "Responsive designs that work seamlessly on any device"
  | "Bilingual Applications" | "Professional English and Korean EN/KO web experiences"
  | "AI Powered Tools" | "Intelligent tools for analysis and generation"
  | "Web Scraping & Mining" | "Turn website data into structured, actionable insights"
  | "Global Scalability" | "Deploying performant, scalable apps to the global market"
  | "ACHIEVEMENTS" | "CERTIFICATIONS" | "EDUCATION"
  | "Why Work With Me?"
  | "Frontend AND Python skills combined"
  | "Already works with AI tools professionally"
  | "Speaks Korean — rare for Indian developers"
  | "Hackathon winner — proven under pressure"
  | "Available immediately for remote work"
  | "Self-learner — 100+ hours Python & AI"
  | "Multiple certifications — always learning"
  | "Skill Proficiency"
  | "Languages & Workflow" | "Languages" | "Dev Workflow"
  | "Ask me about Sweety!" 
  | "Ask me about skills, projects, or hire her!"
  | "Vibing! 💃" | "Singing! 🎵" | "Wooo! 🌀" | "Peek-a-boo! 👀" | "Zzz... 💤" | "Nom nom! 😋"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  getText: (key: TextKeys) => string
}

const translations = {
  en: {
    About: "About",
    Work: "Work",
    Projects: "Projects",
    "Open for Work": "Open for Work",
    "I build digital experiences that matter": "I build digital experiences that matter",
    "View My Work": "View My Work",
    "CS Graduate specializing...": "CS Graduate specializing in Frontend Development, Python Automation and AI Integration. Hackathon winner targeting global and Korean opportunities.",
    "New Seller": "New Seller",
    "Hackathons Won": "Hackathons Won",
    "Certs Earned": "Certs Earned",
    "Bilingual Developer": "Bilingual Developer",
    "Hours Self-learned": "Hours Self-learned",
    "TOPIK Prep in Progress": "TOPIK Prep in Progress",
    "Building Intelligent Systems for the Global Market.": "Building Intelligent Systems for the Global Market.",
    "Tech Stack": "Tech Stack",
    "Currently Learning:": "Currently Learning:",
    "Download Resume": "Download Resume",
    bioParagraph: `I am a Full-Stack Developer & AI Engineer at the intersection of Web Development, Python Automation and AI Integration. I specialize in building bilingual (EN/KO) web applications and autonomous Python workflows that transform manual processes into efficient digital solutions.\n\nFrom building data pipelines and web scrapers to designing responsive interfaces in Next.js, I focus on writing clean, scalable code. Hackathon winner with hands-on experience in AI APIs, automation systems and modern web technologies. Currently targeting remote and Korean tech opportunities.`,
    "Let's Build Something Together": "Let's Build Something Together",
    "Open to remote internships...": "Open to remote internships, junior developer roles and freelance projects globally. Korean and English communication welcome 🇰🇷",
    Email: "Email",
    "Open Chat": "Open Chat",
    "Message Me": "Message Me",
    "Professional Profile": "Professional Profile",
    "Source Code": "Source Code",
    "Made with ❤️ by SweetyCodes": "Made with ❤️ by SweetyCodes",
    "Full-Stack Developer & AI Engineer": "Full-Stack Developer & AI Engineer",
    "Resume": "Resume",
    "What I Can Build For You": "What I Can Build For You",
    "Full-Stack Development": "Full-Stack Development",
    "End-to-end web apps with React, Next.js, and modern backends": "End-to-end web apps with React, Next.js, and modern backends",
    "AI Bots & Agents": "AI Bots & Agents",
    "Custom AI agents and chatbots using Gemini and OpenAI APIs": "Custom AI agents and chatbots using Gemini and OpenAI APIs",
    "Data Automation": "Data Automation",
    "Python workflows that eliminate repetitive manual processes": "Python workflows that eliminate repetitive manual processes",
    "Web Scrapers": "Web Scrapers",
    "Extract and process data from any website ethically": "Extract and process data from any website ethically",
    "Mobile Friendly Apps": "Mobile Friendly Apps",
    "Responsive designs that work seamlessly on any device": "Responsive designs that work seamlessly on any device",
    "Bilingual Applications": "Bilingual Applications",
    "Professional English and Korean EN/KO web experiences": "Professional English and Korean EN/KO web experiences",
    "AI Powered Tools": "AI Powered Tools",
    "Intelligent tools for analysis and generation": "Intelligent tools for analysis and generation",
    "Web Scraping & Mining": "Web Scraping & Mining",
    "Turn website data into structured, actionable insights": "Turn website data into structured, actionable insights",
    "Global Scalability": "Global Scalability",
    "Deploying performant, scalable apps to the global market": "Deploying performant, scalable apps to the global market",
    "Why Work With Me?": "Why Work With Me?",
    "Frontend AND Python skills combined": "Frontend AND Python skills combined",
    "Already works with AI tools professionally": "Already works with AI tools professionally",
    "Speaks Korean — rare for Indian developers": "Speaks Korean — rare for Indian developers",
    "Hackathon winner — proven under pressure": "Hackathon winner — proven under pressure",
    "Available immediately for remote work": "Available immediately for remote work",
    "Self-learner — 100+ hours Python & AI": "Self-learner — 100+ hours Python & AI",
    "Multiple certifications — always learning": "Multiple certifications — always learning",
    "Skill Proficiency": "Skill Proficiency",
    "Languages & Workflow": "Languages & Workflow",
    "Languages": "Languages",
    "Dev Workflow": "Dev Workflow",
    "Ask me about Sweety!": "Ask me about Sweety!",
    "Ask me about skills, projects, or hire her!": "Ask me about skills, projects, or hire her!",
    "Vibing! 💃": "Vibing! 💃",
    "Singing! 🎵": "Singing! 🎵",
    "Wooo! 🌀": "Wooo! 🌀",
    "Peek-a-boo! 👀": "Peek-a-boo! 👀",
    "Zzz... 💤": "Zzz... 💤",
    "Nom nom! 😋": "Nom nom! 😋",
    "ACHIEVEMENTS": "ACHIEVEMENTS",
    "CERTIFICATIONS": "CERTIFICATIONS",
    "EDUCATION": "EDUCATION",
  },
  ko: {
    About: "소개",
    Work: "경력",
    Projects: "프로젝트",
    "Open for Work": "구직 중",
    "I build digital experiences that matter": "중요한 디지털 경험을 만듭니다",
    "View My Work": "내 작업 보기",
    "CS Graduate specializing...": "웹 개발, 파이썬 자동화 및 AI 통합의 교차점에 있는 풀스택 개발자입니다",
    "New Seller": "신규 판매자",
    "Hackathons Won": "해커톤 수상",
    "Certs Earned": "취득 자격증",
    "Bilingual Developer": "이중 언어 개발자",
    "Hours Self-learned": "자기 학습 시간",
    "TOPIK Prep in Progress": "TOPIK 준비 중",
    "Building Intelligent Systems for the Global Market.": "글로벌 시장을 위한 지능형 시스템 구축",
    "Tech Stack": "기술 스택",
    "Currently Learning:": "현재 학습 중:",
    "Download Resume": "이력서 다운로드",
    bioParagraph: `저는 웹 개발, 파이썬 자동화 및 AI 통합의 교차점에서 활동하는 풀스택 개발자 및 AI 엔지니어입니다. 수동 프로세스를 효율적인 디지털 솔루션으로 변환하는 이중 언어(EN/KO) 웹 애플리케이션과 자율 파이썬 워크플로우 구축을 전문으로 합니다.\n\n데이터 파이프라인 및 웹 스크래퍼 구축부터 Next.js에서 반응형 인터페이스 설계까지, 깔끔하고 확장 가능한 코드 작성에 집중합니다.`,
    "Let's Build Something Together": "함께 무언가를 만들어봐요",
    "Open to remote internships...": "원격 인턴십, 주니어 개발자 역할 및 전 세계 프리랜서 프로젝트에 열려 있습니다. 한국어와 영어 소통 환영 🇰🇷",
    Email: "이메일",
    "Open Chat": "채팅 열기",
    "Message Me": "메시지 보내기",
    "Professional Profile": "전문 프로필",
    "Source Code": "소스 코드",
    "Made with ❤️ by SweetyCodes": "SweetyCodes가 ❤️로 만들었습니다",
    "Full-Stack Developer & AI Engineer": "풀스택 개발자 & AI 엔지니어",
    "Resume": "이력서",
    "What I Can Build For You": "제공 서비스",
    "Full-Stack Development": "풀스택 개발",
    "End-to-end web apps with React, Next.js, and modern backends": "React, Next.js 및 최신 백엔드로 구축한 엔드 투 엔드 웹 앱",
    "AI Bots & Agents": "AI 봇 및 에이전트",
    "Custom AI agents and chatbots using Gemini and OpenAI APIs": "Gemini와 OpenAI API를 사용한 맞춤형 AI 에이전트 및 챗봇",
    "Data Automation": "데이터 자동화",
    "Python workflows that eliminate repetitive manual processes": "반복적인 수동 프로세스를 제거하는 파이썬 워크플로우",
    "Web Scrapers": "웹 스크래퍼",
    "Extract and process data from any website ethically": "윤리적으로 웹사이트 데이터를 추출 및 처리",
    "Mobile Friendly Apps": "모바일 최적화 앱",
    "Responsive designs that work seamlessly on any device": "모든 기기에서 원활하게 작동하는 반응형 디자인",
    "Bilingual Applications": "다국어 애플리케이션",
    "Professional English and Korean EN/KO web experiences": "전문적인 영어 및 한국어(EN/KO) 웹 경험",
    "AI Powered Tools": "AI 기반 도구",
    "Intelligent tools for analysis and generation": "분석 및 생성을 위한 지능형 도구",
    "Web Scraping & Mining": "웹 스크래핑 및 데이터 마이닝",
    "Turn website data into structured, actionable insights": "웹사이트 데이터를 구조화된 실행 가능한 인사이트로 변환",
    "Global Scalability": "글로벌 확장성",
    "Deploying performant, scalable apps to the global market": "글로벌 시장을 위한 성능 중심의 확장 가능한 앱 배포",
    "Why Work With Me?": "저와 함께 일해야 하는 이유",
    "Frontend AND Python skills combined": "프론트엔드와 파이썬 기술의 결합",
    "Already works with AI tools professionally": "전문적으로 AI 도구 활용 가능",
    "Speaks Korean — rare for Indian developers": "한국어 가능 - 인도 개발자로서는 드문 역량",
    "Hackathon winner — proven under pressure": "해커톤 수상 - 압박 속에서도 검증된 실력",
    "Available immediately for remote work": "원격 근무 즉시 가능",
    "Self-learner — 100+ hours Python & AI": "자기 주도 학습자 - 파이썬 & AI 100시간 이상 학습",
    "Multiple certifications — always learning": "다양한 자격증 보유 - 끊임없이 학습 중",
    "Skill Proficiency": "기술 숙련도",
    "Languages & Workflow": "언어 및 작업 환경",
    "Languages": "언어",
    "Dev Workflow": "개발 환경",
    "Ask me about Sweety!": "Sweety에 대해 물어보세요!",
    "Ask me about skills, projects, or hire her!": "기술, 프로젝트 또는 채용에 대해 물어보세요!",
    "Vibing! 💃": "신난다! 💃",
    "Singing! 🎵": "노래하는 중! 🎵",
    "Wooo! 🌀": "우와! 🌀",
    "Peek-a-boo! 👀": "까꿍! 👀",
    "Zzz... 💤": "졸려... 💤",
    "Nom nom! 😋": "냠냠! 😋",
    "ACHIEVEMENTS": "수상 내역",
    "CERTIFICATIONS": "자격증",
    "EDUCATION": "학력",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ko" : "en"))
  }

  const getText = (key: TextKeys): string => {
    return translations[language][key] || translations.en[key] || ""
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, getText }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}