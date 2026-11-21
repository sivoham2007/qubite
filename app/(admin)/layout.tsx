import { AdminSidebar } from "@/components/admin/sidebar";
import { getCurrentUser } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { QubiteLogo } from "@/components/shared/qubite-logo";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/student/dashboard?error=unauthorized");
  }

  return (
    <div className="min-h-screen flex bg-brand-cream text-brand-dark antialiased">
      {/* Dark Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-brand-border px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <QubiteLogo size="xs" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-black bg-brand-yellow px-2.5 py-1 rounded-lg">
              QuBite Admin Console
            </span>
            <span className="text-xs text-zinc-300 hidden sm:inline">•</span>
            <span className="text-xs font-semibold text-zinc-500 hidden sm:inline">
              Central Kitchen & Operations Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-brand-dark">{user.full_name}</p>
              <p className="text-[11px] text-zinc-400">{user.email}</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-brand-black text-brand-yellow flex items-center justify-center font-black text-xs shadow-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-7">
          {children}
        </main>
      </div>
    </div>
  );
}
