import { getCurrentUser } from "@/app/actions/auth-actions";
import { getWalletDataForStudent } from "@/lib/data/mess-store";
import { Wallet, ArrowDownRight, ArrowUpRight, Download, CreditCard, Sparkles } from "lucide-react";
import { TopUpModalButton } from "@/components/student/topup-modal-button";

export const dynamic = "force-dynamic";

export default async function StudentPaymentsPage() {
  const user = await getCurrentUser();
  const walletData = getWalletDataForStudent(user?.id || "u-student-001");

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4 text-brand-yellowHover" /> Dining Wallet
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Payments & Wallet Balance
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage your prepaid dining credit, review meal deductions, and top up via UPI or Card.
          </p>
        </div>

        <TopUpModalButton currentBalance={walletData.balance} />
      </div>

      {/* Wallet Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 p-7 rounded-3xl bg-brand-black text-white relative overflow-hidden shadow-floating flex flex-col justify-between min-h-[190px]">
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow">
              Hostel Dining Balance
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              ID: {user?.roll_number || "2024CS001"}
            </span>
          </div>

          <div className="my-4 relative z-10">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
              ₹{walletData.balance}
              <span className="text-sm font-semibold text-zinc-400">INR</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Available for meal bookings & add-on delicacies</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-400 relative z-10">
            <span>Mess: Central Mess Hall 1</span>
            <span className="text-emerald-400 font-semibold">● Active Account</span>
          </div>
        </div>

        {/* Monthly Expense Card */}
        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle flex flex-col justify-between">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            This Month Expenditure
          </span>
          <div className="my-2">
            <span className="text-3xl font-black text-brand-dark">₹1,450</span>
            <p className="text-[11px] text-zinc-400 mt-0.5">22 meals booked & consumed</p>
          </div>
          <div className="p-3 rounded-2xl bg-brand-cream border border-brand-border text-[11px] text-zinc-600">
            Avg cost per meal: <span className="font-bold text-brand-dark">₹65.90</span>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-brand-dark">
            Transaction History
          </h2>
          <span className="text-xs font-bold text-zinc-400">Currency: INR (₹)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-border text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3 px-3 font-bold">Transaction</th>
                <th className="pb-3 px-3 font-bold">Type</th>
                <th className="pb-3 px-3 font-bold">Amount</th>
                <th className="pb-3 px-3 font-bold">Status</th>
                <th className="pb-3 px-3 font-bold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {walletData.transactions.map((tx) => {
                const isCredit = tx.amount > 0;

                return (
                  <tr key={tx.id} className="hover:bg-brand-cream/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isCredit ? "bg-brand-softGreen text-emerald-800" : "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-brand-dark">{tx.description}</p>
                          <span className="text-[10px] text-zinc-400">
                            {new Date(tx.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 capitalize font-semibold text-zinc-600">
                      {tx.type.replace("_", " ")}
                    </td>

                    <td className="py-3.5 px-3 font-extrabold text-sm">
                      <span className={isCredit ? "text-emerald-600" : "text-brand-dark"}>
                        {isCredit ? "+" : ""}₹{Math.abs(tx.amount)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen text-emerald-800">
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => alert(`Downloading receipt for transaction ${tx.id}...`)}
                        className="p-1.5 rounded-xl hover:bg-brand-cream text-zinc-500 hover:text-brand-dark transition-colors"
                        title="Download Receipt"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
