"use client";

import Link from "next/link";
import { ChefHat, ArrowRight, Sparkles } from "lucide-react";

export function PromotionalBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-black text-white p-6 md:p-8 border border-zinc-800 shadow-floating flex flex-col justify-between min-h-[220px]">
      {/* Decorative Yellow Circles and Glow */}
      <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-brand-yellow/15 blur-2xl pointer-events-none" />
      <div className="absolute right-36 bottom-0 w-24 h-24 rounded-full bg-brand-yellow/10 blur-xl pointer-events-none" />

      {/* Background Food Artwork with Soft Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden opacity-35 sm:opacity-50 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&auto=format&fit=crop&q=80"
          alt="Traditional Indian Meal"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-[11px] font-extrabold uppercase tracking-wider border border-brand-yellow/30">
          <ChefHat className="w-3.5 h-3.5" /> Chef&apos;s Special Today
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            Enjoy your meals!
          </h3>
          <p className="text-xs md:text-sm text-zinc-300 font-medium mt-1">
            Healthy food. Happy you.
          </p>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed pr-6">
          Nutritionally balanced ingredients cooked fresh daily with minimal spices and low oil.
        </p>
      </div>

      {/* Button */}
      <div className="relative z-10 pt-4">
        <Link
          href="/student/menu"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-extrabold transition-all hover:gap-3 shadow-md"
        >
          <span>Explore Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
