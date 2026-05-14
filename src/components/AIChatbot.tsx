"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

// ─── Types ────────────────────────────────────────────────────────────────────
type RobotState =
  | "idle" | "typing" | "thinking" | "replying" | "greeting"
  | "sleepy" | "lying" | "winking" | "heart" | "waving"
  | "peeking" | "dancing" | "singing" | "eating" | "spinning" | "blinking"
  | "bounce" | "roll"

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
    heart:    ["Love you! ❤️", "Aww! 🥰", "So cute! 💕", "BFFs! 💖"],
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
    heart:    ["사랑해! ❤️", "귀여워! 🥰", "너무 귀엽다! 💕", "베프! 💖"],
    waving:   ["안녕하세요! 👋", "하이하이! 🙋", "이봐요! 👋", "여기요! 🤚"],
    peeking:  ["까꿍! 👀", "찾았다! 🫣", "보여요! 😄", "부! 👻"],
    bounce:   ["폴짝! 🏀", "더 높이! 🚀", "통통! ✨", "점프! 💨"],
    roll:     ["구르기! 🌀", "데굴데굴! 🤸", "계속 굴러! 🔄", "슝슝! ⚡"],
  }
}

// ─── Robot SVG Component ──────────────────────────────────────────────────────
function RobotIcon({
  state,
  size = 90,
  isTyping = false,
  isReplying = false,
  isHovered = false,
}: {
  state: RobotState
  size?: number
  isTyping?: boolean
  isReplying?: boolean
  isHovered?: boolean
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: Math.max(-3, Math.min(3, (e.clientX / window.innerWidth - 0.5) * 6)),
        y: Math.max(-2, Math.min(2, (e.clientY / window.innerHeight - 0.5) * 4)),
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Random blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, Math.random() * 3000 + 2000)
    return () => clearInterval(blinkInterval)
  }, [])

  const getBodyMotion = () => {
    switch (state) {
      case "dancing":  return { 
        rotate: [0, -15, 15, -15, 15, 0], 
        y: [0, -12, 0, -12, 0], 
        x: [0, 8, -8, 8, -8, 0],
        scale: [1, 1.1, 0.9, 1.1, 1] 
      }
      case "singing":  return { 
        y: [0, -8, 0, -8, 0], 
        rotate: [0, -8, 8, -8, 0],
        scale: [1, 1.05, 1]
      }
      case "eating":   return { y: [0, -4, 0, -4, 0], scale: [1, 1.08, 1, 1.08, 1] }
      case "spinning": return { rotate: [0, 360] }
      case "lying":    return { 
        rotate: 90, 
        y: 45, 
        x: 15,
        scale: [1, 1.03, 1] // Breathing effect
      }
      case "sleepy":   return { 
        rotate: [0, 3, -3, 3, 0], 
        y: [0, 4, 0, 4, 0],
        scale: [1, 0.98, 1]
      }
      case "waving":   return { rotate: [0, -6, 6, -6, 0], y: [0, -2, 0] }
      case "bounce":   return { 
        y: [0, -40, 0, -25, 0], 
        scaleY: [1, 0.6, 1.4, 0.8, 1], 
        scaleX: [1, 1.3, 0.7, 1.1, 1] 
      }
      case "roll":     return { 
        rotate: [0, 360, 720], 
        x: [0, 20, -20, 0] 
      }
      case "idle":     return { y: [0, -5, 0, -5, 0], rotate: [0, 1, -1, 1, 0] }
      default:         return { y: [0, -3, 0] }
    }
  }

  const eyeRadius = isTyping ? 9 : isHovered ? 8 : blink ? 0.5 : 5
  const isHeart = state === "heart" || (isHovered && !isTyping)
  const isSpinEye = isReplying

  // Cheek color based on state
  const cheekOpacity = isHovered || state === "heart" || state === "waving" ? 0.6 : 0.3

  return (
    <motion.div
      animate={getBodyMotion()}
      transition={{ repeat: Infinity, duration: state === "spinning" ? 0.8 : 1.8, ease: "easeInOut" }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <radialGradient id="headGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#c026d3" />
          </radialGradient>
          <radialGradient id="eyeGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="antGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Antenna */}
        <line x1="50" y1="8" x2="50" y2="18" stroke="url(#antGrad)" strokeWidth="3" strokeLinecap="round" />
        <motion.circle
          cx="50" cy="6" r="5"
          fill="#f0abfc"
          filter="url(#glow)"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* Head */}
        <rect x="18" y="16" width="64" height="52" rx="20" fill="url(#headGrad)" />
        <rect x="20" y="18" width="60" height="48" rx="18" fill="#fdf4ff" fillOpacity="0.15" />

        {/* Ear bolts */}
        <circle cx="18" cy="38" r="5" fill="#c026d3" stroke="#a21caf" strokeWidth="1.5" />
        <circle cx="82" cy="38" r="5" fill="#c026d3" stroke="#a21caf" strokeWidth="1.5" />

        {/* Blush cheeks */}
        <ellipse cx="28" cy="52" rx="8" ry="5" fill="#fb7185" fillOpacity={cheekOpacity} />
        <ellipse cx="72" cy="52" rx="8" ry="5" fill="#fb7185" fillOpacity={cheekOpacity} />

        {/* Eyes */}
        {isHeart ? (
          <>
            {/* Heart eyes */}
            <motion.path
              d="M33 33 C30 29, 24 31, 27 37 C29 40, 33 43, 33 43 C33 43, 37 40, 39 37 C42 31, 36 29, 33 33 Z"
              fill="#f43f5e"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <motion.path
              d="M67 33 C64 29, 58 31, 61 37 C63 40, 67 43, 67 43 C67 43, 71 40, 73 37 C76 31, 70 29, 67 33 Z"
              fill="#f43f5e"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }}
            />
          </>
        ) : isSpinEye ? (
          <>
            {/* Spinning spiral eyes while replying */}
            <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} style={{ transformOrigin: "33px 37px" }}>
              <circle cx="33" cy="37" r="9" fill="url(#eyeGrad)" stroke="#c026d3" strokeWidth="1.5" />
              <path d="M33 37 m0 -5 a5 5 0 0 1 0 10 a3 3 0 0 0 0 -6 a1 1 0 0 1 0 2" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
            </motion.g>
            <motion.g animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} style={{ transformOrigin: "67px 37px" }}>
              <circle cx="67" cy="37" r="9" fill="url(#eyeGrad)" stroke="#c026d3" strokeWidth="1.5" />
              <path d="M67 37 m0 -5 a5 5 0 0 1 0 10 a3 3 0 0 0 0 -6 a1 1 0 0 1 0 2" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
            </motion.g>
          </>
        ) : state === "winking" ? (
          <>
            {/* Wink - one eye closed */}
            <ellipse cx="33" cy="37" rx={eyeRadius} ry={blink ? 0.5 : eyeRadius * 1.1} fill="url(#eyeGrad)" stroke="#c026d3" strokeWidth="1.5" />
            <circle cx={33 + mousePos.x} cy={37 + mousePos.y} r="3" fill="#1e1b4b" />
            <circle cx={33 + mousePos.x + 1} cy={37 + mousePos.y - 1} r="1" fill="white" />
            {/* Closed eye */}
            <path d="M58 37 Q67 32 76 37" stroke="#c026d3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : state === "lying" || state === "sleepy" ? (
          <>
            {/* Sleepy eyes - half closed */}
            <ellipse cx="33" cy="37" rx="9" ry="4" fill="url(#eyeGrad)" stroke="#c026d3" strokeWidth="1.5" />
            <ellipse cx="67" cy="37" rx="9" ry="4" fill="url(#eyeGrad)" stroke="#c026d3" strokeWidth="1.5" />
            <path d="M24 33 Q33 30 42 33" stroke="#c026d3" strokeWidth="2" fill="none" />
            <path d="M58 33 Q67 30 76 33" stroke="#c026d3" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            {/* Normal eyes */}
            <motion.ellipse
              cx="33" cy="37"
              rx={eyeRadius} ry={blink ? 0.5 : eyeRadius * 1.1}
              fill="url(#eyeGrad)"
              stroke="#c026d3" strokeWidth="1.5"
              animate={isTyping ? { scaleY: [1, 0.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />
            <motion.ellipse
              cx="67" cy="37"
              rx={eyeRadius} ry={blink ? 0.5 : eyeRadius * 1.1}
              fill="url(#eyeGrad)"
              stroke="#c026d3" strokeWidth="1.5"
              animate={isTyping ? { scaleY: [1, 0.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.4, delay: 0.05 }}
            />
            {/* Pupils that follow cursor */}
            <circle cx={33 + mousePos.x} cy={37 + mousePos.y} r={isTyping ? 5 : 3} fill="#1e1b4b" />
            <circle cx={33 + mousePos.x + 1} cy={37 + mousePos.y - 1} r={isTyping ? 2 : 1} fill="white" />
            <circle cx={67 + mousePos.x} cy={37 + mousePos.y} r={isTyping ? 5 : 3} fill="#1e1b4b" />
            <circle cx={67 + mousePos.x + 1} cy={37 + mousePos.y - 1} r={isTyping ? 2 : 1} fill="white" />
          </>
        )}

        {/* Mouth */}
        {state === "lying" || state === "sleepy" ? (
          <path d="M40 55 Q50 53 60 55" stroke="#c026d3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : isTyping ? (
          <motion.ellipse cx="50" cy="56" rx="10" ry="6" fill="#f43f5e"
            animate={{ ry: [6, 8, 6] }} transition={{ repeat: Infinity, duration: 0.3 }}
          />
        ) : state === "eating" ? (
          <motion.ellipse cx="50" cy="56" rx="12" ry="8" fill="#f43f5e"
            animate={{ ry: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.4 }}
          />
        ) : state === "singing" ? (
          <motion.ellipse cx="50" cy="56" rx="8" ry="10" fill="#f43f5e"
            animate={{ ry: [10, 4, 10], rx: [8, 12, 8] }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        ) : (
          <motion.path
            d={isHovered || state === "heart" || state === "dancing" || state === "waving"
              ? "M36 54 Q50 66 64 54"
              : "M38 56 Q50 63 62 56"}
            stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round"
          />
        )}

        {/* Body */}
        <rect x="26" y="70" width="48" height="36" rx="14" fill="url(#bodyGrad)" />
        <rect x="28" y="72" width="44" height="32" rx="12" fill="white" fillOpacity="0.1" />

        {/* Body detail - screen */}
        <rect x="36" y="77" width="28" height="18" rx="6" fill="#1e1b4b" fillOpacity="0.6" />
        <motion.text
          x="50" y="89"
          textAnchor="middle"
          fontSize="8"
          fill="#a78bfa"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {isTyping ? "..." : isReplying ? "💭" : "♡"}
        </motion.text>

        {/* Left Arm */}
        <motion.g
          animate={state === "waving" || state === "greeting"
            ? { rotate: [0, -40, 0, -40, 0] }
            : state === "dancing"
            ? { rotate: [0, 20, -20, 20, 0] }
            : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ transformOrigin: "22px 76px" }}
        >
          <rect x="10" y="72" width="16" height="10" rx="5" fill="#a78bfa" />
          {/* Hand */}
          <circle cx="12" cy="86" r="6" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="8" cy="83" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="8" cy="89" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="16" cy="91" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
        </motion.g>

        {/* Right Arm */}
        <motion.g
          animate={state === "dancing"
            ? { rotate: [0, -20, 20, -20, 0] }
            : state === "eating"
            ? { rotate: [0, -30, 0, -30, 0] }
            : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ transformOrigin: "78px 76px" }}
        >
          <rect x="74" y="72" width="16" height="10" rx="5" fill="#a78bfa" />
          {/* Hand */}
          <circle cx="88" cy="86" r="6" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="92" cy="83" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="92" cy="89" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="84" cy="91" r="3.5" fill="#c4b5fd" stroke="#a78bfa" strokeWidth="1" />
        </motion.g>

        {/* Legs */}
        <rect x="30" y="104" width="14" height="16" rx="6" fill="#7c3aed" />
        <rect x="56" y="104" width="14" height="16" rx="6" fill="#7c3aed" />

        {/* Feet / Shoes */}
        <ellipse cx="37" cy="121" rx="10" ry="6" fill="#4c1d95" />
        <ellipse cx="63" cy="121" rx="10" ry="6" fill="#4c1d95" />
        <ellipse cx="33" cy="120" rx="4" ry="3" fill="#6d28d9" fillOpacity="0.5" />
        <ellipse cx="59" cy="120" rx="4" ry="3" fill="#6d28d9" fillOpacity="0.5" />

        {/* State decorations */}
        {state === "eating" && (
          <motion.text x="62" y="70" fontSize="14"
            animate={{ y: [70, 60, 70] }} transition={{ repeat: Infinity, duration: 0.5 }}>
            🍕
          </motion.text>
        )}
        {state === "singing" && (
          <>
            <motion.text x="70" y="30" fontSize="12"
              animate={{ y: [30, 15, 30], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}>🎵</motion.text>
            <motion.text x="15" y="35" fontSize="10"
              animate={{ y: [35, 20, 35], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}>🎶</motion.text>
            <motion.g
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ transformOrigin: "82px 78px" }}
            >
              <rect x="80" y="75" width="4" height="14" rx="2" fill="#94a3b8" />
              <ellipse cx="82" cy="73" rx="5" ry="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <ellipse cx="80" cy="71" rx="1.5" ry="2" fill="#94a3b8" fillOpacity="0.5" />
              <motion.path d="M90 68 Q95 73 90 78" stroke="#818cf8" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
              <motion.path d="M93 65 Q100 73 93 81" stroke="#818cf8" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
            </motion.g>
          </>
        )}
              
        {(state === "lying" || state === "sleepy") && (
          <>
            <motion.text x="68" y="20" fontSize="14"
              animate={{ y: [20, 10, 20], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}>💤</motion.text>
            <motion.text x="55" y="15" fontSize="10"
              animate={{ y: [15, 5, 15], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>z</motion.text>
          </>
        )}
        {(state === "spinning" || state === "roll") && (
          <motion.text x="68" y="20" fontSize="14"
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5 }}>🌀</motion.text>
        )}
        {state === "bounce" && (
          <motion.text x="68" y="20" fontSize="14"
            animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.4 }}>✨</motion.text>
        )}
        {(state === "waving" || state === "greeting") && (
          <motion.text x="68" y="20" fontSize="14"
            animate={{ rotate: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 0.4 }}>👋</motion.text>
        )}
      </svg>
    </motion.div>
  )
}

// ─── Thinking Dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 p-3 rounded-2xl bg-purple-100 dark:bg-slate-700 w-fit">
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
        />
      ))}
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
            className="fixed z-[99] text-4xl pointer-events-none"
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
              className="absolute -top-2 -right-2 text-sm"
              animate={{ rotate: 360, scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >✨</motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed z-[100] cursor-pointer select-none left-0 top-0 will-change-transform"
        animate={{ x: position.x, y: position.y }}
        transition={{ 
          type: "spring",
          stiffness: 20,
          damping: 18,
          mass: 1.0,
          restDelta: 0.01
        }}
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
              className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[11px] font-bold rounded-full shadow-lg"
            >
              {isHovered ? getRandomSpeech("peeking") : speechText}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-pink-500" />
            </motion.div>
          )}
        </AnimatePresence>

        

        <RobotIcon
          state={currentState}
          isTyping={inputValue.length > 0 && isOpen}
          isReplying={robotState === "replying"}
          isHovered={isHovered}
          size={90}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed z-[101] bottom-6 right-6 w-[340px] h-[540px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-purple-200 dark:border-purple-900 bg-white dark:bg-[#0f0a1e]"
          >
            <div className="p-4 flex items-center gap-3 bg-gradient-to-r from-purple-700 to-pink-600">
              <div className="w-11 h-11 rounded-full bg-purple-900 border-2 border-purple-300 flex items-center justify-center overflow-hidden shrink-0">
                <RobotIcon
                  state={currentState}
                  isTyping={inputValue.length > 0}
                  isReplying={robotState === "replying"}
                  isHovered={isHovered}
                  size={42}
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {language === "ko" ? "스위티의 어시스턴트" : "Sweety's Assistant"}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-purple-200 text-[10px]">
                    {language === "ko" ? "온라인" : "Online"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-purple-200 hover:text-white transition-colors rounded-full p-1 hover:bg-purple-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f7ff] dark:bg-[#0f0a1e]">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-purple-900 border border-purple-400 flex items-center justify-center mr-2 mt-1 shrink-0 overflow-hidden">
                      <RobotIcon state={robotState} isTyping={false} isReplying={robotState === "replying"} size={32} />
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-br-sm shadow-md"
                      : "bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 rounded-bl-sm border border-purple-50 dark:border-transparent shadow-sm"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-900 border border-purple-400 flex items-center justify-center mr-2 mt-1 shrink-0 overflow-hidden">
                    <RobotIcon state="thinking" isTyping={false} isReplying={false} size={32} />
                  </div>
                  <ThinkingDots />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-gray-50 dark:bg-[#0f0a1e]">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors border border-purple-200 dark:border-purple-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-purple-100 dark:border-purple-900/50 bg-white dark:bg-[#0f0a1e] flex gap-2">
              <input
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                  setRobotState(e.target.value.length > 0 ? "typing" : "idle")
                }}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                className="flex-1 bg-purple-50 dark:bg-slate-800 rounded-full px-4 py-2 text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 dark:placeholder-slate-500"
                placeholder={language === "ko" ? "무엇이든 물어보세요..." : "Ask me anything..."}
              />
              <motion.button
                onClick={() => handleSend()}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/40 transition-shadow"
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
