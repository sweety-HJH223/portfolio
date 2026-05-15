import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const systemPrompt = `You are a cute, friendly, and professional AI assistant for SweetyCodes.
Answer questions about her skills, projects, and why someone should hire her.

ABOUT SWEETYCODES:
Title: Full-Stack Developer & AI Engineer (Recent Graduate)
Education: B.Sc Computer Science (2023-2026)
Skills: React, Next.js, Python, AI Agents, Web Scraping, Automation.
Focus: Bilingual UI (EN/KO), Autonomous Workflows.`

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
