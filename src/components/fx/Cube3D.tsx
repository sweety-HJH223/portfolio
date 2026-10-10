const faces = [
  { label: "AI", icon: "🤖", transform: "rotateY(0deg) translateZ(var(--half))" },
  { label: "LLMs", icon: "🧠", transform: "rotateY(90deg) translateZ(var(--half))" },
  { label: "AI Agents", icon: "🛠️", transform: "rotateY(180deg) translateZ(var(--half))" },
  { label: "RAG", icon: "📚", transform: "rotateY(-90deg) translateZ(var(--half))" },
  { label: "Model Evals", icon: "📊", transform: "rotateX(90deg) translateZ(var(--half))" },
  { label: "ML · Python", icon: "🐍", transform: "rotateX(-90deg) translateZ(var(--half))" },
]

export function Cube3D({ size = 180 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto [perspective:900px]"
      style={{ width: size, height: size, ["--half" as string]: `${size / 2}px` }}
    >
      <div className="absolute left-1/2 top-[115%] h-6 w-[80%] -translate-x-1/2 rounded-full bg-[hsl(var(--accent)/0.45)] blur-xl" />
      <div className="relative h-full w-full preserve-3d motion-safe:animate-[cube-spin_14s_linear_infinite]" style={{ transform: "rotateX(-24deg) rotateY(30deg)" }}>
        {faces.map((face) => (
          <div
            key={face.label}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/20 bg-gradient-to-br from-[hsl(var(--primary)/0.35)] via-[hsl(var(--accent)/0.3)] to-[hsl(var(--pink)/0.3)] shadow-[inset_0_0_40px_rgba(255,255,255,0.12)] [backface-visibility:hidden]"
            style={{ transform: face.transform }}
          >
            <span className="text-5xl drop-shadow-lg">{face.icon}</span>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-white drop-shadow">{face.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
