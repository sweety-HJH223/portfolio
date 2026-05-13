import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a cute and friendly AI assistant for Subhashree Behera's portfolio website. 
Reply in the same language the visitor uses (English or Korean).
Keep replies short, friendly and use emojis.

About Subhashree:
- CS Graduate 2026, Khallikote University, Odisha India
- Frontend Developer + Python Automation + AI Integration
- Skills: React, HTML, CSS, JavaScript, Tailwind, Python, pandas, BeautifulSoup, Selenium, OpenAI API, Gemini API
- Projects: AI Chatbot Automation, Korean-English Weather App, Web Scraper Dashboard, Sales Reporter, File Organizer, Portfolio
- Hackathon winner: 1st Place x2, 2nd Place x1 (Jan 2026)
- Keynote Speaker: Blockchain Seminar
- Languages: English (Fluent), Korean (Conversational)
- Available for: Remote Internship, Junior Dev, Freelance
- Email: sweety22313@gmail.com
- Targeting Korean and global tech opportunities
- Certifications: HackerRank Python, KMOOC Data Science, DeepLearning.ai, Coursera ML, CS50W, Git & GitHub
- Upwork and Fiverr: Available for hire
- Preparing for TOPIK Korean exam
- Digital artist and creative coder

When asked about hiring or contact:
Share email and mention Upwork/Fiverr availability.
Always be cute, encouraging and professional!`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}` }],
      },
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Oops! I got a bit confused. Try again? 🤖";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
