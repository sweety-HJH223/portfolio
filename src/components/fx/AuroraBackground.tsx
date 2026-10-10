export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10%] -top-[15%] h-[55vmax] w-[55vmax] rounded-full bg-[hsl(var(--primary)/0.16)] blur-[120px] motion-safe:animate-[aurora_22s_ease-in-out_infinite]" />
      <div className="absolute -right-[15%] top-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[hsl(var(--accent)/0.16)] blur-[130px] motion-safe:animate-[aurora_28s_ease-in-out_infinite_reverse]" />
      <div className="absolute -bottom-[20%] left-[25%] h-[45vmax] w-[45vmax] rounded-full bg-[hsl(var(--pink)/0.10)] blur-[140px] motion-safe:animate-[aurora_34s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
