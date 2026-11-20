"use client";

import { useState } from "react";
import { getAllMenus, FOOD_IMAGES } from "@/lib/data/mess-store";
import { formatTime } from "@/lib/utils";
import { Clock, Flame, Sparkles, Check, X, Calendar as CalendarIcon, Info } from "lucide-react";
import { submitMealPlanAction } from "@/app/actions/meal-plan-actions";
import { toast } from "sonner";
import { MealType, Menu } from "@/lib/types/database";
import { DishImageBadge } from "@/components/shared/dish-image-badge";

export default function StudentWeeklyMenuPage() {
  const allMenus = getAllMenus();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [activeDay, setActiveDay] = useState<string>("Wednesday"); // Default to Wednesday
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const mealOrder: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  // Filter or synthesize menus for the active day
  const getDayMeals = (dayName: string) => {
    return mealOrder.map((type) => {
      const meta = FOOD_IMAGES[type];
      const match = allMenus.find(
        (m) =>
          m.meal_type === type &&
          new Date(m.menu_date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" }) === dayName
      );

      return (
        match || {
          id: `menu-${dayName}-${type}`,
          menu_date: new Date().toISOString().split("T")[0],
          meal_type: type,
          cutoff_time: type === "breakfast" ? "06:00:00" : type === "lunch" ? "10:00:00" : type === "snacks" ? "15:30:00" : "17:00:00",
          serving_start_time: type === "breakfast" ? "07:30:00" : type === "lunch" ? "12:30:00" : type === "snacks" ? "17:00:00" : "19:30:00",
          serving_end_time: type === "breakfast" ? "09:30:00" : type === "lunch" ? "14:30:00" : type === "snacks" ? "18:00:00" : "21:30:00",
          is_published: true,
          image_url: meta.url,
          calories: meta.calories,
          special_badge: type === "dinner" && dayName === "Sunday" ? "Grand Feast" : type === "dinner" ? "Chef's Special" : undefined,
          items: [
            { id: "1", menu_id: "m", name: meta.desc.split("+")[0]?.trim() || "Main", category: "main" as const, is_vegetarian: true, image_url: meta.url, description: meta.desc, created_at: "" },
            { id: "2", menu_id: "m", name: meta.desc.split("+")[1]?.trim() || "Accompaniment", category: "side" as const, is_vegetarian: true, image_url: meta.url, description: meta.desc, created_at: "" },
          ],
          expected_attendance: 18,
          created_at: "",
          updated_at: "",
        }
      );
    });
  };

  const handleBooking = async (menuId: string, status: "yes" | "no") => {
    setLoadingId(menuId);
    const res = await submitMealPlanAction({ menu_id: menuId, status });
    setLoadingId(null);

    if (res.success) {
      toast.success(status === "yes" ? "Meal booked successfully!" : "Meal opt-out confirmed.");
    } else {
      toast.error(res.error || "Failed to update meal booking");
    }
  };

  const dayMeals = getDayMeals(activeDay);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
          <CalendarIcon className="w-4 h-4 text-brand-yellowHover" /> Weekly Dining Schedule
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
          Complete Weekly Mess Menu
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Plan your meals across all seven days with nutritional counts and booking cutoffs.
        </p>
      </div>

      {/* Monday to Sunday Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {daysOfWeek.map((day) => {
          const isSelected = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`py-3 px-5 rounded-2xl font-bold text-xs shrink-0 transition-all ${
                isSelected
                  ? "bg-brand-black text-brand-yellow shadow-md scale-[1.02]"
                  : "bg-white text-zinc-600 border border-brand-border hover:bg-brand-cream hover:text-brand-dark"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 4 Meals Grid for Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {dayMeals.map((meal) => {
          const meta = FOOD_IMAGES[meal.meal_type];
          const heroImage = meal.items?.[0]?.image_url || meal.image_url || meta.url;
          const mealTitle = meal.items && meal.items.length > 0 ? meal.items.map(i => i.name).slice(0, 2).join(" + ") : meta.desc;

          return (
            <div
              key={meal.meal_type}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={heroImage}
                    alt={mealTitle}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-brand-black/85 text-brand-yellow">
                      {meta.label}
                    </span>
                  </div>
                  {meal.special_badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5" /> {meal.special_badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[10px] font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-yellow" />
                    <span>
                      {formatTime(meal.serving_start_time)} – {formatTime(meal.serving_end_time)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-brand-dark line-clamp-1">
                      {mealTitle}
                    </h3>
                  </div>

                  {/* Individual Dishes with Photos */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {meal.items && meal.items.length > 0 ? (
                      meal.items.map((item) => (
                        <DishImageBadge
                          key={item.id}
                          name={item.name}
                          category={item.category}
                          imageUrl={(item as any).image_url}
                          description={(item as any).description}
                          isVegetarian={item.is_vegetarian}
                          size="sm"
                        />
                      ))
                    ) : (
                      <span className="text-xs text-zinc-400 italic">No dishes listed</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-brand-border">
                    <span className="flex items-center gap-1 text-zinc-500 text-[11px]">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {meal.calories || meta.calories} kcal
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-softGreen text-emerald-800 text-[10px] font-bold">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="p-4 bg-brand-cream border-t border-brand-border flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-zinc-500">Attendance:</span>
                <div className="flex gap-1.5">
                  <button
                    disabled={loadingId === meal.id}
                    onClick={() => handleBooking(meal.id, "yes")}
                    className="px-3 py-1.5 rounded-xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Book
                  </button>
                  <button
                    disabled={loadingId === meal.id}
                    onClick={() => handleBooking(meal.id, "no")}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-brand-border text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Skip
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
