"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  UtensilsCrossed,
  Star,
  AlertCircle,
  CreditCard,
  Bell,
  User,
  Settings,
  HelpCircle,
  Utensils,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QubiteSidebarProps {
  unreadNotifsCount?: number;
}

const navItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/menu", label: "Weekly Menu", icon: Calendar },
  { href: "/student/my-meals", label: "My Meals", icon: UtensilsCrossed },
  { href: "/student/feedback", label: "Feedback", icon: Star },
  { href: "/student/complaints", label: "Complaints", icon: AlertCircle },
  { href: "/student/payments", label: "Payments", icon: CreditCard },
  { href: "/student/notifications", label: "Notifications", icon: Bell, badge: true },
  { href: "/student/profile", label: "Profile", icon: User },
  { href: "/student/settings", label: "Settings", icon: Settings },
];

export function QubiteSidebar({ unreadNotifsCount = 0 }: QubiteSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-black text-white flex flex-col min-h-screen border-r border-[#222222] shrink-0 sticky top-0 h-screen select-none">
      {/* Brand Header */}
      <div className="p-6 pb-5">
        <Link href="/student/dashboard" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-2xl bg-brand-yellow text-brand-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Utensils className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-xl text-white tracking-tight">
                QuBite
              </h1>
              <span className="text-[10px] font-bold uppercase bg-brand-yellow/20 text-brand-yellow px-1.5 py-0.5 rounded">
                MESSMATE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
              Eat • Track • Manage
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          // Exact or nested active state
          const isActive =
            pathname === item.href ||
            (item.href === "/student/my-meals" && pathname === "/student/meal-plans") ||
            (item.href === "/student/feedback" && pathname === "/student/ratings");

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group",
                isActive
                  ? "bg-brand-yellow text-brand-black shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/80"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-[18px] h-[18px] transition-colors",
                    isActive
                      ? "text-brand-black stroke-[2.5]"
                      : "text-zinc-400 group-hover:text-brand-yellow"
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && unreadNotifsCount > 0 && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-black text-white" : "bg-brand-yellow text-brand-black"
                  )}
                >
                  {unreadNotifsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Help and Support Card */}
      <div className="p-4 pt-2">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#202020] to-[#181818] border border-zinc-800/80 text-zinc-300 space-y-2">
          <div className="flex items-center gap-2 text-brand-yellow">
            <Headphones className="w-4 h-4" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Need Assistance?
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-snug">
            Contact your warden or hostel catering representative anytime.
          </p>
          <div className="pt-1 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-semibold text-white">Central Mess Hall 1</span>
            <span className="text-brand-yellow font-mono">Ext. 204</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
