import { ImageResponse } from "next/og"

export const alt = "SweetyCodes | AI Engineer & Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const gradient = "linear-gradient(110deg, #22d3ee 0%, #818cf8 45%, #ec4899 100%)"
const tags = ["Multi-Agent Systems", "LLM Apps", "AI Evaluation", "Next.js", "FastAPI"]

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07070d",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(139,92,246,0.45), transparent 45%), radial-gradient(circle at 10% 90%, rgba(34,211,238,0.30), transparent 45%)",
          color: "#f4f4f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700 }}>
            <span style={{ color: "#22d3ee" }}>{"<"}</span>
            <span style={{ backgroundImage: gradient, backgroundClip: "text", color: "transparent" }}>SweetyCodes</span>
            <span style={{ color: "#22d3ee" }}>{" />"}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 24px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.4)",
              background: "rgba(52,211,153,0.1)",
              fontSize: 26,
              color: "#34d399",
            }}
          >
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#34d399" }} />
            Open to work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#a1a1b5", marginBottom: 12 }}>Subhashree Behera</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ marginRight: 22 }}>AI Engineer &</span>
            <span style={{ backgroundImage: gradient, backgroundClip: "text", color: "transparent" }}>Full-Stack Developer</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 24,
                color: "#d4d4e0",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
