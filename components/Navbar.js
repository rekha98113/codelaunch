import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-400">
          CodeLaunch 🚀
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/practice">Practice</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}