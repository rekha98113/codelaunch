"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default function Navbar() {
  const [user, setUser] = useState(null);

  // 🔹 Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Logout handler
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-400">
          CodeLaunch 🚀
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm items-center">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
        
          <Link href="/practice">Practice</Link>
          <Link href="/dashboard">Dashboard</Link>
        
          {/* 🔹 If user logged in */}
          {user ? (
            <>
              <span className="text-green-400 text-xs">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}