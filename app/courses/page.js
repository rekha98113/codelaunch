"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Courses() {
  const router = useRouter();

  const cardStyle =
    "bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition duration-300";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0F172A] text-white px-6 py-20">

      {/* 3D PARTICLES */}
      <ParticlesBackground />

      {/* HERO TITLE */}
      <h1 className="relative z-10 text-5xl font-bold text-center mb-20 tracking-wide">
        Choose Your Growth Path 🚀
      </h1>

      {/* COURSE CARDS */}
      <div className="relative z-10 grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">

        {/* LOGICFORGE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            LogicForge
          </h2>
          <p className="text-gray-300 mb-6">
            Build algorithmic thinking, master core fundamentals,
            and think like a real developer.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/courses/coding")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/booking")}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Workshop
            </button>
          </div>
        </motion.div>

        {/* TECHPATH */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            TechPath
          </h2>
          <p className="text-gray-300 mb-6">
            Understand engineering branches, career impact,
            and explore real-world opportunities.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/courses/career")}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/booking")}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Session
            </button>
          </div>
        </motion.div>

        {/* FUTURESTACK */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold text-pink-400 mb-4">
            FutureStack
          </h2>
          <p className="text-gray-300 mb-6">
            Learn AI tools, automation workflows,
            and future-ready productivity systems.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/courses/ai")}
              className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
            >
              Explore
            </button>

            <button
              onClick={() => router.push("/booking")}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Workshop
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}