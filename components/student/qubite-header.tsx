"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, LogOut, User, Settings, Check } from "lucide-react";
import { NotificationBell } from "@/components/shared/notification-bell";
import { logoutAction } from "@/app/actions/auth-actions";
import { Notification, Profile } from "@/lib/types/database";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QubiteHeaderProps {
  user: Profile | null;
  notifications?: Notification[];
}

export function QubiteHeader({ user, notifications = [] }: QubiteHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchResults = [
    { title: "Weekly Menu", href: "/student/menu", desc: "View all 7 days of meals" },
    { title: "Meal Opt-in & Attendance", href: "/student/my-meals", desc: "Declare Yes/No for upcoming meals" },
    { title: "Raise a Complaint", href: "/student/complaints", desc: "Submit food quality or hygiene issues" },
    { title: "Wallet Recharge", href: "/student/payments", desc: "Top up your dining balance" },
    { title: "Submit Meal Feedback", href: "/student/feedback", desc: "Rate today's served food 1-5 stars" },
  ].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-20 bg-brand-cream border-b border-brand-border px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Large Search Bar */}
      <div className="w-full max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search anything (meals, complaints, wallet)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            className="w-full h-11 pl-11 pr-4 bg-white border border-brand-border rounded-2xl text-xs text-brand-dark placeholder:text-zinc-400 shadow-subtle focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-all"
          />

          {/* Quick Search Autocomplete Results */}
          {searchOpen && searchQuery.trim().length > 0 && (
            <div
              className="absolute left-0 right-0 top-13 bg-white border border-brand-border rounded-2xl shadow-floating p-2 z-50 space-y-1 animate-in fade-in-0 duration-150"
              onMouseLeave={() => setSearchOpen(false)}
            >
              {searchResults.length === 0 ? (
                <div className="p-3 text-center text-xs text-zinc-400">
                  No matching pages or dishes found.
                </div>
              ) : (
                searchResults.map((res, i) => (
                  <Link
                    key={i}
                    href={res.href}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex flex-col p-2.5 rounded-xl hover:bg-brand-cream transition-colors"
                  >
                    <span className="text-xs font-bold text-brand-dark">{res.title}</span>
                    <span className="text-[11px] text-zinc-400">{res.desc}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Notification Bell + Student Profile Avatar & Role */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Component */}
        <div className="bg-white rounded-2xl border border-brand-border p-1 shadow-subtle">
          <NotificationBell notifications={notifications} />
        </div>

        {/* Profile Card & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-3 bg-white border border-brand-border p-1.5 pr-3 rounded-2xl shadow-subtle hover:border-zinc-300 transition-colors focus:outline-none"
          >
            <div className="h-9 w-9 rounded-xl overflow-hidden bg-brand-yellow/30 border border-brand-yellow/50 flex items-center justify-center font-bold text-xs text-brand-dark">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{user?.full_name?.charAt(0) || "S"}</span>
              )}
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-brand-dark leading-tight">
                {user?.full_name || "Aarav Sharma"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Role:
                </span>
                <span className="text-[10px] font-bold text-brand-dark bg-brand-yellow px-1.5 py-0.2 rounded-md">
                  Student
                </span>
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-1 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div
              className="absolute right-0 top-14 w-52 bg-white border border-brand-border rounded-2xl shadow-floating p-2 z-50 space-y-1"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="p-3 border-b border-brand-border">
                <p className="text-xs font-bold text-brand-dark">{user?.full_name}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                <p className="text-[10px] font-mono text-brand-yellowHover font-bold mt-1">
                  Roll: {user?.roll_number || "2024CS001"}
                </p>
              </div>

              <Link
                href="/student/profile"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-brand-cream rounded-xl transition-colors"
              >
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/student/settings"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-brand-cream rounded-xl transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>Account Settings</span>
              </Link>

              <div className="pt-1 border-t border-brand-border">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
