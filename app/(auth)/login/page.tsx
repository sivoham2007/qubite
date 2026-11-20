"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Utensils, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await loginAction({ email, password });
    setLoading(false);

    if (res.success) {
      if (res.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/student/dashboard");
      }
      router.refresh();
    } else {
      setErrorMsg(res.error || "Login failed");
    }
  };

  const fillAdmin = () => {
    setEmail("admin@mess.college.edu");
    setPassword("SecureAdminPassword123!");
    setErrorMsg(null);
  };

  const fillStudent = () => {
    setEmail("student1@mess.college.edu");
    setPassword("password123");
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-brand-cream">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-yellow text-brand-black shadow-md hover:scale-105 transition-transform">
            <Utensils className="h-7 w-7 stroke-[2.5]" />
          </Link>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            QuBite <span className="text-amber-500">Portal</span>
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Eat • Track • Manage — MessMate Operations
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-brand-border p-7 shadow-floating space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-brand-dark">Sign In</h2>
              <p className="text-xs text-zinc-400">Enter your university hostel credentials</p>
            </div>

            {/* Quick Demo Autofill Pills */}
            <div className="p-3.5 bg-brand-cream rounded-2xl border border-brand-border space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 block">
                Instant Demo Logins:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fillStudent}
                  className="flex-1 py-2 px-2 bg-white rounded-xl border border-brand-border text-brand-dark hover:bg-brand-yellow text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Student Demo</span>
                </button>
                <button
                  type="button"
                  onClick={fillAdmin}
                  className="flex-1 py-2 px-2 bg-white rounded-xl border border-brand-border text-brand-dark hover:bg-brand-yellow text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Admin Demo</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="student@mess.college.edu"
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-zinc-500 pt-1">
              New resident student?{" "}
              <Link href="/register" className="font-extrabold text-brand-dark hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
