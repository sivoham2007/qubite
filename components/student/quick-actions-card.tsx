"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, AlertCircle, Wallet, Star } from "lucide-react";
import { TopUpModal } from "@/components/student/topup-modal";
import { ComplaintModal } from "@/components/student/complaint-modal";
import { toast } from "sonner";

export function QuickActionsCard() {
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);

  const handleMarkMealToday = () => {
    toast.success("Today's dinner meal is marked as Attending! Kitchen informed.");
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-brand-dark tracking-tight">
            Quick Actions
          </h3>
          <p className="text-[11px] text-zinc-400">Frequently used hostel mess shortcuts</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Action 1: Mark Meal */}
          <button
            onClick={handleMarkMealToday}
            className="p-4 rounded-2xl bg-brand-softYellow hover:bg-[#ffe3b5] border border-amber-200/50 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="h-10 w-10 rounded-xl bg-white text-amber-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-950">
              Mark Meal (Today)
            </span>
          </button>

          {/* Action 2: Raise Complaint */}
          <button
            onClick={() => setComplaintOpen(true)}
            className="p-4 rounded-2xl bg-brand-softPurple hover:bg-[#ded4ff] border border-purple-200/50 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="h-10 w-10 rounded-xl bg-white text-purple-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-950">
              Raise Complaint
            </span>
          </button>

          {/* Action 3: Top Up Wallet */}
          <button
            onClick={() => setTopUpOpen(true)}
            className="p-4 rounded-2xl bg-brand-softGreen hover:bg-[#c9efdb] border border-emerald-200/50 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="h-10 w-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-950">
              Top Up Wallet
            </span>
          </button>

          {/* Action 4: Give Feedback */}
          <Link
            href="/student/feedback"
            className="p-4 rounded-2xl bg-[#FFE4D6] hover:bg-[#ffd6c2] border border-orange-200/50 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="h-10 w-10 rounded-xl bg-white text-orange-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-orange-700" />
            </div>
            <span className="text-xs font-bold text-orange-950">
              Give Feedback
            </span>
          </Link>
        </div>
      </div>

      <TopUpModal open={topUpOpen} onOpenChange={setTopUpOpen} currentBalance={450} />
      <ComplaintModal open={complaintOpen} onOpenChange={setComplaintOpen} />
    </>
  );
}
