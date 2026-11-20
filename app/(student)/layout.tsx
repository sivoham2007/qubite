import { getCurrentUser } from "@/app/actions/auth-actions";
import { QubiteSidebar } from "@/components/student/qubite-sidebar";
import { QubiteHeader } from "@/components/student/qubite-header";
import { getNotificationsForUser } from "@/lib/data/mess-store";

export const dynamic = "force-dynamic";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const notifications = user ? getNotificationsForUser(user.id) : [];
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen flex bg-brand-cream text-brand-dark antialiased">
      {/* Desktop Fixed Black Sidebar */}
      <div className="hidden lg:block shrink-0">
        <QubiteSidebar unreadNotifsCount={unreadCount} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <QubiteHeader user={user} notifications={notifications} />

        {/* Page Content */}
        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-brand-border bg-white/60 py-4 px-8 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} QuBite (MessMate) • Smart Digital Mess Platform</p>
        </footer>
      </div>
    </div>
  );
}
