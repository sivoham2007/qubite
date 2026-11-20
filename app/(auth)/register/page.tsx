"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Utensils, Lock, Mail, User, Hash, Building2, DoorClosed, ArrowRight } from "lucide-react";
import { registerStudentAction } from "@/app/actions/auth-actions";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [hostelBlock, setHostelBlock] = useState("Block A");
  const [roomNumber, setRoomNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const res = await registerStudentAction({
      full_name: fullName.trim(),
      email: email.trim(),
      roll_number: rollNumber.trim().toUpperCase(),
      hostel_block: hostelBlock,
      room_number: roomNumber.trim(),
      password,
      confirm_password: confirmPassword,
    });

    setLoading(false);

    if (res.success) {
      router.push("/student/dashboard");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-brand-cream py-10">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-yellow text-brand-black shadow-md hover:scale-105 transition-transform">
            <Utensils className="h-7 w-7 stroke-[2.5]" />
          </Link>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            QuBite Student Registration
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            M. S. Ramaiah University of Applied Sciences (MSRUAS)
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] font-bold text-amber-900 shadow-xs">
              🏛️ University Access Only (@msruas.ac.in)
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-brand-border p-7 shadow-floating space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-brand-dark">Register as Student</h2>
              <p className="text-xs text-zinc-400">
                Official @msruas.ac.in student dining access registration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Aarav Sharma"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">MSRUAS Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="student@msruas.ac.in"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Roll Number</label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="2024CS099"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark uppercase font-mono focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Hostel Block</label>
                <select
                  value={hostelBlock}
                  onChange={(e) => setHostelBlock(e.target.value)}
                  className="w-full h-10 rounded-xl border border-brand-border bg-white px-3 text-xs font-medium text-brand-dark"
                >
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                  <option value="Block C">Block C</option>
                  <option value="Block D">Block D</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Room No</label>
                <div className="relative">
                  <DoorClosed className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="204"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-brand-border text-xs text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
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
              {loading ? "Creating Account..." : "Create Student Account"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-zinc-500 pt-1">
              Already have an account?{" "}
              <Link href="/login" className="font-extrabold text-brand-dark hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
