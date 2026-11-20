"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  Scale,
  Star,
  BarChart3,
  Sparkles,
  ShoppingBag,
  ChefHat,
  Settings,
  LogOut,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth-actions";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menus", label: "Menu Management", icon: UtensilsCrossed },
  { href: "/admin/attendance", label: "Attendance Headcount", icon: Users },
  { href: "/admin/food-records", label: "Wastage & Food Records", icon: Scale },
  { href: "/admin/ratings", label: "Ratings & Feedback", icon: Star },
  { href: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
  { href: "/admin/ai-insights", label: "AI Insights & Demand", icon: Sparkles },
  { href: "/admin/groceries", label: "Grocery Stock", icon: ShoppingBag },
  { href: "/admin/recipes", label: "Recipe Matching", icon: ChefHat },
  { href: "/admin/settings", label: "Mess Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-black text-white flex flex-col min-h-screen border-r border-[#222222] shrink-0 sticky top-0 h-screen select-none">
      {/* Brand Header */}
      <div className="p-6 pb-5">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-2xl bg-brand-yellow text-brand-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Utensils className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-xl text-white tracking-tight">
                QuBite
              </h1>
              <span className="text-[10px] font-bold uppercase bg-brand-yellow/20 text-brand-yellow px-1.5 py-0.5 rounded">
                ADMIN
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
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group",
                isActive
                  ? "bg-brand-yellow text-brand-black shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/80"
              )}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] transition-colors",
                  isActive
                    ? "text-brand-black stroke-[2.5]"
                    : "text-zinc-400 group-hover:text-brand-yellow"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Sign out */}
      <div className="p-4 pt-2">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-zinc-400 hover:text-red-400 hover:bg-zinc-900/80 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
