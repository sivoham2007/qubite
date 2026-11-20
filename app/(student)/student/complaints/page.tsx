import { getCurrentUser } from "@/app/actions/auth-actions";
import { getComplaintsFromStore } from "@/lib/data/mess-store";
import { ComplaintModal } from "@/components/student/complaint-modal";
import { AlertCircle, Clock, CheckCircle2, MessageSquare, Plus } from "lucide-react";
import { ComplaintStatusButton } from "@/components/student/complaint-status-button";

export const dynamic = "force-dynamic";

export default async function StudentComplaintsPage() {
  const user = await getCurrentUser();
  const complaints = user ? getComplaintsFromStore(user.id) : [];

  const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
    Pending: { bg: "bg-amber-50 border-amber-200", text: "text-amber-800", dot: "bg-amber-500" },
    "In Progress": { bg: "bg-blue-50 border-blue-200", text: "text-blue-800", dot: "bg-blue-500" },
    Resolved: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4 text-brand-yellowHover" /> Issue Tracker
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Hostel Mess Complaints
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Submit issues concerning food quality, hygiene, or timings directly to the mess committee.
          </p>
        </div>

        <ComplaintStatusButton />
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-brand-border text-zinc-400 text-sm">
            No complaints logged. Everything looks clean and satisfactory!
          </div>
        ) : (
          complaints.map((c) => {
            const st = statusStyles[c.status] || statusStyles.Pending;

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle hover:shadow-card transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs bg-brand-cream border border-brand-border px-2.5 py-1 rounded-xl text-brand-dark">
                      #{c.id}
                    </span>
                    <h3 className="font-extrabold text-sm md:text-base text-brand-dark">
                      {c.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                      {c.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${st.bg} ${st.text}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                      {c.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed bg-brand-cream/60 p-3.5 rounded-2xl border border-brand-border">
                  {c.description}
                </p>

                {c.admin_remarks && (
                  <div className="p-3 bg-brand-softGreen/50 rounded-2xl border border-emerald-200/60 flex items-start gap-2 text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Mess Committee Remarks:</span>
                      <p className="mt-0.5 text-zinc-700">{c.admin_remarks}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-brand-border">
                  <span>Logged by {c.student_name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
