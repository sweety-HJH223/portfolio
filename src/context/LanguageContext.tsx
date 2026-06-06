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
  | "Email" | "KakaoTalk" | "WhatsApp" | "LinkedIn" | "GitHub"
  | "Professional Profile" | "Source Code"
  | "Made with ❤️ by SweetyCodes"
  | "Full-Stack Developer & AI Engineer"| "Resume"
  | "What I Can Build For You"
  | "Full-Stack Development" | "End-to-end web apps with React, Next.js, and modern backends"
  | "Custom Internal Tools" | "AI Bots & Agents" | "Custom AI agents and chatbots using Gemini and OpenAI APIs"
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
  | "Fast-learner of new tech stacks"
  | "Full-stack versatility & expertise"
  | "Available immediately for remote work"
  | "Self-learner — 100+ hours Python & AI"
  | "Always learning"
  | "Skill Proficiency"
  | "Languages & Workflow" | "Languages" | "Dev Workflow"
  | "Ask me about Sweety!" 
  | "Ask me about skills, projects, or hire her!"
  | "Vibing! 💃" | "Singing! 🎵" | "Wooo! 🌀" | "Peek-a-boo! 👀" | "Zzz... 💤" | "Nom nom! 😋"
  | "Reliable & committed team player"
  | "CORE DEVELOPMENT" | "AI & DATA" | "AUTOMATION" | "AI TOOLS & DEV" | "ECOSYSTEM"
  | "Python Automation" | "Frontend Development" | "AI Integration" | "Backend Development" | "Data Processing" | "UI/UX Design"
  | "Project-ready" | "Responsive UI" | "API Implementation" | "API Focused" | "Scrapers & Analysis" | "Clean Interfaces"
  | "Technical Highlights" | "AI Orchestration" | "Custom agents using Gemini/OpenAI" | "Automated Scrapers" | "Scalable Python data pipelines" | "Bilingual UI" | "English & Korean web experiences"
  | "FREELANCE WORK" | "FEATURED SOLUTIONS" | "Strategic Builds" | "Transforming complex business requirements into intelligent, production-ready digital experiences."
  | "My Projects" | "Portfolio demo projects built for global clients"
  | "In Progress" | "Live Demo →"
  | "View Gallery" | "Project Details" | "Tech Stack"
  | "CarbonShine Detailing" | "Premium dark mode car detailing studio..."
  | "CarbonShine_Long_Desc" | "Full-featured lead generation site for a detailing business. Includes dynamic pricing, testimonial sliders, and an automated contact form."
  | "Paws & Play" | "Smart pet toy product page..."
  | "Paws_Play_Long_Desc" | "E-commerce concept for smart pet technology. Integrated with Stripe for seamless payment processing and a responsive product gallery."
  | "TaskFlow AI" | "AI-powered freelance automation SaaS..."
  | "TaskFlow_AI_Long_Desc" | "SaaS platform designed to automate freelance workflows using AI. Features a waitlist system and interactive FAQ components."
  | "Lead Gen" | "E-Commerce" | "SaaS"
  | "Education" | "B.Sc Computer Science" | "Location" | "Open to Global/KR Remote" | "Status" | "Available Immediately"

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
    "Technical Highlights": "Technical Highlights",
    "AI Orchestration": "AI Orchestration",
    "Custom agents using Gemini/OpenAI": "Custom agents using Gemini/OpenAI",
    "Automated Scrapers": "Automated Scrapers",
    "Scalable Python data pipelines": "Scalable Python data pipelines",
    "Bilingual UI": "Bilingual UI",
    "English & Korean web experiences": "English & Korean web experiences",
    "Education": "Education",
    "B.Sc Computer Science": "B.Sc Computer Science",
    "Location": "Location",
    "Open to Global/KR Remote": "Open to Global/KR Remote",
    "Status": "Status",
    "Available Immediately": "Available Immediately",
    "Tech Stack": "Tech Stack",
    "Currently Learning:": "Currently Learning:",
    "Download Resume": "Download Resume",
    "CORE DEVELOPMENT": "CORE DEVELOPMENT",
    "AI & DATA": "AI & DATA",
    "AUTOMATION": "AUTOMATION",
    "AI TOOLS & DEV": "AI TOOLS & DEV",
    "ECOSYSTEM": "ECOSYSTEM",
    "Skill Proficiency": "Skill Proficiency",
    "Python Automation": "Python Automation",
    "Frontend Development": "Frontend Development",
    "AI Integration": "AI Integration",
    "Backend Development": "Backend Development",
    "Data Processing": "Data Processing",
    "UI/UX Design": "UI/UX Design",
    "Project-ready": "Project-ready",
    "Responsive UI": "Responsive UI",
    "API Implementation": "API Implementation",
    "API Focused": "API Focused",
    "Scrapers & Analysis": "Scrapers & Analysis",
    "Clean Interfaces": "Clean Interfaces",
    bioParagraph: `I am an AI-focused Full-Stack Developer and recent graduate passionate about building autonomous tools and smart web apps. I spent my time bridging the gap between Python automation and clean React interfaces to create projects that solve real problems.

Focused on writing maintainable code and learning new technologies through hands-on building, I specialize in deploying agentic tools and bilingual EN/KO platforms.`,
    "Let's Build Something Together": "Let's Build Something Together",
    "Open to remote internships...": "Open to remote internships, junior developer roles and freelance projects globally. Korean and English communication welcome 🇰🇷",
    Email: "Email",
    "KakaoTalk": "KakaoTalk",
    "WhatsApp": "WhatsApp",
    "LinkedIn": "LinkedIn",
    "GitHub": "GitHub",
    "Professional Profile": "Professional Profile",
    "Source Code": "Source Code",
    "Made with ❤️ by SweetyCodes": "Made with ❤️ by SweetyCodes",
    "Full-Stack Developer & AI Engineer": "AI & Full-Stack Developer | Building AI-Powered Web Apps",
    "Resume": "Resume",
    "What I Can Build For You": "What I Can Build For You",
    "Full-Stack Development": "Full-Stack Development",
    "End-to-end web apps with React, Next.js, and modern backends": "End-to-end web apps with React, Next.js, and modern backends",
    "Custom Internal Tools": "Custom Internal Tools",
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
    "Fast-learner of new tech stacks": "Fast-learner of new tech stacks",
    "Full-stack versatility & expertise": "Full-stack versatility & expertise",
    "Available immediately for remote work": "Available immediately for remote work",
    "Self-learner — 100+ hours Python & AI": "Self-learner — 100+ hours Python & AI",
    "Always learning": "Always learning",
    "Reliable & committed team player": "Reliable & committed team player",
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
    "FREELANCE WORK": "FREELANCE WORK",
    "FEATURED SOLUTIONS": "FEATURED SOLUTIONS",
    "Strategic Builds": "Strategic Builds",
    "Transforming complex business requirements into intelligent, production-ready digital experiences.": "Transforming complex business requirements into intelligent, production-ready digital experiences.",
    "My Projects": "My Projects",
    "Portfolio demo projects built for global clients": "Portfolio demo projects built for global clients",
    "In Progress": "In Progress",
    "Live Demo →": "Live Demo →",
    "View Gallery": "View Gallery",
    "Project Details": "Project Details",
    "Tech Stack": "Tech Stack",
    "CarbonShine Detailing": "CarbonShine Detailing",
    "Premium dark mode car detailing studio...": "Premium dark mode car detailing studio with pricing cards and working lead capture form.",
    "CarbonShine_Long_Desc": "Full-featured lead generation site for a detailing business. Includes dynamic pricing, testimonial sliders, and an automated contact form.",
    "Paws & Play": "Paws & Play",
    "Smart pet toy product page...": "Smart pet toy product page with image gallery and Stripe test payment integration.",
    "Paws_Play_Long_Desc": "E-commerce concept for smart pet technology. Integrated with Stripe for seamless payment processing and a responsive product gallery.",
    "TaskFlow AI": "TaskFlow AI",
    "AI-powered freelance automation SaaS...": "AI-powered freelance automation SaaS landing page with FAQ accordion and waitlist form.",
    "TaskFlow_AI_Long_Desc": "SaaS platform designed to automate freelance workflows using AI. Features a waitlist system and interactive FAQ components.",
    "Lead Gen": "Lead Gen",
    "E-Commerce": "E-Commerce",
    "SaaS": "SaaS",
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
    "Technical Highlights": "핵심 기술 하이라이트",
    "AI Orchestration": "AI 오케스트레이션",
    "Custom agents using Gemini/OpenAI": "Gemini/OpenAI를 활용한 맞춤형 에이전트",
    "Automated Scrapers": "자동화된 스크래퍼",
    "Scalable Python data pipelines": "확장 가능한 파이썬 데이터 파이프라인",
    "Bilingual UI": "다국어 UI 디자인",
    "English & Korean web experiences": "영어 및 한국어 웹 경험 제공",
    "Education": "학력",
    "B.Sc Computer Science": "컴퓨터공학 학사",
    "Location": "희망 근무지",
    "Open to Global/KR Remote": "글로벌/한국 원격 근무 가능",
    "Status": "현재 상태",
    "Available Immediately": "즉시 근무 가능",
    "Tech Stack": "기술 스택",
    "Currently Learning:": "현재 학습 중:",
    "Download Resume": "이력서 다운로드",
    "CORE DEVELOPMENT": "핵심 개발 역량",
    "AI & DATA": "AI 및 데이터",
    "AUTOMATION": "자동화",
    "AI TOOLS & DEV": "AI 도구 및 개발 환경",
    "ECOSYSTEM": "생태계 및 배포",
    "Skill Proficiency": "기술 숙련도",
    "Python Automation": "파이썬 자동화",
    "Frontend Development": "프론트엔드 개발",
    "AI Integration": "AI 통합",
    "Backend Development": "백엔드 개발",
    "Data Processing": "데이터 처리",
    "UI/UX Design": "UI/UX 디자인",
    "Project-ready": "프로젝트 수행 가능",
    "Responsive UI": "반응형 UI 디자인",
    "API Implementation": "API 구현",
    "API Focused": "API 중심 개발",
    "Scrapers & Analysis": "스크래퍼 및 데이터 분석",
    "Clean Interfaces": "깔끔한 인터페이스",
    bioParagraph: `저는 자율적인 도구와 스마트한 웹 앱 구축에 열정적인 AI 중심 풀스택 개발자이자 갓 졸업한 신입 엔지니어입니다. 파이썬 자동화와 깔끔한 React 인터페이스 사이의 간극을 메우며 실제 문제를 해결하는 프로젝트를 만드는 데 집중해 왔습니다.

유지보수가 용이한 코드를 작성하고 직접 부딪치며 새로운 기술을 배우는 것을 즐기며, 특히 에이전틱(Agentic) 도구 배포와 다국어(영어/한국어) 플랫폼 구축에 특화되어 있습니다.`,
    "Let's Build Something Together": "함께 무언가를 만들어봐요",
    "Open to remote internships...": "원격 인턴십, 주니어 개발자 역할 및 전 세계 프리랜서 프로젝트에 열려 있습니다. 한국어와 영어 소통 환영 🇰🇷",
    Email: "이메일",
    "KakaoTalk": "카카오톡",
    "WhatsApp": "왓츠앱",
    "LinkedIn": "링크드인",
    "GitHub": "깃허브",
    "Professional Profile": "전문 프로필",
    "Source Code": "소스 코드",
    "Made with ❤️ by SweetyCodes": "SweetyCodes가 ❤️로 만들었습니다",
    "Full-Stack Developer & AI Engineer": "풀스택 개발자 & AI 엔지니어",
    "Resume": "이력서",
    "What I Can Build For You": "제공 서비스",
    "Full-Stack Development": "풀스택 개발",
    "End-to-end web apps with React, Next.js, and modern backends": "React, Next.js 및 최신 백엔드로 구축한 엔드 투 엔드 웹 앱",
    "Custom Internal Tools": "맞춤형 사내 도구",
    "AI Bots & Agents": "AI 통합 및 에이전트",
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
    "Fast-learner of new tech stacks": "새로운 기술 스택을 빠르게 습득하는 학습자",
    "Full-stack versatility & expertise": "풀스택 다재다능함 및 전문성",
    "Available immediately for remote work": "원격 근무 즉시 가능",
    "Self-learner — 100+ hours Python & AI": "자기 주도 학습자 - 파이썬 & AI 100시간 이상 학습",
    "Always learning": "끊임없이 학습하는 자세",
    "Reliable & committed team player": "신뢰할 수 있고 헌신적인 팀 플레이어",
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
    "FREELANCE WORK": "프리랜서 작업",
    "FEATURED SOLUTIONS": "주요 솔루션",
    "Strategic Builds": "전략적 구축 사례",
    "Transforming complex business requirements into intelligent, production-ready digital experiences.": "복잡한 비즈니스 요구사항을 지능적이고 즉시 서비스 가능한 디지털 경험으로 전환합니다.",
    "My Projects": "나의 프로젝트",
    "Portfolio demo projects built for global clients": "글로벌 고객을 위해 구축된 포트폴리오 데모 프로젝트",
    "In Progress": "진행 중",
    "Live Demo →": "라이브 데모 →",
    "View Gallery": "갤러리 보기",
    "Project Details": "프로젝트 상세",
    "Tech Stack": "기술 스택",
    "CarbonShine Detailing": "카본샤인 디테일링",
    "Premium dark mode car detailing studio...": "가격 카드와 작동하는 리드 캡처 양식을 갖춘 프리미엄 다크 모드 자동차 디테일링 스튜디오입니다.",
    "CarbonShine_Long_Desc": "디테일링 비즈니스를 위한 기능이 완비된 리드 생성 사이트입니다. 동적 가격 책정, 고객 후기 슬라이더 및 자동 연락처 양식이 포함되어 있습니다.",
    "Paws & Play": "포즈 & 플레이",
    "Smart pet toy product page...": "이미지 갤러리와 Stripe 테스트 결제 연동 기능이 포함된 스마트 반려동물 장난감 제품 페이지입니다.",
    "Paws_Play_Long_Desc": "스마트 반려동물 기술을 위한 이커머스 컨셉입니다. 원활한 결제 처리를 위해 Stripe와 통합되었으며 반응형 제품 갤러리를 갖추고 있습니다.",
    "TaskFlow AI": "태스크플로우 AI",
    "AI-powered freelance automation SaaS...": "FAQ 아코디언과 대기자 명단 양식을 갖춘 AI 기반 프리랜서 자동화 SaaS 랜딩 페이지입니다.",
    "TaskFlow_AI_Long_Desc": "AI를 사용하여 프리랜서 워크플로우를 자동화하도록 설계된 SaaS 플랫폼입니다. 대기자 명단 시스템과 인터랙티브 FAQ 구성 요소가 특징입니다.",
    "Lead Gen": "잠재 고객 확보",
    "E-Commerce": "이커머스",
    "SaaS": "SaaS",
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