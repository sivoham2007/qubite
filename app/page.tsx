import Link from "next/link";
import {
  Utensils,
  CheckCircle2,
  Brain,
  Scale,
  Calendar,
  Star,
  ShoppingBag,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Calendar,
      title: "Weekly Menus & Cutoffs",
      desc: "Rotating daily meal menus with nutritional information, calorie counts, and strict automated cutoff timers.",
      color: "bg-brand-softYellow text-amber-800",
    },
    {
      icon: CheckCircle2,
      title: "Real-Time Meal Booking",
      desc: "One-click 'Will You Eat?' Yes/No opt-ins enabling the kitchen to cook exact headcounts with zero food waste.",
      color: "bg-brand-softGreen text-emerald-800",
    },
    {
      icon: CreditCard,
      title: "Dining Wallet & Payments",
      desc: "Prepaid hostel digital wallet with zero-fee UPI recharges, instant meal deductions, and downloadable receipts.",
      color: "bg-brand-softPurple text-purple-800",
    },
    {
      icon: Brain,
      title: "Explainable AI Demand",
      desc: "Predictive turn-out algorithm blending 4-week moving averages and opt-in ratios with a 5% kitchen buffer.",
      color: "bg-brand-softOrange text-orange-800",
    },
    {
      icon: Star,
      title: "Student Culinary Reviews",
      desc: "1 to 5 star ratings and qualitative comments unlocked strictly after meal serving commences.",
      color: "bg-brand-softYellow text-amber-800",
    },
    {
      icon: ShoppingBag,
      title: "Pantry & Recipe Matcher",
      desc: "Real-time kitchen stock tracking that matches ingredients against recipes with 70%+ availability scores.",
      color: "bg-brand-softGreen text-emerald-800",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark antialiased">
      {/* Top Navigation */}
      <header className="border-b border-brand-border bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-black text-xl text-brand-dark tracking-tight">
            <div className="h-10 w-10 rounded-2xl bg-brand-yellow text-brand-black flex items-center justify-center shadow-sm">
              <Utensils className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span>QuBite</span>
              <span className="text-[10px] block font-bold text-zinc-400 uppercase tracking-widest -mt-1">
                Eat • Track • Manage
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-brand-dark hover:text-amber-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-2xl bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-extrabold shadow-sm transition-all"
            >
              Student Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 text-center relative overflow-hidden">
        {/* Decorative soft glow */}
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-border text-brand-dark text-xs font-bold shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellowHover fill-brand-yellow" />
            <span>Modern Mess Management System (MessMate)</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tight leading-tight">
            Smart Dining. Zero Waste. <br />
            <span className="text-amber-500 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Effortless Hostel Operations.
            </span>
          </h1>

          <p className="text-zinc-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            The next-generation digital mess platform designed for colleges and universities. Real-time meal opt-ins, transparent cutoff timers, digital dining wallet, and predictive demand analytics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-black hover:bg-zinc-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-floating transition-all hover:gap-3"
            >
              <span>Launch Student Portal</span>
              <ArrowRight className="w-4 h-4 text-brand-yellow" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-zinc-50 border border-brand-border text-brand-dark font-extrabold text-sm shadow-subtle transition-all"
            >
              Admin Management Console
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            A Professional SaaS Experience
          </h2>
          <p className="text-xs text-zinc-500">
            Engineered with soft neubrutalism, warm cream aesthetics, and instant interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-brand-border shadow-subtle hover:shadow-card hover:border-brand-yellow transition-all space-y-3"
              >
                <div className={`h-11 w-11 rounded-2xl ${feat.color} flex items-center justify-center shadow-xs`}>
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-extrabold text-brand-dark">{feat.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-brand-border bg-white py-8 text-center text-xs text-zinc-500">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} QuBite (MessMate) • Eat • Track • Manage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
