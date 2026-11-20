"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, Wallet, Star, AlertCircle, ArrowUpRight, Plus } from "lucide-react";
import { TopUpModal } from "@/components/student/topup-modal";

interface QubiteStatCardsProps {
  walletBalance?: number;
  pendingComplaintsCount?: number;
}

export function QubiteStatCards({
  walletBalance = 450,
  pendingComplaintsCount = 1,
}: QubiteStatCardsProps) {
  const [topUpOpen, setTopUpOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* CARD 1 – MEALS THIS MONTH */}
        <div className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Meals This Month
            </span>
            <div className="h-10 w-10 rounded-2xl bg-brand-softOrange text-brand-dark flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-amber-700" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
              18 <span className="text-base text-zinc-400 font-semibold">/ 22</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Scheduled mess meals consumed</p>
          </div>

          {/* Yellow Progress Bar: 82% */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-zinc-500">Attendance Rate</span>
              <span className="text-brand-dark">82%</span>
            </div>
            <div className="h-2 w-full bg-[#F5EFE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                style={{ width: "82%" }}
              />
            </div>
          </div>
        </div>

        {/* CARD 2 – CURRENT BALANCE */}
        <div className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Current Balance
            </span>
            <div className="h-10 w-10 rounded-2xl bg-brand-softGreen text-emerald-800 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-700" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
              ₹{walletBalance}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ● Active Dining Credit
            </p>
          </div>

          <button
            onClick={() => setTopUpOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-brand-dark hover:bg-black text-brand-yellow text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Top Up</span>
          </button>
        </div>

        {/* CARD 3 – AVERAGE RATING */}
        <div className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Average Rating
            </span>
            <div className="h-10 w-10 rounded-2xl bg-brand-softPurple text-purple-800 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-700 fill-purple-700" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight flex items-baseline gap-1">
              4.6 <span className="text-base text-zinc-400 font-semibold">/ 5</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+0.2 vs last week</span>
            </div>
          </div>

          <Link
            href="/student/feedback"
            className="w-full py-2 px-3 rounded-xl bg-[#F5EFE6] hover:bg-brand-yellow/30 text-brand-dark text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            Rate Served Food
          </Link>
        </div>

        {/* CARD 4 – PENDING COMPLAINTS */}
        <div className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Pending Complaints
            </span>
            <div className="h-10 w-10 rounded-2xl bg-brand-softRed text-red-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>

          <div className="my-3">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
              {pendingComplaintsCount}
            </div>
            <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
              Ticket #C-104 In Progress
            </p>
          </div>

          <Link
            href="/student/complaints"
            className="w-full py-2 px-3 rounded-xl bg-[#F5EFE6] hover:bg-brand-softRed text-brand-dark text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            View Ticket Status
          </Link>
        </div>
      </div>

      {/* Top Up Modal */}
      <TopUpModal open={topUpOpen} onOpenChange={setTopUpOpen} currentBalance={walletBalance} />
    </>
  );
}
