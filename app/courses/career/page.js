"use client";
import { useState, useEffect } from "react";
import StreamCard from "./StreamCard";
import StreamDetails from "./StreamDetails";
import BookingModal from "./BookingModal";
import { STREAMS } from "./streamData";

const BG_SYMS = [
  { s: "</>", x: "4%",  y: "8%",  d: 0,   dr: 20, fs: "1.1rem" },
  { s: "∑",   x: "92%", y: "6%",  d: 2.5, dr: 24, fs: "1.3rem" },
  { s: "⚡",  x: "2%",  y: "52%", d: 5,   dr: 22, fs: "1rem"   },
  { s: "⚙",   x: "94%", y: "42%", d: 1,   dr: 28, fs: "1.15rem"},
  { s: "∂",   x: "14%", y: "88%", d: 3,   dr: 19, fs: "1.2rem" },
  { s: "◉",   x: "88%", y: "82%", d: 6,   dr: 25, fs: "1rem"   },
  { s: "△",   x: "50%", y: "4%",  d: 1.5, dr: 21, fs: "1rem"   },
  { s: "{}",  x: "48%", y: "94%", d: 4,   dr: 18, fs: "1.1rem" },
  { s: "λ",   x: "72%", y: "26%", d: 0.8, dr: 26, fs: "0.95rem"},
  { s: "⊕",   x: "60%", y: "74%", d: 4.5, dr: 20, fs: "1.1rem" },
  { s: "μ",   x: "82%", y: "58%", d: 1.2, dr: 23, fs: "1rem"   },
  { s: "⬡",   x: "24%", y: "32%", d: 2.8, dr: 22, fs: "0.9rem" },
];

export default function TechPathPage() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 60); return () => clearTimeout(t); }, []);

  const selectedStream = STREAMS.find(s => s.id === selected);

  const handleSelect = (id) => {
    const next = id === selected ? null : id;
    setSelected(next);
    if (next) {
      setTimeout(() => {
        document.getElementById("tp-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <>
      {/* ── GLOBAL CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #030712;
          color: rgba(215,230,255,0.9);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── KEYFRAMES ── */

        @keyframes tp-sym-float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.07; }
          50%       { transform: translateY(-30px) rotate(6deg); opacity: 0.14; }
        }
        @keyframes tp-bg-drift {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.055; }
          33%       { transform: translate(12px,-18px) scale(1.08); opacity: 0.09; }
          66%       { transform: translate(-8px,10px) scale(0.96); opacity: 0.06; }
        }
        @keyframes tp-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes tp-glow-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes tp-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes tp-ring-spin-r {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes tp-in-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tp-in-up-fast {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tp-grid-in {
          from { opacity: 0; transform: translateY(22px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tp-bar-grow {
          from { width: 0; }
          to   { width: var(--w, 0%); }
        }
        @keyframes tp-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tp-cta-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,158,255,0), 0 24px 80px rgba(0,0,20,0.5); }
          50%       { box-shadow: 0 0 60px rgba(74,158,255,0.1), 0 24px 80px rgba(0,0,20,0.5); }
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(80,140,255,0.2); border-radius: 4px; }

        /* ── NAV ── */
        .tp-nav {
          position: sticky; top: 0; z-index: 100;
          height: 58px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem;
          background: rgba(3,7,18,0.78);
          backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(60,100,200,0.1);
        }
        .tp-nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem; font-weight: 800; letter-spacing: 0.15em;
          color: #4a9eff;
          text-shadow: 0 0 20px rgba(74,158,255,0.4);
        }
        .tp-nav-logo span { color: #00e5ff; }
        .tp-nav-badge {
          font-size: 0.6rem; letter-spacing: 0.2em;
          color: rgba(140,180,255,0.45);
          padding: 0.22rem 0.65rem;
          border: 1px solid rgba(60,100,200,0.18); border-radius: 4px;
        }

        /* ── HERO ── */
        .tp-hero {
          position: relative; z-index: 1;
          padding: 7rem 2rem 5.5rem;
          text-align: center;
          max-width: 860px; margin: 0 auto;
        }
        .tp-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.62rem; letter-spacing: 0.28em; color: #4a9eff;
          padding: 0.28rem 0.9rem;
          border: 1px solid rgba(74,158,255,0.3); border-radius: 20px;
          background: rgba(74,158,255,0.06);
          margin-bottom: 1.8rem;
        }
        .tp-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          font-weight: 900; line-height: 1.06;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 1.2rem;
        }
        .tp-hero-title .tp-accent {
          background: linear-gradient(135deg, #4a9eff 0%, #a78bfa 50%, #00e5ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tp-shimmer 5s ease infinite;
        }
        .tp-hero-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(175,205,255,0.58);
          line-height: 1.75; max-width: 500px; margin: 0 auto 2.5rem;
        }
        .tp-hero-divider {
          display: flex; align-items: center; justify-content: center;
          gap: 0.6rem;
          font-size: 0.6rem; letter-spacing: 0.18em;
          color: rgba(140,180,255,0.35);
        }
        .tp-hero-divider-line {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,158,255,0.3), transparent);
        }

        /* ── SECTION SHELL ── */
        .tp-section {
          position: relative; z-index: 1;
          max-width: 1320px; margin: 0 auto;
          padding: 0 2rem 6rem;
        }
        .tp-section-eyebrow {
          font-size: 0.6rem; letter-spacing: 0.26em;
          color: rgba(140,180,255,0.42);
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.6rem;
        }
        .tp-section-eyebrow::before {
          content: ""; display: block;
          width: 22px; height: 1px;
          background: rgba(74,158,255,0.3);
        }
        .tp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 2.8vw, 2.1rem);
          font-weight: 800; color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.015em;
        }
        .tp-section-desc {
          font-size: 0.9rem; color: rgba(175,200,255,0.45);
          margin-bottom: 3rem; max-width: 460px; line-height: 1.65;
        }

        /* ── STREAM GRID ── */
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.35rem;
        }
        .tp-grid > * {
          animation: tp-grid-in 0.6s ease both;
        }
        .tp-grid > *:nth-child(1) { animation-delay: 0.04s; }
        .tp-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .tp-grid > *:nth-child(3) { animation-delay: 0.16s; }
        .tp-grid > *:nth-child(4) { animation-delay: 0.22s; }
        .tp-grid > *:nth-child(5) { animation-delay: 0.28s; }
        .tp-grid > *:nth-child(6) { animation-delay: 0.34s; }

        /* ── CTA ── */
        .tp-cta-section {
          position: relative; z-index: 1;
          max-width: 1320px; margin: 0 auto;
          padding: 0 2rem 8rem;
        }
        .tp-cta-card {
          background: rgba(7,13,36,0.72);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(74,158,255,0.16);
          border-radius: 22px;
          padding: 4rem 3.5rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 2.5rem;
          flex-wrap: wrap;
          position: relative; overflow: hidden;
          animation: tp-cta-pulse 3.5s ease infinite;
        }
        .tp-cta-card::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 70% at 15% 50%, rgba(74,158,255,0.055) 0%, transparent 65%);
        }
        .tp-cta-card::after {
          content: '';
          position: absolute; top: -1px; left: 2rem; right: 2rem; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,158,255,0.3), transparent);
        }
        .tp-cta-eyebrow {
          font-size: 0.6rem; letter-spacing: 0.25em; color: #4a9eff;
          margin-bottom: 0.7rem; opacity: 0.7;
        }
        .tp-cta-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.7rem, 3vw, 2.5rem);
          font-weight: 900; color: #fff; line-height: 1.1;
          letter-spacing: -0.02em; margin-bottom: 0.7rem;
        }
        .tp-cta-sub {
          font-size: 0.92rem; color: rgba(175,200,255,0.5);
          line-height: 1.65; max-width: 400px;
        }
        .tp-cta-btn {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 1.05rem 2.4rem; border-radius: 50px;
          background: linear-gradient(135deg, #1a4fff 0%, #6030ff 100%);
          border: none; color: #fff; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 700; letter-spacing: 0.14em;
          white-space: nowrap;
          box-shadow: 0 8px 36px rgba(70,50,255,0.38);
          transition: box-shadow 0.25s, transform 0.25s;
          flex-shrink: 0;
        }
        .tp-cta-btn:hover {
          box-shadow: 0 14px 50px rgba(70,50,255,0.58);
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .tp-hero { padding: 5rem 1.4rem 4rem; }
          .tp-section, .tp-cta-section { padding-left: 1.4rem; padding-right: 1.4rem; }
          .tp-grid { grid-template-columns: 1fr 1fr; }
          .tp-cta-card { padding: 2.5rem 2rem; flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 500px) {
          .tp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", position: "relative", background: "#030712", overflowX: "hidden" }}>

        {/* ── LAYERED BACKGROUND ── */}
        {/* Deep gradient base */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 90% 70% at 15% 25%, rgba(18,50,120,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 85% 75%, rgba(70,25,130,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 5%,  rgba(12,35,90,0.16)  0%, transparent 50%),
            linear-gradient(180deg, #030712 0%, #060d20 45%, #0a0520 100%)
          `,
        }} />

        {/* Grid */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(45,90,200,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,90,200,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

        {/* Concentric rings */}
        {[700, 1050, 1400].map((size, i) => (
          <div key={i} style={{
            position: "fixed", borderRadius: "50%",
            width: size, height: size,
            top: `calc(50vh - ${size/2}px)`, left: `calc(50% - ${size/2}px)`,
            border: "1px solid rgba(60,110,220,0.05)",
            zIndex: 0, pointerEvents: "none",
            animation: `${i % 2 === 0 ? "tp-ring-spin" : "tp-ring-spin-r"} ${80 + i * 25}s linear infinite`,
          }} />
        ))}

        {/* Drifting background symbols */}
        {BG_SYMS.map((e, i) => (
          <div key={i} style={{
            position: "fixed",
            left: e.x, top: e.y,
            fontSize: e.fs,
            color: "rgba(80,140,255,0.07)",
            fontFamily: "monospace",
            userSelect: "none", pointerEvents: "none", zIndex: 0,
            animation: `tp-bg-drift ${e.dr}s ${e.d}s ease-in-out infinite`,
          }}>{e.s}</div>
        ))}

        {/* ── NAV ── */}
        <nav className="tp-nav">
          <div className="tp-nav-logo">⬡ TECH<span>PATH</span></div>
          <div className="tp-nav-badge">CAREER NAVIGATOR</div>
        </nav>

        {/* ── HERO ── */}
        <section className="tp-hero">
          <div
            className="tp-hero-eyebrow"
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
          >◈ CHOOSE YOUR STREAM</div>

          <h1
            className="tp-hero-title"
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            Choose Your{" "}
            <span className="tp-accent">Tech Path</span>
          </h1>

          <p
            className="tp-hero-sub"
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            Design your future with clarity, not confusion. Explore every stream, understand what truly awaits, and make the decision that shapes your career.
          </p>

          <div
            className="tp-hero-divider"
            style={{
              opacity: heroIn ? 1 : 0,
              transition: "opacity 0.7s ease 0.4s",
            }}
          >
            <div className="tp-hero-divider-line" />
            SCROLL TO EXPLORE
            <div className="tp-hero-divider-line" />
          </div>
        </section>

        {/* ── STREAM GRID ── */}
        <section className="tp-section">
          <div className="tp-section-eyebrow">DISCIPLINES</div>
          <h2 className="tp-section-title">Pick Your Stream</h2>
          <p className="tp-section-desc">Click any card to explore what each stream truly offers — beyond the syllabus.</p>

          <div className="tp-grid">
            {STREAMS.map((stream) => (
              <StreamCard
                key={stream.id}
                stream={stream}
                isSelected={selected === stream.id}
                onClick={() => handleSelect(stream.id)}
              />
            ))}
          </div>
        </section>

        {/* ── STREAM DETAILS ── */}
        <div id="tp-details" style={{ scrollMarginTop: "80px" }} />
        {selectedStream && (
          <StreamDetails
            key={selectedStream.id}
            stream={selectedStream}
            onClose={() => setSelected(null)}
          />
        )}

        {/* ── CTA ── */}
        <div className="tp-cta-section">
          <div className="tp-cta-card">
            <div>
              <div className="tp-cta-eyebrow">EXPERT GUIDANCE</div>
              <h2 className="tp-cta-title">Still Unsure?</h2>
              <p className="tp-cta-sub">
                Talk to an industry professional who&apos;s been there. Get honest, personalized advice on the stream that fits you best.
              </p>
            </div>
            <button className="tp-cta-btn" onClick={() => setShowModal(true)}>
              <span>Book Appointment</span>
              <span style={{ fontSize: "1rem" }}>→</span>
            </button>
          </div>
        </div>

        {/* ── MODAL ── */}
        {showModal && <BookingModal onClose={() => setShowModal(false)} />}

      </div>
    </>
  );
}
