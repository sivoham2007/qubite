import { getCurrentUser } from "@/app/actions/auth-actions";
import {
  getAllMenus,
  getStore,
  getRecentActivities,
  getComplaintsFromStore,
} from "@/lib/data/mess-store";
import { QubiteStatCards } from "@/components/student/qubite-stat-card";
import { TodaysMenuCard } from "@/components/student/todays-menu-card";
import { MealAttendanceChart } from "@/components/student/attendance-chart";
import { QuickActionsCard } from "@/components/student/quick-actions-card";
import { RecentActivityCard } from "@/components/student/recent-activity-card";
import { PromotionalBanner } from "@/components/student/promotional-banner";
import { Calendar as CalendarIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  const store = getStore();
  const todayStr = new Date().toISOString().split("T")[0];

  const todayMenus = getAllMenus(todayStr);
  const activities = getRecentActivities();
  const complaints = user ? getComplaintsFromStore(user.id) : [];
  const pendingComplaints = complaints.filter((c) => c.status !== "Resolved").length;

  // Time-of-day dynamic greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const studentFirstName = user?.full_name?.split(" ")[0] || "Aarav";

  // Date and Week metrics
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Calculate day of year & approximate week of year
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayNumber = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil(dayNumber / 7);

  return (
    <div className="space-y-7 pb-6">
      {/* SECTION 3.C: WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-subtle">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            {greeting}, {studentFirstName}! 👋
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 font-medium">
            Here&apos;s what&apos;s happening in your mess today.
          </p>
        </div>

        {/* Right Side: Current Date, Week Number, Day Number */}
        <div className="flex items-center gap-3 bg-brand-cream border border-brand-border px-4 py-2.5 rounded-2xl shrink-0">
          <div className="h-9 w-9 rounded-xl bg-brand-yellow text-brand-black flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-extrabold text-brand-dark leading-tight">
              {formattedDate}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold mt-0.5">
              <span>Week {weekNumber}</span>
              <span>•</span>
              <span>Day {dayNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3.D: STATISTICS CARDS */}
      <QubiteStatCards
        walletBalance={user?.wallet_balance ?? 450}
        pendingComplaintsCount={pendingComplaints > 0 ? pendingComplaints : 1}
      />

      {/* SECTION 3.E: TODAY'S MENU SECTION */}
      <TodaysMenuCard menus={todayMenus} />

      {/* SECTION 3.F & 3.G: MEAL ATTENDANCE & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MealAttendanceChart />
        <QuickActionsCard />
      </div>

      {/* SECTION 3.H & 3.I: RECENT ACTIVITY & PROMOTIONAL BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard activities={activities} />
        <PromotionalBanner />
      </div>
    </div>
  );
}
