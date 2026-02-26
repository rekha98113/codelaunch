"use client";
import { useState, useRef } from "react";

export default function StreamCard({ stream, isSelected, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: dy * -9, y: dx * 9 });
  };
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <button
      ref={ref}
      aria-pressed={isSelected}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        "--acc": stream.color,
        "--accRgb": stream.colorRgb,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isSelected ? 1.03 : hovered ? 1.015 : 1})`,
        transition: hovered ? "transform 0.08s ease-out, box-shadow 0.3s" : "transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.4s",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "270px",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: 0,
        transformStyle: "preserve-3d",
        boxShadow: isSelected
          ? `0 0 0 1.5px ${stream.color}, 0 0 40px ${stream.color}33, 0 20px 60px rgba(0,0,20,0.5)`
          : hovered
          ? `0 0 0 1px ${stream.color}88, 0 0 24px ${stream.color}22, 0 12px 40px rgba(0,0,20,0.4)`
          : "0 0 0 1px rgba(60,100,200,0.15), 0 8px 32px rgba(0,0,20,0.3)",
      }}
    >
      {/* Glass background */}
      <span style={{
        position: "absolute", inset: 0,
        background: isSelected
          ? `rgba(10,18,50,0.88)`
          : hovered ? `rgba(12,20,55,0.85)` : "rgba(8,14,38,0.78)",
        backdropFilter: "blur(22px)",
        borderRadius: "18px",
        transition: "background 0.3s",
      }} />

      {/* Radial glow from accent color */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "18px",
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${stream.color}${isSelected ? "1a" : hovered ? "12" : "08"} 0%, transparent 70%)`,
        transition: "background 0.4s",
        pointerEvents: "none",
      }} />

      {/* Stream-specific floating chars */}
      <span style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "18px" }} aria-hidden>
        {stream.particles.map((p, i) => (
          <span key={i} style={{
            position: "absolute", left: p.x, top: p.y,
            fontSize: p.size, color: `${stream.color}28`,
            fontFamily: "monospace", userSelect: "none",
            animationName: "tp-sym-float",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}>{p.sym}</span>
        ))}
      </span>

      {/* Content */}
      <span style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", gap: "0.9rem",
        padding: "1.75rem 1.65rem",
        flex: 1,
      }}>
        {/* Icon */}
        <span style={{
          display: "inline-flex", width: 50, height: 50,
          borderRadius: "13px", alignItems: "center", justifyContent: "center",
          fontSize: "1.6rem", flexShrink: 0,
          background: `${stream.color}14`,
          border: `1px solid ${stream.color}${isSelected || hovered ? "55" : "28"}`,
          boxShadow: (isSelected || hovered) ? `0 0 16px ${stream.color}30` : "none",
          transition: "all 0.3s",
        }}>{stream.icon}</span>

        {/* Text */}
        <span style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <span style={{
            fontSize: "0.6rem", letterSpacing: "0.25em", fontWeight: 700,
            color: stream.color, opacity: 0.85,
          }}>{stream.code}</span>
          <span style={{
            fontSize: "1.05rem", fontWeight: 700, color: "#fff",
            lineHeight: 1.25,
          }}>{stream.name}</span>
          <span style={{
            fontSize: "0.78rem", color: "rgba(175,200,255,0.5)",
            lineHeight: 1.5,
          }}>{stream.tagline}</span>
        </span>

        {/* Tags */}
        <span style={{
          display: "flex", flexWrap: "wrap", gap: "0.4rem",
          marginTop: "auto",
        }}>
          {stream.tags.map((t) => (
            <span key={t} style={{
              fontSize: "0.58rem", letterSpacing: "0.1em",
              padding: "0.18rem 0.55rem", borderRadius: "20px",
              border: `1px solid ${stream.color}44`,
              color: stream.color, opacity: 0.8,
            }}>{t}</span>
          ))}
        </span>

        {/* CTA */}
        <span style={{
          fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
          color: isSelected ? stream.color : "rgba(175,200,255,0.45)",
          transition: "color 0.2s, transform 0.2s",
          transform: hovered ? "translateX(4px)" : "none",
          display: "block",
        }}>
          {isSelected ? "✦ SELECTED" : "EXPLORE →"}
        </span>
      </span>

      {/* Bottom bar */}
      {isSelected && (
        <span style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 3, background: stream.color, borderRadius: "0 0 18px 18px",
        }} />
      )}
    </button>
  );
}
