import { getCurrentUser } from "@/app/actions/auth-actions";
import { getAllMenus, getStore } from "@/lib/data/mess-store";
import { StarRating } from "@/components/shared/star-rating";
import { RateMealDialog } from "@/components/student/rate-meal-dialog";
import { Star, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentFeedbackPage() {
  const user = await getCurrentUser();
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  const studentRatings = user
    ? store.ratings.filter((r) => r.student_id === user.id)
    : [];

  const pastMenus = getAllMenus()
    .filter((m) => m.menu_date <= today)
    .sort((a, b) => b.menu_date.localeCompare(a.menu_date))
    .slice(0, 10);

  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
          <Star className="w-4 h-4 text-brand-yellowHover fill-brand-yellow" /> Dining Feedback
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
          Meal Ratings & Culinary Feedback
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Share your ratings for breakfast, lunch, snacks, and dinner to refine kitchen recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Served Meals Ready for Rating */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-extrabold text-brand-dark">
            Recent Meals Served
          </h2>

          <div className="space-y-3">
            {pastMenus.map((menu) => {
              const existingRating = studentRatings.find((r) => r.menu_id === menu.id);
              const dateObj = new Date(menu.menu_date + "T00:00:00");
              const formattedDate = dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={menu.id}
                  className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle hover:border-zinc-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-brand-dark capitalize text-sm">
                        {menu.meal_type}
                      </span>
                      <span className="text-xs text-zinc-400">• {formattedDate}</span>
                    </div>
                    <p className="text-xs text-zinc-600">
                      {menu.items?.map((i) => i.name).join(" • ") || "Assorted dishes"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-brand-border">
                    {existingRating ? (
                      <div className="flex flex-col items-end">
                        <StarRating value={existingRating.rating} readOnly size="sm" />
                        <span className="text-[10px] text-zinc-400 mt-0.5">Your Rating</span>
                      </div>
                    ) : (
                      <RateMealDialog menu={menu} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating History */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-brand-dark">
            Your Previous Reviews
          </h2>

          <div className="bg-white rounded-3xl p-5 border border-brand-border shadow-subtle space-y-3">
            {studentRatings.length === 0 ? (
              <p className="text-xs text-zinc-400 py-6 text-center">
                You haven&apos;t reviewed any meals yet.
              </p>
            ) : (
              studentRatings.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-2xl bg-brand-cream border border-brand-border space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <StarRating value={r.rating} readOnly size="sm" />
                    <span className="text-[10px] text-zinc-400">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comment && (
                    <p className="text-xs text-zinc-700 italic flex items-start gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                      &quot;{r.comment}&quot;
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
