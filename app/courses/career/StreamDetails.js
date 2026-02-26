"use client";
import { useEffect, useRef, useState } from "react";

function DetailBlock({ title, icon, children, delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(60,100,200,0.12)",
      borderRadius: "14px",
      padding: "1.35rem 1.4rem",
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        marginBottom: "1rem", paddingBottom: "0.75rem",
        borderBottom: "1px solid rgba(60,100,200,0.1)",
      }}>
        <span style={{ fontSize: "1rem" }}>{icon}</span>
        <span style={{
          fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.07em",
          color: "rgba(215,235,255,0.8)",
        }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function StreamDetails({ stream, onClose }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 16);
    return () => clearTimeout(t);
  }, []);

  const doClose = () => {
    setOpen(false);
    setTimeout(onClose, 400);
  };

  if (!stream) return null;

  return (
    <div
      style={{
        maxWidth: 1300, margin: "0 auto",
        padding: "0 2rem 5rem",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        position: "relative", zIndex: 1,
      }}
      id="stream-details"
    >
      <div
        ref={panelRef}
        style={{
          background: "rgba(7,13,36,0.72)",
          backdropFilter: "blur(28px)",
          border: `1px solid ${stream.color}28`,
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: `0 0 60px ${stream.color}10, 0 24px 80px rgba(0,0,20,0.5)`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: "2.5rem 2.5rem 2rem",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: "1.5rem",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
            <div style={{
              fontSize: "2.8rem", lineHeight: 1,
              padding: "0.75rem",
              borderRadius: "16px",
              background: `${stream.color}12`,
              border: `1px solid ${stream.color}28`,
              flexShrink: 0,
            }}>{stream.icon}</div>
            <div>
              <div style={{
                fontSize: "0.6rem", letterSpacing: "0.25em",
                fontWeight: 700, color: stream.color, marginBottom: "0.3rem",
              }}>{stream.code}</div>
              <h2 style={{
                fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)",
                fontWeight: 900, color: "#fff",
                lineHeight: 1.12, marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}>{stream.name}</h2>
              <p style={{
                fontSize: "0.88rem", color: "rgba(175,205,255,0.55)",
                lineHeight: 1.65, maxWidth: 520,
              }}>{stream.description}</p>
            </div>
          </div>
          <button
            onClick={doClose}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(175,200,255,0.55)",
              cursor: "pointer", fontSize: "0.85rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.15)"; e.currentTarget.style.color = "#ff8888"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(175,200,255,0.55)"; }}
          >✕</button>
        </div>

        {/* Accent line */}
        <div style={{
          height: 2, margin: "0 2.5rem",
          background: `linear-gradient(90deg, ${stream.color}, ${stream.color}00)`,
        }} />

        {/* Detail grid */}
        <div style={{
          padding: "2rem 2.5rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.4rem",
        }}>

          {/* What You Learn */}
          <DetailBlock title="What You Will Learn" icon="📚" delay={80}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {stream.learn.map((item, i) => (
                <li key={i} style={{
                  display: "flex", gap: "0.6rem", alignItems: "baseline",
                  fontSize: "0.83rem", color: "rgba(190,215,255,0.75)",
                  lineHeight: 1.5,
                }}>
                  <span style={{ color: stream.color, fontSize: "0.45rem", flexShrink: 0, marginTop: "0.35rem" }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </DetailBlock>

          {/* Future Tech */}
          <DetailBlock title="Future Technologies" icon="🚀" delay={170}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {stream.futureTech.map((tech, i) => (
                <span key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.28rem 0.7rem", borderRadius: "20px",
                  border: `1px solid ${stream.color}38`,
                  background: `${stream.color}0a`,
                  fontSize: "0.75rem", color: "rgba(190,215,255,0.75)",
                }}>
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </DetailBlock>

          {/* Market Demand */}
          <DetailBlock title="Market Demand & Exposure" icon="📈" delay={250}>
            <p style={{
              fontSize: "0.83rem", color: "rgba(190,215,255,0.68)",
              lineHeight: 1.7, marginBottom: "1rem",
            }}>{stream.demand.summary}</p>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              {stream.demand.stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: 80,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(60,100,200,0.1)",
                  borderRadius: "10px", padding: "0.75rem 0.85rem",
                }}>
                  <div style={{
                    fontSize: "1.15rem", fontWeight: 800,
                    color: stream.color, lineHeight: 1, marginBottom: "0.2rem",
                  }}>{s.val}</div>
                  <div style={{
                    fontSize: "0.58rem", color: "rgba(175,200,255,0.45)",
                    letterSpacing: "0.1em",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* Skills Match */}
          <DetailBlock title="Ideal Skills & Interests" icon="🎯" delay={330}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {stream.skills.map((sk, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  fontSize: "0.83rem", color: "rgba(190,215,255,0.75)",
                }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{sk.icon}</span>
                  <span>{sk.text}</span>
                </div>
              ))}
            </div>
          </DetailBlock>

          {/* Salary */}
          <DetailBlock title="Salary Potential" icon="💼" delay={410}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {stream.salary.tiers.map((tier, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "58px 1fr 78px",
                  alignItems: "center", gap: "0.7rem",
                }}>
                  <span style={{
                    fontSize: "0.65rem", color: "rgba(175,200,255,0.45)",
                    letterSpacing: "0.06em",
                  }}>{tier.level}</span>
                  <div style={{
                    height: 5, background: "rgba(255,255,255,0.06)",
                    borderRadius: 4, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${tier.pct}%`,
                      background: `linear-gradient(90deg, ${stream.color}88, ${stream.color})`,
                      borderRadius: 4,
                      animation: `tp-bar-grow 1s ease ${i * 0.12 + 0.5}s both`,
                    }} />
                  </div>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    color: stream.color, textAlign: "right",
                  }}>{tier.range}</span>
                </div>
              ))}
              <p style={{
                fontSize: "0.72rem", color: "rgba(175,200,255,0.38)",
                lineHeight: 1.6, marginTop: "0.25rem",
                borderTop: "1px solid rgba(60,100,200,0.1)",
                paddingTop: "0.75rem",
              }}>{stream.salary.note}</p>
            </div>
          </DetailBlock>

        </div>
      </div>
    </div>
  );
}
