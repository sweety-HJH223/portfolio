"use client"

import React, { useState, useEffect, useRef } from "react"
import { Send, X, MessageCircle, Sparkles } from "lucide-react"

type RobotState = "idle" | "typing" | "thinking" | "replying" | "greeting" | "sleepy"
type Message = { role: "user" | "assistant"; content: string }

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [robotState, setRobotState] = useState<RobotState>("greeting")
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [idleTime, setIdleTime] = useState(0)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Initial speech bubble and greeting logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowSpeechBubble(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isOpen])

  // Idle timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleTime((prev) => {
        if (prev + 1 >= 30 && robotState === "idle") {
          setRobotState("sleepy")
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [robotState])

  // Reset idle timer on activity
  const resetIdle = () => {
    setIdleTime(0)
    if (robotState === "sleepy") setRobotState("idle")
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowSpeechBubble(false)
    resetIdle()
    if (!isOpen && messages.length === 0) {
      setRobotState("greeting")
      setTimeout(() => setRobotState("idle"), 3000)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
  }

  const detectLanguage = (text: string) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text) ? "ko" : "en"
  }

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return
    
    resetIdle()
    const userLang = detectLanguage(text)
    const newMessages: Message[] = [...messages, { role: "user", content: text }]
    setMessages(newMessages)
    setInputValue("")
    setIsTyping(true)
    setRobotState("thinking")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await response.json()
      if (data.reply) {
        setRobotState("replying")
        setMessages([...newMessages, { role: "assistant", content: data.reply }])
      }
    } catch (error) {
      console.error("Chat Error:", error)
    } finally {
      setIsTyping(false)
      setTimeout(() => setRobotState("idle"), 2000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans" onMouseMove={resetIdle}>
      <style>{`
        @keyframes robotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes robotBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes robotSwirl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes robotWobble {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes robotWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(30deg); }
        }
        @keyframes chatSlideUp {
          from { transform: translateY(100%) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes floatZ {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(10px, -20px) scale(1); opacity: 0; }
        }
        .animate-robot-bounce { animation: robotBounce 3s infinite ease-in-out; }
        .animate-robot-blink { animation: robotBlink 4s infinite; }
        .animate-robot-swirl { animation: robotSwirl 1s infinite linear; }
        .animate-robot-wobble { animation: robotWobble 0.5s infinite ease-in-out; }
        .animate-robot-wave { animation: robotWave 1s infinite ease-in-out; transform-origin: bottom left; }
        .animate-chat-slide-up { animation: chatSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-float-z { animation: floatZ 2s infinite ease-in; }
      `}</style>

      {/* Robot Button */}
      {!isOpen && (
        <div className="relative group flex flex-col items-end">
          {showSpeechBubble && (
            <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-sm font-medium text-white whitespace-nowrap animate-chat-slide-up">
              Ask me about Sweety! 👋
              <div className="absolute top-full right-6 w-3 h-3 bg-slate-900 border-r border-b border-slate-800 transform rotate-45 -translate-y-1.5" />
            </div>
          )}
        <button
            onClick={toggleChat}
            className="p-2 transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          >
            <RobotIcon state={robotState} isButton />
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[550px] max-w-[90vw] max-h-[80vh] bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-chat-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <RobotIcon state={robotState} size="sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Sweety's Assistant</h3>
                <span className="text-[10px] text-emerald-500 font-medium">Online</span>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-cyan-500/10 text-cyan-500 mb-2">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-lg font-bold text-white">Hi there! 👋</h4>
                <p className="text-sm text-slate-400 max-w-[200px] mx-auto">
                  I'm Subhashree's AI assistant. Ask me anything about her skills, projects, or how to hire her!
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-cyan-500/20"
                      : "bg-slate-900 text-cyan-50 rounded-tl-none border border-white/5"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Buttons */}
          <div className="p-3 border-t border-white/5 flex flex-wrap gap-2 bg-slate-950/50">
            {[
              { label: "🚀 Skills", q: "What are your technical skills?" },
              { label: "💼 Projects", q: "Tell me about your projects" },
              { label: "🏆 Achievements", q: "What are your achievements?" },
              { label: "💰 Hire Her", q: "How can I hire Subhashree?" },
              { label: "🇰🇷 한국어로", q: "한국어로 대화해요" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleQuickQuestion(btn.q)}
                className="px-3 py-1.5 text-[10px] font-bold bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 rounded-lg border border-white/5 transition-all"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-4 bg-slate-950 border-t border-white/5 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                if (e.target.value && robotState !== "typing") setRobotState("typing")
                if (!e.target.value) setRobotState("idle")
              }}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

function RobotIcon({ state, isButton, size = "md" }: { state: RobotState; isButton?: boolean; size?: "sm" | "md" }) {
  const s = size === "sm" ? 32 : 64
  
  return (
    <div className={`relative ${isButton ? "animate-robot-bounce" : ""}`}>
      {state === "sleepy" && (
        <div className="absolute -top-4 -right-2 text-[10px] font-bold text-cyan-500 animate-float-z">
          Zzz
        </div>
      )}
      {state === "greeting" && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400 animate-bounce">
          Hi!
        </div>
      )}
      <svg
        width={s}
        height={s}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${state === "thinking" ? "animate-robot-wobble" : ""}`}
      >
        {/* Body */}
        <rect x="16" y="36" width="32" height="20" rx="6" fill="#0F172A" stroke="#00BCD4" strokeWidth="2" />
        
        {/* Head */}
        <rect x="12" y="8" width="40" height="32" rx="10" fill="#0F172A" stroke="#00BCD4" strokeWidth="2" />
        
        {/* Eyes Group */}
        <g className={`${state === "thinking" ? "animate-robot-swirl origin-[32px_22px]" : ""} ${state === "idle" ? "group-hover:translate-x-[2px] transition-transform duration-500" : ""}`}>
          {state === "sleepy" ? (
            <>
              <line x1="20" y1="22" x2="28" y2="22" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="22" x2="44" y2="22" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <circle
                cx="24"
                cy="22"
                r={state === "typing" ? 5 : 4}
                fill={state === "greeting" ? "none" : "#00BCD4"}
                stroke={state === "greeting" ? "#00BCD4" : "none"}
                className={state === "idle" ? "animate-robot-blink" : ""}
              >
                {state === "greeting" && <path d="M24 18l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="#00BCD4" />}
              </circle>
              {/* Right Eye */}
              <circle
                cx="40"
                cy="22"
                r={state === "typing" ? 5 : 4}
                fill={state === "replying" ? "none" : "#00BCD4"}
                stroke={state === "replying" ? "#00BCD4" : "none"}
                className={`${state === "idle" ? "animate-robot-blink" : ""} group-hover:opacity-0 transition-opacity`}
              >
                {state === "replying" && <path d="M36 22q4-4 8 0" stroke="#00BCD4" fill="none" />}
                {state === "greeting" && <path d="M40 18l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="#00BCD4" />}
              </circle>
              {/* Hover Wink Path */}
              <path 
                d="M36 22q4-4 8 0" 
                stroke="#00BCD4" 
                strokeWidth="2"
                fill="none" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </>
          )}
        </g>
        
        {/* Mouth */}
        <path
          d={state === "replying" ? "M24 32 Q32 38 40 32" : "M26 32 L38 32"}
          stroke="#00BCD4"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Arms */}
        <line
          x1="12"
          y1="40"
          x2="6"
          y2="48"
          stroke="#00BCD4"
          strokeWidth="2"
          strokeLinecap="round"
          className={state === "greeting" ? "animate-robot-wave" : ""}
        />
        <line x1="52" y1="40" x2="58" y2="48" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
