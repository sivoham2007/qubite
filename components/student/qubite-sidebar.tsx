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
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QubiteLogo } from "@/components/shared/qubite-logo";

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
    <aside className="w-64 fixed/sticky h-screen bg-slate-900 text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800 shrink-0 sticky top-0 select-none z-40">
      {/* Top Brand Header */}
      <div>
        <div className="p-2 pb-4">
          <Link href="/student/dashboard" className="flex items-center gap-3 group">
            <QubiteLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-xl text-white tracking-tight">
                  QuBite
                </h1>
                <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded">
                  MESSMATE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Eat • Track • Manage
              </p>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation Menu */}
        <nav className="px-1 py-1 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {navItems.map((item) => {
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
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-amber-400 text-slate-950 font-semibold rounded-xl shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors shrink-0",
                      isActive
                        ? "text-slate-950 stroke-[2.5]"
                        : "text-slate-400 group-hover:text-amber-400"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && unreadNotifsCount > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                      isActive ? "bg-slate-950 text-amber-400" : "bg-amber-400 text-slate-950"
                    )}
                  >
                    {unreadNotifsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Need Assistance Support Card */}
      <div className="p-1 pt-2">
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 space-y-2 text-slate-300">
          <div className="flex items-center gap-2 text-amber-400">
            <Headphones className="w-4 h-4" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Need Assistance?
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Contact your warden or hostel catering representative anytime.
          </p>
          <div className="pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-semibold text-white">Central Mess Hall 1</span>
            <span className="text-amber-400 font-mono font-bold">Ext. 204</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
