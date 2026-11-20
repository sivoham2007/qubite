"use client";

import { useState } from "react";
import { Settings, Bell, Lock, HelpCircle, LogOut, CheckCircle2, Shield } from "lucide-react";
import { logoutAction } from "@/app/actions/auth-actions";
import { toast } from "sonner";

export default function StudentSettingsPage() {
  const [mealAlerts, setMealAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [cutoffReminders, setCutoffReminders] = useState(true);

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully!");
  };

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4 text-brand-yellowHover" /> Preferences
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Configure notification preferences, security settings, and dining notifications.
        </p>
      </div>

      <div className="space-y-5">
        {/* Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-brand-dark">Notification Preferences</h2>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-cream border border-brand-border">
              <div>
                <span className="text-xs font-bold text-brand-dark block">Daily Menu Publication Alerts</span>
                <span className="text-[11px] text-zinc-500">Receive in-app alerts whenever new menus are released</span>
              </div>
              <input
                type="checkbox"
                checked={mealAlerts}
                onChange={(e) => setMealAlerts(e.target.checked)}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-cream border border-brand-border">
              <div>
                <span className="text-xs font-bold text-brand-dark block">Cutoff Deadline Reminders</span>
                <span className="text-[11px] text-zinc-500">Alert me 30 minutes before meal opt-in locks</span>
              </div>
              <input
                type="checkbox"
                checked={cutoffReminders}
                onChange={(e) => setCutoffReminders(e.target.checked)}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-cream border border-brand-border">
              <div>
                <span className="text-xs font-bold text-brand-dark block">Payment & Wallet Notifications</span>
                <span className="text-[11px] text-zinc-500">Notify upon recharge, receipt generation & deductions</span>
              </div>
              <input
                type="checkbox"
                checked={paymentAlerts}
                onChange={(e) => setPaymentAlerts(e.target.checked)}
                className="w-5 h-5 accent-brand-yellow cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-bold transition-colors"
          >
            Save Notification Settings
          </button>
        </div>

        {/* Security & Password */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-brand-dark">Security & Password</h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3 rounded-xl border border-brand-border text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">New Password</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                className="w-full h-10 px-3 rounded-xl border border-brand-border text-xs"
              />
            </div>

            <button
              onClick={() => toast.success("Password updated successfully!")}
              className="px-4 py-2 rounded-xl bg-brand-black text-white hover:bg-zinc-800 text-xs font-bold transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Sign Out Card */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-brand-dark">Sign Out of QuBite</h3>
            <p className="text-xs text-zinc-500">End your active dining portal session</p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
