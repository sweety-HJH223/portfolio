const rowA = [
  ["💎", "Gemini API"], ["🧠", "OpenAI API"], ["🤖", "Multi-Agent Systems"], ["🛠️", "Function Calling"], ["🧾", "Structured Output"],
  ["🧪", "AI Evaluation"], ["✅", "Pydantic"], ["📚", "RAG"], ["🦜", "LangChain"], ["🔌", "MCP"], ["🐳", "Docker"],
]
const rowB = [
  ["▲", "Next.js"], ["⚛️", "React"], ["📜", "TypeScript"], ["🐍", "Python"], ["⚡", "FastAPI"],
  ["🔥", "Firebase"], ["🎨", "Tailwind CSS"], ["🖥️", "Node.js"], ["🚀", "Vercel"], ["🚂", "Railway"],
]

function Row({ items, reverse = false }: { items: string[][]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="flex w-max gap-4 motion-safe:animate-[marquee_40s_linear_infinite]" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {loop.map(([icon, label], i) => (
        <span
          key={`${label}-${i}`}
          className="glass inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-5 py-3 font-display text-sm font-semibold text-foreground"
        >
          <span className="text-lg">{icon}</span>
          {label}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <div aria-hidden className="relative overflow-x-clip py-10 [perspective:1200px]">
      <div className="mask-fade-x flex flex-col gap-4 overflow-hidden [transform:rotateX(18deg)_rotateZ(-2deg)]">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </div>
  )
}
