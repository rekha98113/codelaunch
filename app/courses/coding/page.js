"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── LESSON DATA ─────────────────────────────────────────────────────────────
const LESSONS = [
  {
    title: "Computers Understand Instructions Only",
    theory: [
      {
        text: "A computer is a purely deterministic machine. It does not think, reason, guess, or interpret meaning. Every action it performs — from displaying a character on screen to running an entire operating system — is the result of exact, pre-written instructions being executed step by step.",
        example: "Think of a vending machine. You press B3 and it dispenses a specific drink. It doesn't wonder if you actually wanted B4. It executes exactly what you pressed. Computers work the same way — no assumptions, no improvisation.",
      },
      {
        text: "Because computers execute instructions literally, precision is not optional — it is fundamental. The instructions must describe every action in complete detail. A computer will never fill in the gaps, and it will never assume intent from ambiguous input.",
        example: "Imagine telling a robot chef to 'make pasta'. Without exact steps — how much water, what temperature, how long to boil — it has no idea what to do. Code must be just as specific: every step must be explicitly stated.",
      },
      {
        text: "Even the tiniest mistake causes incorrect or completely unexpected output. This is why debugging is one of the most critical skills in programming. A misplaced comma, wrong variable name, or a missing step can break an entire system.",
        example: "In 1999, NASA lost the Mars Climate Orbiter spacecraft because one team used metric units and another used imperial units. A single inconsistency cost $327 million. Precision is not optional — it is everything.",
      },
    ],
    quiz: {
      question: "Why must instructions given to a computer be precise?",
      options: [
        "Computers guess missing steps intelligently",
        "Computers execute exact instructions only — no assumptions",
        "Coding is a creative form of expression",
      ],
      correct: 1,
      ok: "✓ Exactly right. Computers are deterministic — they execute precisely what they're told, nothing more.",
      err: "✗ Computers never guess. They follow exact instructions. Even a tiny mistake produces wrong results.",
    },
  },
  {
    title: "Why Programming Languages Exist",
    theory: [
      {
        text: "Humans communicate using natural languages — flexible, context-dependent, and sometimes ambiguous. Computers operate at the hardware level in binary: sequences of ones and zeros representing electrical signals.",
        example: "When you type 'A' on a keyboard, the computer stores it as 01000001 in binary. The letter means nothing to the hardware — only the pattern of bits does. Every piece of data, from text to video, is ultimately binary.",
      },
      {
        text: "Since computers cannot understand human language directly, we need structured intermediate systems. Programming languages let humans express logic in a structured, unambiguous form that can be systematically translated into binary instructions the machine can execute.",
        example: "Think of a programming language like a formal contract. Unlike casual conversation, a legal contract must be precise. Similarly, Python or JavaScript forces you to express logic in a structured way — then a compiler translates it to machine code.",
      },
      {
        text: "Over decades, programming languages evolved from low-level assembly (close to binary) to high-level languages like Python, JavaScript, and Java that read almost like English. Each abstraction level lets developers write complex logic with less code.",
        example: "Assembly 1950: MOV AX, 5 / ADD AX, 3 — move value 5 into register, add 3. Python 2024: result = 5 + 3. Same operation, drastically different readability. High-level languages let you focus on problems, not bits.",
      },
    ],
    quiz: {
      question: "What is the primary role of programming languages?",
      options: [
        "To allow emotional communication with machines",
        "To translate human logic into machine-executable instructions",
        "To help design physical computer hardware",
      ],
      correct: 1,
      ok: "✓ Correct! Programming languages bridge the gap between human logical thinking and binary machine execution.",
      err: "✗ Not quite. Think about the gap between how humans think and how computers process data in binary.",
    },
  },
  {
    title: "Coding is Logical Problem Solving",
    theory: [
      {
        text: "Coding is fundamentally about structured problem solving — not memorizing syntax. A skilled developer's most valuable ability is breaking a complex problem down into smaller, logical, sequential steps a machine can execute one at a time.",
        example: "Google Maps doesn't just 'find the fastest route'. It breaks the problem into steps: collect location, identify destination, calculate all paths, compare times with traffic, return the optimal one. Each step is a logical sub-problem.",
      },
      {
        text: "Before writing a single line of code, a developer must understand the problem and design a solution strategy. This thinking phase — algorithm design — is where real programming happens. Syntax is just the tool to express that logic.",
        example: "A surgeon doesn't pick up the scalpel before studying scans and planning the operation. Similarly, experienced developers often spend more time designing on paper than writing actual code. The thinking comes first.",
      },
      {
        text: "Strong programmers think in patterns: sequences (steps in order), conditions (if this, then that), and loops (repeat until done). These three concepts underpin virtually every program ever written — from a calculator app to an AI model.",
        example: "An ATM works on exactly three patterns: Loop — keep waiting for card. Condition — if PIN correct, allow access. Sequence — show balance, ask amount, dispense cash, update account. Every app uses these three building blocks.",
      },
    ],
    quiz: {
      question: "What is the most important foundation when learning to code?",
      options: [
        "Memorizing syntax and programming keywords",
        "Logical thinking and structured problem solving",
        "Improving typing speed and keyboard shortcuts",
      ],
      correct: 1,
      ok: "✓ Correct! Logical thinking is the core of programming. Syntax is just the vocabulary — logic is the substance.",
      err: "✗ Syntax and speed are tools. The real foundation is learning to think logically and break problems into steps.",
    },
  },
];

// ─── FLOATING SYMBOLS ────────────────────────────────────────────────────────
const SYMBOLS = ["∑","π","√","∫","01","10","λ","∞","∂","Δ","≡","∀","⊕","φ","ε","μ","⟨⟩","∇","τ","0x1F"];

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    symbol: SYMBOLS[i % SYMBOLS.length],
    left: `${(i * 37 + 5) % 100}%`,
    fontSize: `${0.9 + (i % 4) * 0.2}rem`,
    duration: `${13 + (i * 1.1) % 9}s`,
    delay: `${(i * 0.65) % 11}s`,
  }));

  return (
    <div style={S.particles}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(15deg); opacity: 0; }
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 20px 80px rgba(0,0,40,0.8), 0 0 30px rgba(80,140,255,0.12); }
          50%     { box-shadow: 0 20px 80px rgba(0,0,40,0.8), 0 0 60px rgba(80,140,255,0.3); }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(80,140,255,0.25); border-radius: 4px; }
        .opt-btn:hover:not(:disabled) {
          background: rgba(40,80,200,0.2) !important;
          border-color: rgba(100,160,255,0.45) !important;
          transform: translateX(4px);
        }
        .theory-card:hover {
          border-color: rgba(60,120,255,0.3) !important;
          box-shadow: 0 10px 36px rgba(0,0,40,0.5), 0 0 0 1px rgba(60,120,255,0.12) !important;
          transform: translateY(-2px) perspective(800px) rotateX(0.5deg);
        }
        .lesson-item:hover { background: rgba(60,120,255,0.09) !important; }
        .pctrl:hover { background: rgba(60,120,255,0.22) !important; color: #4a9eff !important; }
        .next-btn:hover { box-shadow: 0 6px 32px rgba(80,100,255,0.65) !important; transform: translateY(-2px) !important; }
        .submit-ready:hover { box-shadow: 0 4px 28px rgba(60,80,255,0.5) !important; transform: translateY(-1px) !important; }
        .restart-btn:hover { box-shadow: 0 0 44px rgba(100,100,255,0.7) !important; transform: translateY(-2px) !important; }
        .sidebar-toggle:hover { background: rgba(60,120,255,0.25) !important; }
      `}</style>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", bottom: "-2rem", left: p.left,
          fontSize: p.fontSize, color: "rgba(80,160,255,0.06)",
          fontFamily: "inherit", userSelect: "none",
          animation: `floatUp ${p.duration} ${p.delay} infinite linear`,
        }}>{p.symbol}</div>
      ))}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ lessons, currentStep, doneLessons, completed, onJump }) {
  return (
    <div style={S.sidebarInner}>
      <div style={S.sidebarHeader}>
        <div style={S.sidebarTag}>CHAPTER 01</div>
        <div style={S.sidebarChapter}>Foundations of Coding</div>
      </div>
      <div style={S.lessonList}>
        {lessons.map((lesson, i) => {
          const isDone = doneLessons.includes(i);
          const isActive = i === currentStep && !completed;
          return (
            <div
              key={i}
              className="lesson-item"
              onClick={() => isDone && onJump(i)}
              style={{
                ...S.lessonItem,
                ...(isActive ? S.lessonItemActive : {}),
                cursor: isDone ? "pointer" : "default",
              }}
            >
              <div style={{
                ...S.lessonCheck,
                ...(isDone ? S.lessonCheckDone : isActive ? S.lessonCheckActive : {}),
              }}>
                {isDone ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={S.lessonNum}>LESSON {i + 1}</div>
                <div style={{
                  ...S.lessonName,
                  color: isDone
                    ? "rgba(160,210,160,0.85)"
                    : isActive ? "#fff" : "rgba(210,230,255,0.65)",
                }}>{lesson.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── THEORY PANEL ─────────────────────────────────────────────────────────────
function TheoryPanel({ lesson, step, total }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ marginBottom: "0.7rem" }}>
        <span style={S.lessonBadge}>◈ LESSON {step + 1} OF {total}</span>
      </div>
      <h1 style={S.lessonTitle}>{lesson.title}</h1>
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {lesson.theory.map((block, i) => (
          <div
            key={i}
            className="theory-card"
            style={{ ...S.theoryCard, animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}
          >
            <div style={S.conceptNum}>CONCEPT {String(i + 1).padStart(2, "0")}</div>
            <p style={S.theoryText}>{block.text}</p>
            <div style={S.exampleBox}>
              <div style={S.exampleLabel}>💡 REAL-WORLD EXAMPLE</div>
              <p style={S.exampleText}>{block.example}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QUIZ PANEL ──────────────────────────────────────────────────────────────
function QuizPanel({ lesson, step, total, score, selected, confirmed, onSelect, onSubmit, onNext }) {
  const q = lesson.quiz;
  const isCorrect = selected === q.correct;

  return (
    <div style={{ animation: "fadeUp 0.45s ease", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={S.quizHeader}>
        <div style={S.quizIcon}>⚡</div>
        <div style={S.quizTag}>KNOWLEDGE CHECK</div>
      </div>

      <div style={S.scoreMini}>
        <div style={{
          width: 9, height: 9, borderRadius: "50%", flexShrink: 0,
          background: score > 0 ? "#00e676" : "rgba(255,255,255,0.15)",
        }} />
        Score:&nbsp;<strong style={{ color: "#4a9eff", fontFamily: "inherit" }}>{score}/{total}</strong>
        &nbsp;·&nbsp;Lesson {step + 1} of {total}
      </div>

      <p style={S.quizQuestion}>{q.question}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {q.options.map((opt, i) => {
          let extra = {};
          let letter = String.fromCharCode(65 + i);
          let badgeBg = i === selected ? "rgba(100,160,255,0.2)" : "rgba(255,255,255,0.06)";

          if (confirmed) {
            if (i === q.correct)                        { extra = S.optCorrect; letter = "✓"; badgeBg = "rgba(0,230,118,0.2)"; }
            else if (i === selected && i !== q.correct) { extra = S.optWrong;   letter = "✗"; badgeBg = "rgba(255,77,109,0.2)"; }
          } else if (i === selected) {
            extra = S.optSelected;
          }

          return (
            <button
              key={i}
              className="opt-btn"
              disabled={confirmed}
              onClick={() => onSelect(i)}
              style={{ ...S.optBtn, ...extra }}
            >
              <span style={{ ...S.optLetter, background: badgeBg }}>{letter}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {confirmed && (
        <div style={{
          ...S.feedbackBox,
          ...(isCorrect ? S.feedbackOk : S.feedbackErr),
          animation: "fadeUp 0.35s ease",
        }}>
          {isCorrect ? q.ok : q.err}
        </div>
      )}

      {!confirmed ? (
        <button
          className={selected !== null ? "submit-ready" : ""}
          onClick={onSubmit}
          disabled={selected === null}
          style={{ ...S.actionBtn, ...(selected !== null ? S.submitReady : S.submitDisabled) }}
        >
          SUBMIT ANSWER
        </button>
      ) : (
        <button className="next-btn" onClick={onNext} style={S.nextBtn}>
          {step < total - 1 ? "NEXT LESSON →" : "COMPLETE CHAPTER ✦"}
        </button>
      )}
    </div>
  );
}

// ─── COMPLETE SCREEN ──────────────────────────────────────────────────────────
function CompleteScreen({ score, total, onRestart }) {
  return (
    <div style={S.completeWrap}>
      <div style={S.completeCard}>
        <div style={{ fontSize: "3.8rem", marginBottom: "1.1rem" }}>🎯</div>
        <div style={S.completeBadge}>✦ CHAPTER COMPLETE</div>
        <h2 style={S.completeTitle}>Foundation Built.</h2>
        <p style={S.completeSub}>
          You now understand why computers demand precision, how programming languages
          bridge human logic to binary, and why structured logical thinking is the
          true foundation of every developer.
        </p>
        <div style={S.statsRow}>
          {[
            { val: `${score}/${total}`, label: "QUIZ SCORE" },
            { val: total,               label: "LESSONS DONE" },
            { val: "01",                label: "CHAPTER" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={S.statVal}>{s.val}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
        <button className="restart-btn" onClick={onRestart} style={S.restartBtn}>
          RESTART CHAPTER ↺
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step,            setStep]            = useState(0);
  const [selected,        setSelected]        = useState(null);
  const [confirmed,       setConfirmed]       = useState(false);
  const [completed,       setCompleted]       = useState(false);
  const [score,           setScore]           = useState(0);
  const [doneLessons,     setDoneLessons]     = useState([]);
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [theoryCollapsed, setTheoryCollapsed] = useState(false);
  const [theoryWidth,     setTheoryWidth]     = useState(null);
  const [quizWidth,       setQuizWidth]       = useState(420);

  const dragging    = useRef(false);
  const dragStartX  = useRef(0);
  const dragStartTW = useRef(0);
  const dragStartQW = useRef(0);
  const theoryRef   = useRef(null);
  const quizRef     = useRef(null);

  const lesson   = LESSONS[step];
  const progress = completed
    ? 100
    : Math.round(((step + (confirmed ? 1 : 0)) / LESSONS.length) * 100);

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === lesson.quiz.correct) setScore((s) => s + 1);
  }, [selected, lesson]);

  const handleNext = useCallback(() => {
    setDoneLessons((prev) => prev.includes(step) ? prev : [...prev, step]);
    if (step < LESSONS.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setCompleted(true);
    }
  }, [step]);

  const handleJump = useCallback((i) => {
    setStep(i); setSelected(null); setConfirmed(false);
  }, []);

  const handleRestart = useCallback(() => {
    setStep(0); setSelected(null); setConfirmed(false);
    setCompleted(false); setScore(0); setDoneLessons([]);
    setTheoryCollapsed(false);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!theoryRef.current || !quizRef.current) return;
    dragging.current    = true;
    dragStartX.current  = e.clientX;
    dragStartTW.current = theoryRef.current.getBoundingClientRect().width;
    dragStartQW.current = quizRef.current.getBoundingClientRect().width;
    document.body.style.cursor     = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStartX.current;
      setTheoryWidth(Math.max(260, dragStartTW.current + dx));
      setQuizWidth(Math.max(280, dragStartQW.current - dx));
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor     = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div style={S.root}>
      <FloatingParticles />
      <div style={S.gridOverlay} />

      {/* TOPBAR */}
      <div style={S.topbar}>
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          style={S.sidebarToggleBtn}
        >☰</button>
        <div style={S.logo}>⬡ CODE<span style={{ color: "#00e5ff" }}>BASE</span></div>
        <div style={S.courseTag}>FOUNDATION 01 — INTRO TO CODING</div>
        <div style={{ flex: 1 }} />
        <div style={S.progressWrap}>
          <span style={S.progressLabel}>PROGRESS</span>
          <div style={S.progressTrack}>
            <div style={{ ...S.progressFill, width: `${progress}%` }} />
          </div>
          <span style={S.progressPct}>{progress}%</span>
        </div>
      </div>

      {/* LAYOUT */}
      <div style={S.layout}>

        {/* SIDEBAR */}
        <div style={{
          ...S.sidebar,
          width:         sidebarOpen ? 270 : 0,
          opacity:       sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}>
          <Sidebar
            lessons={LESSONS}
            currentStep={step}
            doneLessons={doneLessons}
            completed={completed}
            onJump={handleJump}
          />
        </div>

        {/* CONTENT */}
        <div style={S.contentArea}>
          {completed ? (
            <CompleteScreen score={score} total={LESSONS.length} onRestart={handleRestart} />
          ) : (
            <div style={S.panelOuter}>

              {/* THEORY */}
              {!theoryCollapsed && (
                <div
                  ref={theoryRef}
                  style={{
                    ...S.theoryPanel,
                    ...(theoryWidth ? { flex: "none", width: theoryWidth } : {}),
                  }}
                >
                  <div style={S.panelControls}>
                    <button className="pctrl" style={S.pctrl}
                      onClick={() => { setTheoryWidth(null); setQuizWidth(420); }}>Default</button>
                    <button className="pctrl" style={S.pctrl}
                      onClick={() => { setTheoryWidth(null); setQuizWidth(310); }}>Expand</button>
                    <button className="pctrl" style={S.pctrl}
                      onClick={() => setTheoryCollapsed(true)}>Hide ◀</button>
                  </div>
                  <TheoryPanel lesson={lesson} step={step} total={LESSONS.length} />
                </div>
              )}

              {/* RESIZE HANDLE */}
              {!theoryCollapsed && (
                <div onMouseDown={handleMouseDown} style={S.resizeHandle} title="Drag to resize">
                  <div style={S.resizeBar} />
                </div>
              )}

              {/* QUIZ */}
              <div
                ref={quizRef}
                style={{
                  ...S.quizPanel,
                  width: theoryCollapsed ? "100%" : quizWidth,
                  flex:  theoryCollapsed ? 1 : "none",
                }}
              >
                <div style={S.panelControls}>
                  <button className="pctrl" style={S.pctrl}
                    onClick={() => { setQuizWidth(420); setTheoryWidth(null); }}>Default</button>
                  <button className="pctrl" style={S.pctrl}
                    onClick={() => setQuizWidth(540)}>Expand</button>
                  {theoryCollapsed && (
                    <button className="pctrl" style={S.pctrl}
                      onClick={() => setTheoryCollapsed(false)}>◀ Theory</button>
                  )}
                </div>
                <QuizPanel
                  lesson={lesson}
                  step={step}
                  total={LESSONS.length}
                  score={score}
                  selected={selected}
                  confirmed={confirmed}
                  onSelect={(i) => !confirmed && setSelected(i)}
                  onSubmit={handleSubmit}
                  onNext={handleNext}
                />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  root: {
    height: "100vh", overflow: "hidden", position: "relative",
    fontFamily: "inherit", fontSize: "16px",
    color: "rgba(210,230,255,0.92)",
    background: `
      radial-gradient(ellipse at 20% 50%, rgba(26,60,120,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(80,40,160,0.1) 0%, transparent 50%),
      linear-gradient(160deg, #010410 0%, #020c20 50%, #030e28 100%)
    `,
  },
  particles: { position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 },
  gridOverlay: {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(30,80,200,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,80,200,0.035) 1px, transparent 1px)
    `,
    backgroundSize: "52px 52px",
  },

  // ── Topbar ──
  topbar: {
    position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 200,
    display: "flex", alignItems: "center", gap: "1rem", padding: "0 1.4rem",
    background: "rgba(2,8,22,0.96)", backdropFilter: "blur(24px)",
    borderBottom: "1px solid rgba(60,120,255,0.2)",
    boxShadow: "0 2px 30px rgba(0,0,0,0.6)", fontFamily: "inherit",
  },
  sidebarToggleBtn: {
    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
    background: "rgba(60,120,255,0.12)", border: "1px solid rgba(60,120,255,0.2)",
    color: "#4a9eff", cursor: "pointer", fontSize: "1.15rem",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", fontFamily: "inherit",
  },
  logo: {
    fontFamily: "inherit", fontSize: "1rem", fontWeight: 800,
    color: "#4a9eff", letterSpacing: "0.18em", whiteSpace: "nowrap",
    textShadow: "0 0 20px rgba(74,158,255,0.5)",
  },
  courseTag: {
    fontFamily: "inherit", fontSize: "0.75rem", color: "rgba(140,180,255,0.5)",
    letterSpacing: "0.13em", padding: "0.3rem 0.75rem",
    border: "1px solid rgba(60,120,255,0.18)", borderRadius: 4, whiteSpace: "nowrap",
  },
  progressWrap: { display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 240 },
  progressLabel: {
    fontFamily: "inherit", fontSize: "0.72rem", color: "rgba(140,180,255,0.5)",
    letterSpacing: "0.1em", whiteSpace: "nowrap",
  },
  progressTrack: { flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #1a5fff, #7b5fff, #00e5ff)",
    backgroundSize: "200% 100%", borderRadius: 4,
    transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
    boxShadow: "0 0 10px rgba(100,150,255,0.8)",
    animation: "shimmer 2.5s infinite linear",
  },
  progressPct: {
    fontFamily: "inherit", fontSize: "0.78rem",
    color: "#4a9eff", fontWeight: 700, whiteSpace: "nowrap",
  },

  // ── Layout ──
  layout: {
    position: "fixed", top: 56, left: 0, right: 0, bottom: 0,
    display: "flex", overflow: "hidden", zIndex: 10,
  },

  // ── Sidebar ──
  sidebar: {
    flexShrink: 0, overflow: "hidden",
    background: "rgba(5,12,35,0.92)",
    borderRight: "1px solid rgba(60,120,255,0.18)",
    transition: "width 0.35s cubic-bezier(.4,0,.2,1), opacity 0.3s",
    fontFamily: "inherit",
  },
  sidebarInner: { width: 270, height: "100%", display: "flex", flexDirection: "column", fontFamily: "inherit" },
  sidebarHeader: {
    padding: "1.1rem 1.2rem 0.9rem",
    borderBottom: "1px solid rgba(60,120,255,0.08)", flexShrink: 0,
  },
  sidebarTag: {
    fontFamily: "inherit", fontSize: "0.7rem", color: "rgba(140,180,255,0.5)",
    letterSpacing: "0.2em", marginBottom: "0.45rem",
  },
  sidebarChapter: {
    fontFamily: "inherit", fontSize: "0.92rem",
    color: "#4a9eff", fontWeight: 700, letterSpacing: "0.04em",
  },
  lessonList: { flex: 1, overflowY: "auto", padding: "0.75rem 0" },
  lessonItem: {
    display: "flex", alignItems: "center", gap: "0.8rem",
    padding: "0.85rem 1.2rem",
    borderLeft: "2px solid transparent", transition: "all 0.2s", fontFamily: "inherit",
  },
  lessonItemActive: { background: "rgba(26,95,255,0.12)", borderLeftColor: "#4a9eff" },
  lessonCheck: {
    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 700,
    transition: "all 0.3s", fontFamily: "inherit",
  },
  lessonCheckDone:   { background: "rgba(0,230,118,0.2)", borderColor: "#00e676", color: "#00e676" },
  lessonCheckActive: { background: "rgba(74,158,255,0.2)", borderColor: "#4a9eff", color: "#4a9eff" },
  lessonNum: {
    fontFamily: "inherit", fontSize: "0.66rem", color: "rgba(140,180,255,0.5)",
    letterSpacing: "0.1em", marginBottom: "0.15rem",
  },
  lessonName: {
    fontFamily: "inherit", fontSize: "0.84rem", lineHeight: 1.35,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },

  // ── Content ──
  contentArea: { flex: 1, display: "flex", overflow: "hidden", position: "relative" },
  panelOuter:  { flex: 1, display: "flex", overflow: "hidden" },

  // ── Theory ──
  theoryPanel: {
    flex: 1, overflowY: "auto", padding: "1.75rem 2.1rem 2.5rem",
    borderRight: "1px solid rgba(60,120,255,0.08)", fontFamily: "inherit",
  },
  lessonBadge: {
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.34rem 0.9rem",
    background: "rgba(26,95,255,0.15)", border: "1px solid rgba(60,120,255,0.3)",
    borderRadius: 20, fontSize: "0.75rem", color: "#4a9eff",
    letterSpacing: "0.13em", fontFamily: "inherit",
  },
  lessonTitle: {
    fontFamily: "inherit", fontSize: "clamp(1.25rem, 2.3vw, 1.7rem)",
    fontWeight: 800, color: "#fff", lineHeight: 1.2,
    textShadow: "0 0 40px rgba(74,158,255,0.25)",
    letterSpacing: "0.03em", marginTop: "0.65rem",
  },
  theoryCard: {
    padding: "1.45rem 1.6rem",
    background: "rgba(8,18,45,0.75)",
    border: "1px solid rgba(60,120,255,0.09)",
    borderRadius: 15, position: "relative", overflow: "hidden",
    transition: "all 0.3s", cursor: "default",
    transformStyle: "preserve-3d", fontFamily: "inherit",
  },
  conceptNum: {
    fontFamily: "inherit", fontSize: "0.67rem", color: "rgba(140,180,255,0.5)",
    letterSpacing: "0.2em", marginBottom: "0.6rem",
  },
  theoryText: {
    fontFamily: "inherit", fontSize: "1rem", lineHeight: 1.9,
    color: "rgba(210,230,255,0.92)",
  },
  exampleBox: {
    marginTop: "0.8rem", padding: "1rem 1.15rem",
    background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)",
    borderRadius: 11, fontFamily: "inherit",
  },
  exampleLabel: {
    fontFamily: "inherit", fontSize: "0.67rem", color: "#00e5ff",
    letterSpacing: "0.17em", marginBottom: "0.45rem",
    display: "flex", alignItems: "center", gap: "0.4rem",
  },
  exampleText: {
    fontFamily: "inherit", fontSize: "0.92rem",
    lineHeight: 1.8, color: "rgba(180,230,255,0.82)",
  },

  // ── Resize handle ──
  resizeHandle: {
    width: 6, background: "transparent", cursor: "col-resize",
    flexShrink: 0, position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  resizeBar: {
    width: 2, height: 44, borderRadius: 2,
    background: "rgba(60,120,255,0.25)", transition: "all 0.2s",
  },

  // ── Quiz ──
  quizPanel: {
    flexShrink: 0, overflowY: "auto", padding: "1.75rem 1.75rem 2.5rem",
    background: "rgba(4,10,28,0.6)", transition: "width 0.3s", fontFamily: "inherit",
  },
  quizHeader: {
    display: "flex", alignItems: "center", gap: "0.65rem",
    marginBottom: "1.1rem", paddingBottom: "0.9rem",
    borderBottom: "1px solid rgba(60,120,255,0.09)",
  },
  quizIcon: {
    width: 38, height: 38, borderRadius: 10, fontSize: "1.05rem",
    background: "linear-gradient(135deg, rgba(123,95,255,0.3), rgba(26,95,255,0.2))",
    border: "1px solid rgba(123,95,255,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  quizTag: {
    fontFamily: "inherit", fontSize: "0.75rem",
    color: "rgba(200,150,255,0.85)", letterSpacing: "0.15em",
  },
  scoreMini: {
    display: "flex", alignItems: "center", gap: "0.55rem",
    padding: "0.65rem 1rem",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(60,120,255,0.09)",
    borderRadius: 10, fontSize: "0.78rem", color: "rgba(140,180,255,0.55)",
    fontFamily: "inherit",
  },
  quizQuestion: {
    fontFamily: "inherit", fontSize: "1.05rem",
    color: "#fff", lineHeight: 1.65, fontWeight: 600,
  },
  optBtn: {
    width: "100%", display: "flex", alignItems: "center", gap: "0.9rem",
    padding: "1rem 1.15rem",
    background: "rgba(15,30,80,0.5)", border: "1px solid rgba(60,120,255,0.2)",
    borderRadius: 13, color: "rgba(190,215,255,0.9)",
    fontFamily: "inherit", fontSize: "0.95rem",
    textAlign: "left", cursor: "pointer", transition: "all 0.22s", lineHeight: 1.5,
  },
  optSelected: { background: "rgba(30,70,180,0.35)", borderColor: "rgba(100,160,255,0.55)" },
  optCorrect:  { background: "rgba(0,100,60,0.4)", borderColor: "rgba(0,230,118,0.5)", color: "#7effc0" },
  optWrong:    { background: "rgba(100,0,40,0.4)", borderColor: "rgba(255,77,109,0.5)", color: "#ff9ab0" },
  optLetter: {
    minWidth: 30, height: 30, borderRadius: 8, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.8rem", fontWeight: 700, color: "inherit",
    transition: "all 0.22s", fontFamily: "inherit",
  },
  feedbackBox: {
    padding: "1.05rem 1.15rem", borderRadius: 12,
    fontSize: "0.93rem", lineHeight: 1.72, fontFamily: "inherit",
  },
  feedbackOk:  { background: "rgba(0,80,50,0.4)", border: "1px solid rgba(0,230,118,0.35)", color: "#7effc0" },
  feedbackErr: { background: "rgba(80,0,30,0.4)", border: "1px solid rgba(255,77,109,0.35)", color: "#ff9ab0" },
  actionBtn: {
    width: "100%", padding: "1rem", borderRadius: 12,
    fontFamily: "inherit", fontSize: "0.88rem",
    letterSpacing: "0.15em", fontWeight: 700,
    cursor: "pointer", transition: "all 0.25s", border: "none",
  },
  submitDisabled: {
    background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.08)", cursor: "not-allowed",
  },
  submitReady: {
    background: "linear-gradient(135deg, rgba(26,79,255,0.75), rgba(96,48,255,0.75))",
    color: "#fff", border: "1px solid rgba(100,160,255,0.4)",
    boxShadow: "0 4px 20px rgba(60,80,255,0.3)",
  },
  nextBtn: {
    width: "100%", padding: "1rem", borderRadius: 12,
    fontFamily: "inherit", fontSize: "0.88rem",
    letterSpacing: "0.15em", fontWeight: 700, cursor: "pointer",
    background: "linear-gradient(135deg, #1a4fff, #6030ff)",
    color: "#fff", border: "none",
    boxShadow: "0 4px 22px rgba(80,100,255,0.4)",
    transition: "all 0.25s",
  },

  // ── Panel controls ──
  panelControls: { display: "flex", gap: "0.4rem", marginBottom: "1.2rem" },
  pctrl: {
    fontFamily: "inherit", padding: "0.32rem 0.8rem", borderRadius: 6, fontSize: "0.72rem",
    background: "rgba(60,120,255,0.1)", border: "1px solid rgba(60,120,255,0.18)",
    color: "rgba(140,180,255,0.55)", cursor: "pointer",
    transition: "all 0.2s", letterSpacing: "0.08em",
  },

  // ── Complete ──
  completeWrap: {
    flex: 1, display: "flex", alignItems: "center",
    justifyContent: "center", padding: "2rem",
  },
  completeCard: {
    maxWidth: 600, textAlign: "center",
    background: "rgba(8,18,50,0.82)", backdropFilter: "blur(30px)",
    border: "1px solid rgba(80,140,255,0.25)", borderRadius: 22,
    padding: "3.5rem 3rem",
    animation: "fadeUp 0.6s ease, glowPulse 4s infinite",
    fontFamily: "inherit",
  },
  completeBadge: {
    display: "inline-block", padding: "0.38rem 1.15rem", marginBottom: "0.85rem",
    background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.3)",
    borderRadius: 20, fontSize: "0.75rem", color: "#00e676",
    letterSpacing: "0.2em", fontFamily: "inherit",
  },
  completeTitle: {
    fontFamily: "inherit", fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
    fontWeight: 800, color: "#fff", marginBottom: "0.95rem", lineHeight: 1.2,
  },
  completeSub: {
    fontFamily: "inherit", fontSize: "1rem",
    color: "rgba(160,200,255,0.72)", lineHeight: 1.88, marginBottom: "2rem",
  },
  statsRow: {
    display: "flex", justifyContent: "center", gap: "2.5rem",
    marginBottom: "2rem", padding: "1.2rem",
    background: "rgba(255,255,255,0.03)", borderRadius: 13,
    border: "1px solid rgba(60,120,255,0.09)",
  },
  statVal: {
    fontFamily: "inherit", fontSize: "1.8rem",
    color: "#4a9eff", fontWeight: 800,
  },
  statLabel: {
    fontFamily: "inherit", fontSize: "0.7rem",
    color: "rgba(140,180,255,0.5)", letterSpacing: "0.1em", marginTop: "0.25rem",
  },
  restartBtn: {
    padding: "0.95rem 3rem", borderRadius: 40,
    background: "linear-gradient(135deg, #1a4fff, #6030ff)",
    border: "none", color: "#fff", fontFamily: "inherit",
    fontSize: "0.88rem", letterSpacing: "0.18em", fontWeight: 700,
    cursor: "pointer", transition: "all 0.25s",
    boxShadow: "0 0 28px rgba(100,100,255,0.4)",
  },
};
