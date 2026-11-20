"use client";

import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, Wallet, Utensils, AlertCircle } from "lucide-react";
import { ActivityItem } from "@/lib/types/database";

interface RecentActivityCardProps {
  activities?: ActivityItem[];
}

export function RecentActivityCard({ activities = [] }: RecentActivityCardProps) {
  const defaultActivities: ActivityItem[] = [
    {
      id: "act-1",
      title: "Meal marked for today",
      timestamp: "2 mins ago",
      type: "meal",
    },
    {
      id: "act-2",
      title: "Wallet recharged with ₹500",
      timestamp: "1 hour ago",
      type: "wallet",
    },
    {
      id: "act-3",
      title: "New menu updated for dinner",
      timestamp: "3 hours ago",
      type: "menu",
    },
    {
      id: "act-4",
      title: "Complaint #C-104 updated to In Progress",
      timestamp: "Yesterday",
      type: "complaint",
    },
  ];

  const list = activities.length > 0 ? activities : defaultActivities;

  const typeConfig: Record<string, { bg: string; dot: string; icon: any }> = {
    meal: { bg: "bg-brand-softYellow", dot: "bg-amber-500", icon: Utensils },
    wallet: { bg: "bg-brand-softGreen", dot: "bg-emerald-500", icon: Wallet },
    menu: { bg: "bg-brand-softPurple", dot: "bg-purple-500", icon: CheckCircle2 },
    complaint: { bg: "bg-brand-softRed", dot: "bg-red-500", icon: AlertCircle },
    feedback: { bg: "bg-[#FFE4D6]", dot: "bg-orange-500", icon: CheckCircle2 },
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-base text-brand-dark tracking-tight">
            Recent Activity
          </h3>
          <p className="text-[11px] text-zinc-400">Your latest mess events & logs</p>
        </div>

        <Link
          href="/student/notifications"
          className="text-xs font-bold text-brand-dark hover:text-amber-600 flex items-center gap-1 group transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-4 my-2 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-brand-border">
        {list.slice(0, 4).map((item) => {
          const cfg = typeConfig[item.type] || typeConfig.meal;
          const Icon = cfg.icon;

          return (
            <div key={item.id} className="relative flex items-start gap-3 group">
              {/* Timeline Indicator Dot */}
              <span
                className={`absolute -left-[23px] top-1.5 h-3 w-3 rounded-full ${cfg.dot} ring-4 ring-white shadow-xs`}
              />

              <div className="flex-1 space-y-0.5">
                <p className="text-xs font-bold text-brand-dark leading-tight group-hover:text-amber-800 transition-colors">
                  {item.title}
                </p>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-zinc-400" /> {item.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-brand-border text-center">
        <span className="text-[10px] text-zinc-400">
          Showing real-time student dining activities
        </span>
      </div>
    </div>
  );
}
