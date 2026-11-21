"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Utensils, Check, X, Sparkles } from "lucide-react";
import { Menu, MealType } from "@/lib/types/database";
import { FOOD_IMAGES } from "@/lib/data/mess-store";
import { resolveDishImage } from "@/lib/data/dish-images";
import { DishImageBadge } from "@/components/shared/dish-image-badge";
import { formatTime } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CutoffCountdown } from "@/components/shared/cutoff-countdown";
import { submitMealPlanAction } from "@/app/actions/meal-plan-actions";
import { toast } from "sonner";

interface TodaysMenuCardProps {
  menus: Menu[];
}

export function TodaysMenuCard({ menus }: TodaysMenuCardProps) {
  const [selectedMeal, setSelectedMeal] = useState<Menu | null>(null);
  const [optInStatus, setOptInStatus] = useState<"yes" | "no" | null>(null);
  const [loading, setLoading] = useState(false);

  // Four standard meals in strict order: breakfast, lunch, snacks, dinner
  const mealKeys: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  const getMealMenu = (type: MealType): Menu => {
    const existing = menus.find((m) => m.meal_type === type);
    if (existing) return existing;

    const meta = FOOD_IMAGES[type];
    return {
      id: `menu-today-${type}`,
      menu_date: new Date().toISOString().split("T")[0],
      meal_type: type,
      cutoff_time: type === "breakfast" ? "06:00:00" : type === "lunch" ? "10:00:00" : type === "snacks" ? "15:30:00" : "17:00:00",
      serving_start_time: type === "breakfast" ? "07:30:00" : type === "lunch" ? "12:30:00" : type === "snacks" ? "17:00:00" : "19:30:00",
      serving_end_time: type === "breakfast" ? "09:30:00" : type === "lunch" ? "14:30:00" : type === "snacks" ? "18:00:00" : "21:30:00",
      is_published: true,
      image_url: meta.url,
      calories: meta.calories,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  const handleCardClick = (meal: Menu) => {
    setSelectedMeal(meal);
    setOptInStatus(meal.user_meal_plan?.status || null);
  };

  const handleTogglePlan = async (status: "yes" | "no") => {
    if (!selectedMeal) return;
    setLoading(true);

    const res = await submitMealPlanAction({
      menu_id: selectedMeal.id,
      status,
    });
    setLoading(false);

    if (res.success) {
      setOptInStatus(status);
      toast.success(status === "yes" ? "Marked as Eating! See you at mess." : "Marked as Skipped.");
    } else {
      toast.error(res.error || "Failed to update meal plan");
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-5">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-brand-dark tracking-tight">
              Today&apos;s Menu
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Freshly prepared daily servings at Central Mess Hall
            </p>
          </div>

          <Link
            href="/student/menu"
            className="text-xs font-bold text-brand-dark hover:text-amber-600 flex items-center gap-1 group transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Food Cards Displayed Horizontally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealKeys.map((type) => {
            const meal = getMealMenu(type);
            const meta = FOOD_IMAGES[type];
            const primaryDish = meal.items?.[0];
            const heroImage = primaryDish
              ? resolveDishImage(primaryDish.name, primaryDish.image_url, primaryDish.category)
              : resolveDishImage(type, meal.image_url || meta.url);
            const mealTitle = meal.items && meal.items.length > 0 ? meal.items.map(i => i.name).slice(0, 2).join(" + ") : meta.desc;

            const isVeg = meal.items && meal.items.length > 0 ? meal.items.every(i => i.is_vegetarian !== false) : true;

            return (
              <div
                key={type}
                onClick={() => handleCardClick(meal)}
                className="group cursor-pointer rounded-2xl border border-brand-border overflow-hidden bg-white hover:border-brand-yellow hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative h-36 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={heroImage}
                    alt={mealTitle}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-black/85 text-brand-yellow backdrop-blur-xs">
                      {meta.label}
                    </span>
                  </div>
                  {meal.special_badge && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5" /> Special
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-yellow" />
                    <span>{formatTime(meal.serving_start_time)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-sm text-brand-dark group-hover:text-amber-800 transition-colors line-clamp-1">
                    {mealTitle}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-brand-border">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {meta.calories} kcal
                    </span>
                    {isVeg ? (
                      <span className="font-semibold text-emerald-700 bg-brand-softGreen px-2 py-0.5 rounded-full">
                        Pure Veg
                      </span>
                    ) : (
                      <span className="font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                        Non-Veg
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Food Details Modal */}
      {selectedMeal && (
        <Dialog open={!!selectedMeal} onOpenChange={(open) => !open && setSelectedMeal(null)}>
          <DialogContent className="max-w-lg bg-white rounded-3xl border border-brand-border p-6 shadow-floating">
            <DialogHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-brand-softOrange px-2.5 py-0.5 rounded-md">
                  {FOOD_IMAGES[selectedMeal.meal_type]?.label}
                </span>
                <CutoffCountdown
                  menuDate={selectedMeal.menu_date}
                  cutoffTime={selectedMeal.cutoff_time}
                />
              </div>

              <DialogTitle className="text-xl font-extrabold text-brand-dark pt-1">
                {selectedMeal.items && selectedMeal.items.length > 0
                  ? selectedMeal.items.map(i => i.name).slice(0, 2).join(" + ")
                  : FOOD_IMAGES[selectedMeal.meal_type]?.desc}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">
                Serving Time: {formatTime(selectedMeal.serving_start_time)} – {formatTime(selectedMeal.serving_end_time)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="h-44 w-full rounded-2xl overflow-hidden">
                <img
                  src={
                    selectedMeal.items?.[0]
                      ? resolveDishImage(selectedMeal.items[0].name, selectedMeal.items[0].image_url, selectedMeal.items[0].category)
                      : resolveDishImage(selectedMeal.meal_type, selectedMeal.image_url || FOOD_IMAGES[selectedMeal.meal_type]?.url)
                  }
                  alt={selectedMeal.items?.[0]?.name || selectedMeal.meal_type}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dishes list with Authentic Photos */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-700">Dishes Included:</span>
                <div className="flex flex-wrap gap-2">
                  {(selectedMeal.items && selectedMeal.items.length > 0
                    ? selectedMeal.items
                    : [
                        { id: "1", name: "Idli with Coconut Chutney", category: "main" as const, is_vegetarian: true },
                        { id: "2", name: "Medu Vada & Sambar", category: "side" as const, is_vegetarian: true },
                        { id: "3", name: "Filter Coffee", category: "beverage" as const, is_vegetarian: true },
                      ]
                  ).map((item, idx) => (
                    <DishImageBadge
                      key={item.id || idx}
                      name={item.name}
                      category={item.category}
                      imageUrl={(item as any).image_url}
                      description={(item as any).description}
                      isVegetarian={item.is_vegetarian}
                      size="md"
                    />
                  ))}
                </div>
              </div>

              {/* Opt-in Decision */}
              <div className="p-4 rounded-2xl bg-brand-cream border border-brand-border flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-brand-dark block">
                    Will you eat this meal?
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Saves kitchen prep & avoids food wastage
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleTogglePlan("yes")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                      optInStatus === "yes"
                        ? "bg-brand-yellow text-brand-black shadow-xs"
                        : "bg-white border border-brand-border text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Yes
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleTogglePlan("no")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                      optInStatus === "no"
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-white border border-brand-border text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" /> Skip
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
