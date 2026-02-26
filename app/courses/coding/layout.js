"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CHAPTERS = [
  { id: "intro",      label: "What is Coding?", tag: "FOUNDATION", num: "01" },
  { id: "logic",      label: "Logic Building",  tag: "CORE",       num: "02" },
  { id: "algorithms", label: "Algorithms",       tag: "CORE",       num: "03" },
  { id: "language",   label: "Choose Language",  tag: "ADVANCED",   num: "04" },
];

const SYMS = ["∑","π","√","∫","01","10","λ","∞","∂","Δ","≡","∀","⊕","φ","ε","μ","∇","τ"];

function Particles() {
  return (
    <div style={{ position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {Array.from({ length: 26 }, (_, i) => (
        <span key={i} style={{
          position:"absolute", bottom:"-2rem",
          left:`${(i*37+5)%100}%`,
          fontSize:`${0.85+(i%4)*0.18}rem`,
          color:"rgba(80,160,255,0.055)",
          fontFamily:"inherit", userSelect:"none",
          animation:`cb-float ${13+(i*1.1)%9}s ${(i*0.65)%11}s infinite linear`,
        }}>{SYMS[i % SYMS.length]}</span>
      ))}
    </div>
  );
}

export default function CodingLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const idx      = CHAPTERS.findIndex(c => pathname?.includes(`/courses/coding/${c.id}`));
  const progress = idx < 0 ? 0 : Math.round(((idx + 1) / CHAPTERS.length) * 100);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { height:100%; overflow:hidden; }
        body {
          font-family:inherit;
          color:rgba(210,230,255,0.92);
          background:
            radial-gradient(ellipse at 20% 50%,rgba(26,60,120,0.15) 0%,transparent 60%),
            radial-gradient(ellipse at 80% 20%,rgba(80,40,160,0.10) 0%,transparent 50%),
            linear-gradient(160deg,#010410 0%,#020c20 50%,#030e28 100%);
        }
        body::before {
          content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(30,80,200,0.03) 1px,transparent 1px),
            linear-gradient(90deg,rgba(30,80,200,0.03) 1px,transparent 1px);
          background-size:52px 52px;
        }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(80,140,255,0.25); border-radius:4px; }

        @keyframes cb-float {
          0%  {transform:translateY(0) rotate(0deg);opacity:0}
          5%  {opacity:1} 95% {opacity:1}
          100%{transform:translateY(-110vh) rotate(15deg);opacity:0}
        }
        @keyframes cb-shimmer {
          0%  {background-position:200% 0}
          100%{background-position:-200% 0}
        }
        @keyframes cb-fadeup {
          from{opacity:0;transform:translateY(14px)}
          to  {opacity:1;transform:translateY(0)}
        }
        @keyframes cb-fadein {
          from{opacity:0;transform:translateX(-10px)}
          to  {opacity:1;transform:translateX(0)}
        }
        @keyframes cb-glow {
          0%,100%{box-shadow:0 20px 80px rgba(0,0,40,0.8),0 0 28px rgba(80,140,255,0.10)}
          50%    {box-shadow:0 20px 80px rgba(0,0,40,0.8),0 0 56px rgba(80,140,255,0.28)}
        }
        @keyframes cb-badgeglow {
          0%,100%{box-shadow:0 0 0 0 rgba(74,158,255,0)}
          50%    {box-shadow:0 0 14px 2px rgba(74,158,255,0.25)}
        }

        /* layout hovers */
        .cb-tog:hover   { background:rgba(60,120,255,0.26)!important; }
        .cb-back:hover  { color:#4a9eff!important; }
        .cb-ch          { transition:all 0.22s; border-left:2px solid transparent; }
        .cb-ch:hover    { background:rgba(60,120,255,0.09)!important; border-left-color:rgba(74,158,255,0.45)!important; transform:translateX(2px); }
        .cb-ch.cb-on    { background:rgba(26,95,255,0.13)!important;  border-left-color:#4a9eff!important; }

        /* inner panel hovers (used by page.jsx) */
        .cb-opt:hover:not(:disabled) { background:rgba(40,80,200,0.2)!important; border-color:rgba(100,160,255,0.45)!important; transform:translateX(4px); }
        .cb-card:hover  { border-color:rgba(60,120,255,0.3)!important; box-shadow:0 10px 36px rgba(0,0,40,0.5)!important; transform:translateY(-2px) perspective(800px) rotateX(0.5deg); }
        .cb-pc:hover    { background:rgba(60,120,255,0.22)!important; color:#4a9eff!important; }
        .cb-nxt:hover   { box-shadow:0 6px 32px rgba(80,100,255,0.65)!important; transform:translateY(-2px)!important; }
        .cb-sub:hover   { box-shadow:0 4px 28px rgba(60,80,255,0.5)!important;  transform:translateY(-1px)!important; }
        .cb-rst:hover   { box-shadow:0 0 44px rgba(100,100,255,0.7)!important;  transform:translateY(-2px)!important; }
      `}</style>

      <Particles />

      {/* root shell */}
      <div style={{
        height:"100vh", overflow:"hidden",
        display:"flex", flexDirection:"column",
        position:"relative", zIndex:1,
        fontFamily:"inherit", fontSize:"16px",
        color:"rgba(210,230,255,0.92)",
      }}>

        {/* ── TOPBAR ── */}
        <header style={{
          flexShrink:0, height:56, zIndex:200,
          display:"flex", alignItems:"center",
          justifyContent:"space-between", gap:"1rem",
          padding:"0 1.4rem",
          background:"rgba(2,8,22,0.96)",
          backdropFilter:"blur(24px)",
          borderBottom:"1px solid rgba(60,120,255,0.2)",
          boxShadow:"0 2px 30px rgba(0,0,0,0.6)",
          fontFamily:"inherit",
        }}>
          {/* left */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <button className="cb-tog" onClick={() => setOpen(v => !v)} style={{
              width:36, height:36, borderRadius:8, flexShrink:0,
              background:"rgba(60,120,255,0.12)",
              border:"1px solid rgba(60,120,255,0.2)",
              color:"#4a9eff", cursor:"pointer", fontSize:"1rem",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s", fontFamily:"inherit",
            }}>{open ? "✕" : "☰"}</button>

            <span style={{
              fontFamily:"inherit", fontSize:"1rem", fontWeight:800,
              color:"#4a9eff", letterSpacing:"0.18em", whiteSpace:"nowrap",
              textShadow:"0 0 20px rgba(74,158,255,0.5)",
            }}>⬡ LOGIC<span style={{ color:"#00e5ff" }}>FORGE</span></span>

            <span style={{
              fontFamily:"inherit", fontSize:"0.72rem",
              color:"rgba(140,180,255,0.5)", letterSpacing:"0.13em",
              padding:"0.28rem 0.7rem",
              border:"1px solid rgba(60,120,255,0.18)", borderRadius:4,
              whiteSpace:"nowrap",
            }}>CODING FOUNDATIONS</span>
          </div>

          {/* right */}
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", minWidth:230 }}>
              <span style={{
                fontFamily:"inherit", fontSize:"0.68rem",
                color:"rgba(140,180,255,0.5)", letterSpacing:"0.1em", whiteSpace:"nowrap",
              }}>COURSE PROGRESS</span>
              <div style={{ flex:1, height:3, background:"rgba(255,255,255,0.07)", borderRadius:4, overflow:"hidden" }}>
                <div style={{
                  height:"100%", width:`${progress}%`,
                  background:"linear-gradient(90deg,#1a5fff,#7b5fff,#00e5ff)",
                  backgroundSize:"200% 100%", borderRadius:4,
                  transition:"width 0.7s cubic-bezier(.4,0,.2,1)",
                  boxShadow:"0 0 8px rgba(100,150,255,0.7)",
                  animation:"cb-shimmer 2.5s infinite linear",
                }} />
              </div>
              <span style={{
                fontFamily:"inherit", fontSize:"0.75rem",
                color:"#4a9eff", fontWeight:700, whiteSpace:"nowrap",
              }}>{progress}%</span>
            </div>

            <Link href="/courses" className="cb-back" style={{
              fontFamily:"inherit", fontSize:"0.75rem",
              color:"rgba(140,180,255,0.55)", textDecoration:"none",
              whiteSpace:"nowrap", transition:"color 0.2s",
            }}>← Courses</Link>
          </div>
        </header>

        {/* ── BODY ── */}
        <div style={{ flex:1, display:"flex", overflow:"hidden", position:"relative", zIndex:10 }}>

          {/* SIDEBAR */}
          <aside style={{
            flexShrink:0, overflow:"hidden",
            background:"rgba(5,12,35,0.92)",
            borderRight:"1px solid rgba(60,120,255,0.18)",
            transition:"width 0.35s cubic-bezier(.4,0,.2,1), opacity 0.3s",
            width: open ? 272 : 0,
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            fontFamily:"inherit",
          }}>
            <div style={{ width:272, height:"100%", display:"flex", flexDirection:"column" }}>

              {/* head */}
              <div style={{
                padding:"1.3rem 1.3rem 1rem",
                borderBottom:"1px solid rgba(60,120,255,0.09)", flexShrink:0,
              }}>
                <div style={{ fontFamily:"inherit", fontSize:"0.63rem", color:"rgba(140,180,255,0.42)", letterSpacing:"0.22em", marginBottom:"0.4rem" }}>COURSE MAP</div>
                <div style={{ fontFamily:"inherit", fontSize:"0.96rem", color:"#4a9eff", fontWeight:700, letterSpacing:"0.04em", marginBottom:"0.25rem" }}>Foundations of Coding</div>
                <div style={{ fontFamily:"inherit", fontSize:"0.7rem", color:"rgba(140,180,255,0.38)", letterSpacing:"0.05em" }}>{CHAPTERS.length} chapters · self-paced</div>
              </div>

              {/* chapter links */}
              <nav style={{ flex:1, overflowY:"auto", padding:"0.65rem 0" }}>
                {CHAPTERS.map((ch, i) => {
                  const isOn  = pathname?.includes(`/courses/coding/${ch.id}`);
                  const isDone = idx > i;
                  return (
                    <Link key={ch.id} href={`/courses/coding/${ch.id}`}
                      className={`cb-ch${isOn ? " cb-on" : ""}`}
                      style={{
                        display:"flex", alignItems:"center", gap:"0.85rem",
                        padding:"0.88rem 1.3rem",
                        textDecoration:"none", color:"inherit", fontFamily:"inherit",
                        animation:`cb-fadein 0.35s ease ${i*0.07}s both`,
                      }}
                    >
                      <div style={{
                        width:27, height:27, borderRadius:"50%", flexShrink:0,
                        border:`1px solid ${isDone?"#00e676":isOn?"#4a9eff":"rgba(255,255,255,0.14)"}`,
                        background: isDone?"rgba(0,230,118,0.18)":isOn?"rgba(74,158,255,0.18)":"transparent",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"0.66rem", fontWeight:700,
                        color: isDone?"#00e676":isOn?"#4a9eff":"rgba(255,255,255,0.28)",
                        transition:"all 0.3s", fontFamily:"inherit",
                        animation: isOn ? "cb-badgeglow 2.5s infinite" : "none",
                      }}>{isDone ? "✓" : ch.num}</div>

                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"inherit", fontSize:"0.6rem", color:"rgba(140,180,255,0.42)", letterSpacing:"0.15em", marginBottom:"0.15rem" }}>{ch.tag}</div>
                        <div style={{
                          fontFamily:"inherit", fontSize:"0.84rem",
                          fontWeight: isOn ? 700 : 500, lineHeight:1.3,
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                          color: isDone?"rgba(160,210,160,0.88)":isOn?"#fff":"rgba(210,230,255,0.65)",
                          transition:"color 0.2s",
                        }}>{ch.label}</div>
                      </div>

                      {isOn && <div style={{
                        width:6, height:6, borderRadius:"50%",
                        background:"#4a9eff", flexShrink:0,
                        boxShadow:"0 0 8px #4a9eff",
                      }} />}
                    </Link>
                  );
                })}
              </nav>

              {/* footer */}
              <div style={{ flexShrink:0, padding:"1rem 1.3rem 1.3rem", borderTop:"1px solid rgba(60,120,255,0.09)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
                  <span style={{ fontFamily:"inherit", fontSize:"0.62rem", color:"rgba(140,180,255,0.4)", letterSpacing:"0.15em" }}>COMPLETED</span>
                  <span style={{ fontFamily:"inherit", fontSize:"0.72rem", color:"#4a9eff", fontWeight:700 }}>{Math.max(0,idx)}/{CHAPTERS.length}</span>
                </div>
                <div style={{ height:3, background:"rgba(255,255,255,0.07)", borderRadius:4, overflow:"hidden" }}>
                  <div style={{
                    height:"100%", width:`${progress}%`,
                    background:"linear-gradient(90deg,#1a5fff,#7b5fff)",
                    borderRadius:4, transition:"width 0.7s cubic-bezier(.4,0,.2,1)",
                    boxShadow:"0 0 5px rgba(80,120,255,0.45)",
                  }} />
                </div>
              </div>

            </div>
          </aside>

          {/* ── MAIN — page content renders here ── */}
          <main style={{ flex:1, overflow:"hidden", display:"flex", fontFamily:"inherit" }}>
            {children}
          </main>

        </div>
      </div>
    </>
  );
}