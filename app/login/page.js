"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  // ✅ STATE (this was missing / broken)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 🔹 Signup
  const handleSignup = async () => {
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // 🔹 Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "white",
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        CodeLaunch Auth 🚀
      </h1>

      <input
        style={{ padding: "12px", border: "2px solid black", width: "250px" }}
        placeholder="EMAIL HERE"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={{ padding: "12px", border: "2px solid black", width: "250px" }}
        type="password"
        placeholder="PASSWORD HERE"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={handleSignup}
          style={{ padding: "10px 20px", background: "blue", color: "white" }}
        >
          SIGN UP
        </button>

        <button
          onClick={handleLogin}
          style={{ padding: "10px 20px", background: "green", color: "white" }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}