import { getCurrentUser } from "@/app/actions/auth-actions";
import { getStore } from "@/lib/data/mess-store";
import { User, Mail, Hash, Building2, DoorClosed, Award, Utensils, Phone, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const user = await getCurrentUser();
  const store = getStore();

  const studentPlans = user ? store.mealPlans.filter((p) => p.student_id === user.id) : [];
  const studentRatings = user ? store.ratings.filter((r) => r.student_id === user.id) : [];

  return (
    <div className="space-y-7 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
          <User className="w-4 h-4 text-brand-yellowHover" /> Account Details
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
          Student Profile
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Your hostel accommodation record, mess dining allocation, and academic identification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-brand-border">
            <div className="h-16 w-16 rounded-2xl bg-brand-yellow/30 border border-brand-yellow/60 flex items-center justify-center font-extrabold text-2xl text-brand-dark overflow-hidden">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="h-full w-full object-cover" />
              ) : (
                <span>{user?.full_name?.charAt(0) || "A"}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-black text-brand-dark">{user?.full_name || "Aarav Sharma"}</h2>
              <p className="text-xs text-zinc-400">{user?.email || "student1@mess.college.edu"}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-yellow text-brand-black text-[10px] font-extrabold mt-1">
                Student Member
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-brand-yellowHover" /> Student ID / Roll No
              </span>
              <p className="text-sm font-extrabold text-brand-dark">{user?.roll_number || "2024CS001"}</p>
            </div>

            <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-yellowHover" /> Department
              </span>
              <p className="text-sm font-extrabold text-brand-dark">{user?.department || "Computer Science"}</p>
            </div>

            <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                <DoorClosed className="w-3.5 h-3.5 text-brand-yellowHover" /> Hostel & Room
              </span>
              <p className="text-sm font-extrabold text-brand-dark">
                {user?.hostel_block || "Block A"}, Room {user?.room_number || "101"}
              </p>
            </div>

            <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-brand-yellowHover" /> Mess Allocation
              </span>
              <p className="text-sm font-extrabold text-brand-dark">{user?.mess_allocation || "Central Mess Hall 1"}</p>
            </div>

            <div className="p-4 bg-brand-cream rounded-2xl border border-brand-border space-y-1 sm:col-span-2">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-yellowHover" /> Registered Contact
              </span>
              <p className="text-sm font-extrabold text-brand-dark">{user?.phone || "+91 98110 10077"}</p>
            </div>
          </div>
        </div>

        {/* Mess Metrics Sidebar */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-brand-dark">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base">Mess Participation</h3>
            </div>

            <div className="p-4 rounded-2xl bg-brand-softGreen text-center border border-emerald-200">
              <span className="text-3xl font-black text-emerald-800">82%</span>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">Dining Attendance</p>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex justify-between py-1.5 border-b border-brand-border">
                <span>Total Plans Logged</span>
                <span className="font-bold text-brand-dark">{studentPlans.length || 22}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-brand-border">
                <span>Reviews Submitted</span>
                <span className="font-bold text-brand-dark">{studentRatings.length || 9}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Current Status</span>
                <span className="font-bold text-emerald-600">Active Resident</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
