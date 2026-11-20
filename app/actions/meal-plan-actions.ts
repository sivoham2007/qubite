"use server";

import { revalidatePath } from "next/cache";
import { mealPlanSchema, MealPlanInput } from "@/lib/validations/meal-plan";
import { getMenuById, saveMealPlanInStore } from "@/lib/data/mess-store";
import { isCutoffPassed, getCutoffDateTime } from "@/lib/services/cutoff-manager";
import { getCurrentUser } from "./auth-actions";

export async function submitMealPlanAction(input: MealPlanInput) {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") {
    return { success: false, error: "Only registered students can submit meal plans." };
  }

  const result = mealPlanSchema.safeParse(input);
  if (!result.success) {
    return { success: false, error: result.error.errors[0]?.message || "Invalid meal plan submission" };
  }

  const { menu_id, status } = result.data;
  const menu = getMenuById(menu_id);

  if (!menu) {
    return { success: false, error: "The requested menu was not found." };
  }

  // FR3 Server-Side Cutoff Enforcement
  const now = new Date();
  if (isCutoffPassed(menu.menu_date, menu.cutoff_time, now)) {
    const cutoffDate = getCutoffDateTime(menu.menu_date, menu.cutoff_time);
    return {
      success: false,
      error: `Cutoff passed at ${cutoffDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Meal plans for this meal are locked.`,
    };
  }

  try {
    const savedPlan = saveMealPlanInStore(user.id, menu_id, status);
    revalidatePath("/student/dashboard");
    revalidatePath("/student/meal-plans");
    revalidatePath("/admin/attendance");
    revalidatePath("/admin/dashboard");
    return { success: true, plan: savedPlan };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update meal plan." };
  }
}
