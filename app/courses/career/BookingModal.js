"use client";
import { useState, useEffect } from "react";

const TIME_SLOTS = [
  "09:00 – 10:00 AM",
  "11:00 AM – 12:00 PM",
  "02:00 – 03:00 PM",
  "04:00 – 05:00 PM",
  "06:00 – 07:00 PM",
];
const STREAM_OPTS = ["CSE", "ECE", "AIML", "Mechanical", "Civil", "Data Science", "Not sure yet"];

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{
        fontSize: "0.68rem", letterSpacing: "0.1em",
        color: "rgba(175,200,255,0.5)",
      }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: "0.68rem", color: "#ff7a7a" }}>{error}</span>}
    </div>
  );
}

export default function BookingModal({ onClose }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", stream: "", slot: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 12);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(onClose, 350);
  };

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.stream) errs.stream = "Please select";
    if (!form.slot) errs.slot = "Please pick a time";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  };

  const inputStyle = (err) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${err ? "rgba(255,120,120,0.5)" : "rgba(60,100,200,0.22)"}`,
    borderRadius: "10px",
    padding: "0.78rem 1rem",
    color: "rgba(215,230,255,0.9)",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && close()}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div style={{
        position: "relative",
        background: "rgba(7,13,38,0.97)",
        backdropFilter: "blur(32px)",
        border: "1px solid rgba(74,158,255,0.22)",
        borderRadius: "22px",
        padding: "2.8rem 2.5rem",
        maxWidth: 500, width: "100%",
        maxHeight: "90vh", overflowY: "auto",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        boxShadow: "0 0 0 1px rgba(74,158,255,0.1), 0 30px 100px rgba(0,0,20,0.7)",
      }}>
        {/* Close */}
        <button
          onClick={close}
          style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(175,200,255,0.5)", cursor: "pointer",
            fontSize: "0.8rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,80,80,0.15)"; e.currentTarget.style.color = "#ff8888"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(175,200,255,0.5)"; }}
        >✕</button>

        {!done ? (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "0.65rem" }}>🎓</div>
              <h2 style={{
                fontSize: "1.45rem", fontWeight: 900, color: "#fff",
                marginBottom: "0.4rem", letterSpacing: "-0.01em",
              }}>Book an Expert Session</h2>
              <p style={{
                fontSize: "0.84rem", color: "rgba(175,200,255,0.5)",
                lineHeight: 1.6,
              }}>Get personalized guidance from an industry professional.</p>
            </div>

            {/* Form */}
            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

              <Field label="FULL NAME" error={errors.name}>
                <input
                  style={inputStyle(errors.name)}
                  type="text" placeholder="Your full name"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  onFocus={e => { e.target.style.borderColor = "rgba(74,158,255,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(74,158,255,0.07)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? "rgba(255,120,120,0.5)" : "rgba(60,100,200,0.22)"; e.target.style.boxShadow = "none"; }}
                />
              </Field>

              <Field label="EMAIL ADDRESS" error={errors.email}>
                <input
                  style={inputStyle(errors.email)}
                  type="email" placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  onFocus={e => { e.target.style.borderColor = "rgba(74,158,255,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(74,158,255,0.07)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? "rgba(255,120,120,0.5)" : "rgba(60,100,200,0.22)"; e.target.style.boxShadow = "none"; }}
                />
              </Field>

              <Field label="STREAM OF INTEREST" error={errors.stream}>
                <select
                  style={{ ...inputStyle(errors.stream), appearance: "none" }}
                  value={form.stream}
                  onChange={e => set("stream", e.target.value)}
                >
                  <option value="" style={{ background: "#0d1428" }}>Select a stream…</option>
                  {STREAM_OPTS.map(s => <option key={s} value={s} style={{ background: "#0d1428" }}>{s}</option>)}
                </select>
              </Field>

              <Field label="PREFERRED TIME SLOT" error={errors.slot}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot} type="button"
                      onClick={() => set("slot", slot)}
                      style={{
                        padding: "0.6rem 0.5rem",
                        borderRadius: "8px", cursor: "pointer",
                        background: form.slot === slot ? "rgba(74,158,255,0.13)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${form.slot === slot ? "rgba(74,158,255,0.5)" : "rgba(60,100,200,0.18)"}`,
                        color: form.slot === slot ? "#4a9eff" : "rgba(175,200,255,0.55)",
                        fontSize: "0.7rem", transition: "all 0.2s",
                        fontFamily: "inherit",
                        fontWeight: form.slot === slot ? 600 : 400,
                      }}
                    >{slot}</button>
                  ))}
                </div>
              </Field>

              <button
                type="submit"
                style={{
                  width: "100%", padding: "1rem",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #1a4fff, #6030ff)",
                  border: "none", color: "#fff",
                  fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.14em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  boxShadow: "0 6px 24px rgba(80,60,255,0.35)",
                  transition: "all 0.25s",
                  marginTop: "0.4rem",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 36px rgba(80,60,255,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(80,60,255,0.35)"; e.currentTarget.style.transform = "none"; }}
              >
                <span>Confirm Booking</span>
                <span>→</span>
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{ fontSize: "3rem", color: "#00e676", marginBottom: "1rem", animation: "tp-pop 0.5s ease" }}>✦</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", marginBottom: "0.7rem", letterSpacing: "-0.01em" }}>You&apos;re Booked!</h2>
            <p style={{ fontSize: "0.88rem", color: "rgba(175,200,255,0.6)", lineHeight: 1.75, marginBottom: "1rem" }}>
              We&apos;ve received your request, <strong style={{ color: "#fff" }}>{form.name}</strong>.<br />
              A confirmation will be sent to <strong style={{ color: "#fff" }}>{form.email}</strong>.
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.4rem 1rem", borderRadius: "20px",
              background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.25)",
              fontSize: "0.76rem", color: "#4a9eff", marginBottom: "1.8rem",
            }}>
              <span>🕐</span> {form.slot} · {form.stream}
            </div>
            <br />
            <button
              onClick={close}
              style={{
                padding: "0.85rem 2.5rem", borderRadius: "50px",
                background: "linear-gradient(135deg, #1a4fff, #6030ff)",
                border: "none", color: "#fff",
                fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.12em",
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 6px 24px rgba(80,60,255,0.3)",
              }}
            >Done ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}
