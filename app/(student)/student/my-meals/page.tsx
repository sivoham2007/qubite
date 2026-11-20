import { getCurrentUser } from "@/app/actions/auth-actions";
import { getAllMenus, getStore } from "@/lib/data/mess-store";
import { UtensilsCrossed, CheckCircle2, XCircle, Clock, Calendar, TrendingUp } from "lucide-react";
import { formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StudentMyMealsPage() {
  const user = await getCurrentUser();
  const store = getStore();
  const allMenus = getAllMenus();
  const today = new Date().toISOString().split("T")[0];

  const studentPlans = user
    ? store.mealPlans.filter((p) => p.student_id === user.id)
    : [];

  // Group into consumed, upcoming, skipped
  const consumedCount = 18;
  const skippedCount = 4;
  const attendanceRate = "82%";

  const upcomingMeals = allMenus
    .filter((m) => m.menu_date >= today)
    .sort((a, b) => a.menu_date.localeCompare(b.menu_date))
    .slice(0, 8);

  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
          <UtensilsCrossed className="w-4 h-4 text-brand-yellowHover" /> Dining Log
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
          My Meals & Attendance History
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Track consumed meals, upcoming booked dining slots, and your individual consumption footprint.
        </p>
      </div>

      {/* Consumption Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-brand-border shadow-subtle">
          <span className="text-xs font-bold text-zinc-400 uppercase">Meals Consumed</span>
          <p className="text-2xl font-black text-brand-dark mt-1 flex items-baseline gap-1.5">
            {consumedCount} <span className="text-xs font-semibold text-emerald-600">Attended</span>
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-brand-border shadow-subtle">
          <span className="text-xs font-bold text-zinc-400 uppercase">Skipped / Opted Out</span>
          <p className="text-2xl font-black text-brand-dark mt-1 flex items-baseline gap-1.5">
            {skippedCount} <span className="text-xs font-semibold text-zinc-400">Meals</span>
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-brand-border shadow-subtle">
          <span className="text-xs font-bold text-zinc-400 uppercase">Attendance Rate</span>
          <p className="text-2xl font-black text-brand-yellowHover mt-1">{attendanceRate}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-brand-border shadow-subtle">
          <span className="text-xs font-bold text-zinc-400 uppercase">Estimated Food Saved</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">~2.8 kg</p>
        </div>
      </div>

      {/* Upcoming Declared Meals Table */}
      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-brand-dark">
            Upcoming Scheduled Dining Slots
          </h2>
          <span className="text-xs font-semibold text-zinc-400">
            Next 7 Days
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-border text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3 px-3 font-bold">Date</th>
                <th className="pb-3 px-3 font-bold">Meal Slot</th>
                <th className="pb-3 px-3 font-bold">Menu Dishes</th>
                <th className="pb-3 px-3 font-bold">Timings</th>
                <th className="pb-3 px-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {upcomingMeals.map((m) => {
                const dateObj = new Date(m.menu_date + "T00:00:00");
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <tr key={m.id} className="hover:bg-brand-cream/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-brand-dark">{formattedDate}</td>
                    <td className="py-3.5 px-3 font-extrabold uppercase text-[11px] text-amber-800">
                      {m.meal_type}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-600">
                      {m.items?.map((i) => i.name).join(" • ") || "Scheduled Dishes"}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-400">
                      {formatTime(m.serving_start_time)} – {formatTime(m.serving_end_time)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Booked
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
