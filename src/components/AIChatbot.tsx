"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { RobotIcon, type RobotState } from "./RobotIcon"

type Message = { role: "user" | "assistant"; content: string }

// ─── Speech Bubble Messages ───────────────────────────────────────────────────
const speechMessages: Record<string, Record<string, string[]>> = {
  en: {
    idle:     ["Ask me about Sweety! 👋", "Hi there! 😊", "Click me! 💬", "I know everything about Sweety! ✨"],
    dancing:  ["Watch me groove! 🕺", "Dancing time! 💃", "Vibing! ✨", "Boogie! 🎉"],
    singing:  ["La la la~ 🎵", "Singing for you! 🎤", "Humming... 🎶", "Music time! 🎼"],
    eating:   ["Nom nom! 😋", "So yummy! 🍕", "Snack time! 🍎", "Delicious! 🍦"],
    lying:    ["Zzz... 💤", "So sleepy... 😴", "Just a nap! 💤", "5 more minutes... 😪"],
    spinning: ["Wooo! 🌀", "Spinning! 🔄", "Dizzy! 😵", "Wheee! 🌪️"],
    winking:  ["Wink! 😉", "Psst! 🤫", "Between us... 😏", "Heyyy! 😜"],
    heart:    ["yo!", "Aww! 🥰", "So cute! ", "Nice!"],
    waving:   ["Helloooo! 👋", "Hi hi! 🙋", "Hey you! 👋", "Yoohoo! 🤚"],
    peeking:  ["Peek-a-boo! 👀", "Found you! 🫣", "I see you! 😄", "Boo! 👻"],
    bounce:   ["Boing! 🏀", "Higher! 🚀", "Bounce bounce! ✨", "Jumping! 💨"],
    roll:     ["Rolling! 🌀", "Tumble! 🤸", "Keep rolling! 🔄", "Speedy! ⚡"],
  },
  ko: {
    idle:     ["스위티에 대해 물어봐! 👋", "안녕! 😊", "클릭해! 💬", "스위티에 대해 다 알아! ✨"],
    dancing:  ["춤 봐봐! 🕺", "댄스 타임! 💃", "신나! ✨", "부기! 🎉"],
    singing:  ["라라라~ 🎵", "노래해줄게! 🎤", "흥얼흥얼... 🎶", "음악 타임! 🎼"],
    eating:   ["냠냠! 😋", "너무 맛있어! 🍕", "간식 타임! 🍎", "맛있다! 🍦"],
    lying:    ["쿨쿨... 💤", "졸려... 😴", "잠깐 낮잠! 💤", "5분만 더... 😪"],
    spinning: ["우와! 🌀", "빙글빙글! 🔄", "어지러워! 😵", "위이이! 🌪️"],
    winking:  ["윙크! 😉", "쉿! 🤫", "우리끼리... 😏", "헤이! 😜"],
    heart:    ["해! ❤️", "귀여워! 🥰", "너무 귀엽다! ", "베프! "],
    waving:   ["안녕하세요! 👋", "하이하이! ", "이봐요! 👋", "여기요! 🤚"],
    peeking:  ["까꿍! 👀", "찾았다! 🫣", "보여요! 😄", "부! 👻"],
    bounce:   ["폴짝! 🏀", "더 높이! 🚀", "통통! ✨", "점프! 💨"],
    roll:     ["구르기! 🌀", "데굴데굴! 🤸", "계속 굴러! 🔄", "슝슝! ⚡"],
  }
}

// ─── Thinking Dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="glass flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm p-3">
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="h-2 w-2 rounded-full bg-brand-gradient"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function BotAvatar({ state, size = 32, isReplying = false }: { state: RobotState; size?: number; isReplying?: boolean }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-start justify-center overflow-hidden rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.25)] to-[hsl(var(--accent)/0.35)] ring-1 ring-white/15">
      <div className="-mt-0.5">
        <RobotIcon state={state} isReplying={isReplying} size={size} />
      </div>
    </div>
  )
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [robotState, setRobotState] = useState<RobotState>("idle")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isThinking, setIsThinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [affection, setAffection] = useState(0)
  const [speechText, setSpeechText] = useState("")
  const [showSpeech, setShowSpeech] = useState(false)
  const [foodPos, setFoodPos] = useState<{x: number, y: number} | null>(null)
  const [foodType, setFoodType] = useState("🍕")
  const { language } = useLanguage()
  const historyRef = useRef<RobotState[]>([])
  const affectionInterval = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get random speech for state
  const getRandomSpeech = useCallback((state: RobotState) => {
    const lang = language as "en" | "ko"
    const msgs = speechMessages[lang]?.[state] || speechMessages.en[state] || speechMessages.en.idle
    return msgs[Math.floor(Math.random() * msgs.length)]
  }, [language])

  // Initial position
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 160,
      y: window.innerHeight - 200,
    })
  }, [])

  const positionRef = useRef(position)
  useEffect(() => {
    positionRef.current = position
  }, [position])

  // Auto-move and state changes
  useEffect(() => {
    if (isOpen) return

    const runBehavior = () => {
      const states: RobotState[] = ["dancing", "singing", "eating", "lying", "spinning", "winking", "heart", "waving", "idle", "blinking", "peeking", "bounce", "roll"]
      let nextState: RobotState = "idle"
      let attempts = 0
      do {
        nextState = states[Math.floor(Math.random() * states.length)]
        attempts++
      } while (historyRef.current.includes(nextState) && attempts < 10)

      setRobotState(nextState)
      historyRef.current = [...historyRef.current.slice(-2), nextState]

      // Handle movement: eating has its own move logic, lying/sleepy stay put
      if (nextState === "eating") {
        const foods = ["🍕", "🍎", "🍦", "🍗", "🍜", "🧁", "🍩", "🍣"]
        const randomFood = foods[Math.floor(Math.random() * foods.length)]
        setFoodType(randomFood)

        // Spawn food closer to current position so it's reachable
        const angle = Math.random() * Math.PI * 2
        const dist = 60 + Math.random() * 60
        const foodX = Math.max(60, Math.min(window.innerWidth - 100, positionRef.current.x + Math.cos(angle) * dist))
        const foodY = Math.max(80, Math.min(window.innerHeight - 100, positionRef.current.y + Math.sin(angle) * dist))

        setFoodPos({ x: foodX, y: foodY })
        setTimeout(() => {
          setPosition({ x: foodX - 40, y: foodY - 40 })
        }, 100)
        setTimeout(() => {
          setFoodPos(null)
        }, 10000)
      } else if (nextState !== "lying" && nextState !== "sleepy") {
        // Normal random move for other active states
        const newX = Math.max(60, Math.min(window.innerWidth - 160, Math.random() * (window.innerWidth - 220)))
        const newY = Math.max(80, Math.min(window.innerHeight - 200, Math.random() * (window.innerHeight - 280)))
        setPosition({ x: newX, y: newY })
      }

      const text = getRandomSpeech(nextState)
      setSpeechText(text)
      setShowSpeech(true)
      setTimeout(() => setShowSpeech(false), 3000)
    }

    const interval = setInterval(() => {
      if (robotState === "eating") return
      runBehavior()
    }, 5000)
    return () => clearInterval(interval)
  }, [isOpen, getRandomSpeech])

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  // Greeting message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === "ko"
        ? "안녕하세요! 👋 저는 SweetyCodes의 AI 어시스턴트예요! 스위티의 스킬, 프로젝트, 채용 정보에 대해 뭐든지 물어보세요! 😊"
        : "Hi there! 👋 I'm SweetyCodes' AI assistant! Ask me anything about Sweety's skills, projects, or why you should hire her! 😊"
      setMessages([{ role: "assistant", content: greeting }])
      setRobotState("waving")
      setTimeout(() => setRobotState("idle"), 3000)
    }
  }, [isOpen, language, messages.length])

  const handleSend = async (text?: string) => {
    const msg = text || inputValue
    if (!msg.trim()) return

    const userMessage: Message = { role: "user", content: msg }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setRobotState("thinking")
    setIsThinking(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language,
        }),
      })
      const data = await res.json()
      setIsThinking(false)
      setRobotState("replying")
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
      setTimeout(() => setRobotState("idle"), 3000)
    } catch {
      setIsThinking(false)
      setRobotState("idle")
      const errMsg = language === "ko" ? "앗, 오류가 났어요! 다시 시도해줘요 😢" : "Oops! Something went wrong. Please try again 😢"
      setMessages(prev => [...prev, { role: "assistant", content: errMsg }])
    }
  }

  const quickQuestions = language === "ko"
    ? ["스킬이 뭐예요?", "어떤 프로젝트 했어요?", "왜 채용해야 해요?", "연락 방법은?"]
    : ["What are her skills?", "Tell me about her projects!", "Why should I hire her?", "How to contact her?"]

  const currentState = affection > 80 || isHovered ? "heart" : robotState

  return (
    <>
      <AnimatePresence>
        {foodPos && (
          <motion.div
            className="pointer-events-none fixed z-[99] text-4xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
            style={{ left: foodPos.x, top: foodPos.y }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{
              scale: [0, 1.3, 1, 1, 0.8, 0],
              rotate: [-20, 10, -10, 10, 0],
              y: [0, -10, 0, -5, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 4, times: [0, 0.1, 0.3, 0.6, 0.85, 1] }}
          >
            {foodType}
            <motion.span
              className="absolute -right-2 -top-2 text-sm"
              animate={{ rotate: 360, scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >✨</motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed left-0 top-0 z-[100] cursor-pointer select-none will-change-transform"
        animate={{ x: position.x, y: position.y, opacity: isOpen ? 0 : 1, scale: isOpen ? 0.6 : 1 }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 18,
          mass: 1.0,
          restDelta: 0.01
        }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
        onMouseEnter={() => {
          setIsHovered(true)
          setRobotState("greeting")
          setSpeechText(getRandomSpeech("peeking"))
          setShowSpeech(true)
          affectionInterval.current = setInterval(() => setAffection(a => Math.min(a + 5, 100)), 500)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setRobotState("idle")
          setShowSpeech(false)
          if (affectionInterval.current) clearInterval(affectionInterval.current)
        }}
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true)
            setRobotState("greeting")
          }
        }}
      >
        <AnimatePresence>
          {(showSpeech || isHovered) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-3.5 py-1.5 text-[11px] font-bold text-slate-800 shadow-[0_10px_30px_-8px_rgba(124,58,237,0.6)] ring-1 ring-violet-200"
            >
              {isHovered ? getRandomSpeech("peeking") : speechText}
              <div className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <RobotIcon
          state={currentState}
          isTyping={inputValue.length > 0 && isOpen}
          isReplying={robotState === "replying"}
          isHovered={isHovered}
          size={84}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30, rotateX: 12 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            style={{ transformPerspective: 1200 }}
            className="glass-strong gradient-border fixed bottom-4 right-4 z-[101] flex h-[560px] max-h-[calc(100vh-2rem)] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-20px_hsl(var(--accent)/0.55)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 overflow-hidden p-4">
              <div className="absolute inset-0 bg-brand-gradient opacity-90" />
              <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
              <div className="relative flex h-14 w-14 shrink-0 items-start justify-center overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
                <div className="mt-0.5">
                  <RobotIcon
                    state={currentState}
                    isTyping={inputValue.length > 0}
                    isReplying={robotState === "replying"}
                    isHovered={isHovered}
                    size={46}
                  />
                </div>
              </div>
              <div className="relative">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-white">
                  {language === "ko" ? "스위티의 어시스턴트" : "Sweety's Assistant"}
                  <Sparkles size={13} className="text-white/80" />
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  <span className="text-[11px] text-white/80">
                    {language === "ko" ? "온라인" : "Online"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="relative ml-auto rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <BotAvatar state={robotState} isReplying={robotState === "replying"} />
                  )}
                  <div className={`max-w-[78%] rounded-2xl p-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand-gradient text-white shadow-[0_8px_24px_-10px_hsl(var(--accent)/0.8)]"
                      : "glass rounded-bl-sm text-foreground"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end justify-start gap-2">
                  <BotAvatar state="thinking" />
                  <ThinkingDots />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/20"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2 border-t border-border/60 p-3">
              <input
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                  setRobotState(e.target.value.length > 0 ? "typing" : "idle")
                }}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={language === "ko" ? "무엇이든 물어보세요..." : "Ask me anything..."}
              />
              <motion.button
                onClick={() => handleSend()}
                whileTap={{ scale: 0.9 }}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.9)]"
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
