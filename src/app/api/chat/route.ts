import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const systemPrompt = `You are a cute, friendly, and professional AI assistant for SweetyCodes.
Answer questions about her skills, projects, and why someone should hire her.

ABOUT SWEETYCODES:
Title: AI & Full-Stack Developer | Building AI-Powered Web Apps (Recent Graduate)
Education: B.Sc Computer Science (2023-2026)
Skills: React, Next.js, Python, AI Agents, Web Scraping, Automation.
Focus: Bilingual UI (EN/KO), Autonomous Workflows.

STRATEGIC BUILDS (PROJECTS):
1. CarbonShine Detailing (Lead Gen)
   - Stack: Next.js, Tailwind, Formspree
   - Summary: Premium dark mode car detailing studio.
   - Details: Full-featured lead generation site with dynamic pricing, testimonial sliders, and automated contact forms.
   - KR Title: 카본샤인 디테일링 (잠재 고객 확보)
   - KR Details: 디테일링 비즈니스를 위한 리드 생성 사이트. 동적 가격 책정 및 자동 연락처 양식 포함.

2. Paws & Play (E-Commerce)
   - Stack: Next.js, Stripe, Tailwind
   - Summary: Smart pet toy product page.
   - Details: E-commerce concept with Stripe test payment integration and responsive product galleries.
   - KR Title: 포즈 & 플레이 (이커머스)
   - KR Details: Stripe 결제 연동 및 반응형 제품 갤러리를 갖춘 반려동물 용품 페이지.

3. TaskFlow AI (SaaS)
   - Stack: Next.js, Tailwind, AI
   - Summary: AI-powered freelance automation SaaS.
   - Details: SaaS platform with waitlist system and interactive FAQ components designed to automate workflows.
   - KR Title: 태스크플로우 AI (SaaS)
   - KR Details: AI를 활용한 워크플로우 자동화 SaaS 플랫폼. 대기자 명단 및 FAQ 시스템 포함.

Tone: Professional, expert, but approachable. Use emojis. If asked about these projects, mention their specific stacks and business value.`

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return NextResponse.json({ reply: "API Key missing in .env! 🔑" }, { status: 500 })

    const genAI = new GoogleGenerativeAI(apiKey)
    
    const model = genAI.getGenerativeModel(
      { model: "gemini-3.1-flash-lite" }
    )

    const languageInstruction = language === "ko" 
      ? "Reply in Korean (한국어)." 
      : "Reply in English."

    const processedHistory = messages.length > 2 
      ? messages.slice(1, -1).map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content || "" }],
        }))
      : []

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${languageInstruction}` }] },
        { role: "model", parts: [{ text: language === "ko" ? "안녕하세요! 무엇을 도와드릴까요?" : "Hi! How can I help you?" }] },
        ...processedHistory,
      ],
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(lastMessage)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ reply: text })
  } catch (error: any) {
    console.error("[Chat API Error]", error)
    
    if (error.message?.includes("404")) {
      return NextResponse.json(
        { reply: "Error 404: The model was not found. Please ensure 'Generative Language API' is ENABLED in your Google AI Studio / Cloud project settings. 🧠" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { reply: `Oops! I had a glitch: ${error.message || "Unknown error"}. 😅` },
      { status: 500 }
    )
  }
}
