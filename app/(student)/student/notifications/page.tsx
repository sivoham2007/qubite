import { getCurrentUser } from "@/app/actions/auth-actions";
import { getNotificationsForUser } from "@/lib/data/mess-store";
import { Bell, CheckCheck, Utensils, CreditCard, AlertCircle, Sparkles } from "lucide-react";
import { markAllNotificationsReadAction } from "@/app/actions/notification-actions";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function StudentNotificationsPage() {
  const user = await getCurrentUser();
  const notifications = user ? getNotificationsForUser(user.id) : [];

  const typeIcons: Record<string, any> = {
    menu_update: Utensils,
    payment: CreditCard,
    complaint: AlertCircle,
    announcement: Sparkles,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-brand-yellowHover" /> Notification Center
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Notifications & Alerts
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time meal schedule publications, wallet transactions, and complaint status updates.
          </p>
        </div>

        {notifications.some((n) => !n.is_read) && (
          <form
            action={async () => {
              "use server";
              await markAllNotificationsReadAction();
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl bg-white border border-brand-border text-xs font-bold text-brand-dark hover:bg-brand-cream flex items-center gap-1.5 shadow-subtle transition-colors shrink-0"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>Mark All Read</span>
            </button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-sm">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No notifications at this time.
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {notifications.map((notif) => {
              const Icon = typeIcons[notif.type] || Bell;

              return (
                <div
                  key={notif.id}
                  className={`py-4 px-3 flex items-start justify-between gap-4 transition-colors rounded-2xl ${
                    !notif.is_read ? "bg-brand-cream/70" : "hover:bg-brand-cream/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-dark shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-brand-dark">{notif.title}</p>
                        {!notif.is_read && (
                          <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 ring-2 ring-white" />
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">{notif.message}</p>
                      <p className="text-[10px] text-zinc-400">
                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
