"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  UploadCloud,
  BarChart3,
  MessageSquare,
  Sparkles,
  Download,
  Check,
  ArrowRight,
  ChevronDown,
  Mail,
  FileSpreadsheet,
  Shield,
  Zap,
  TrendingUp,
  FileText,
  Users,
  Clock,
  Timer,
  Target,
  Search,
  DollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroCard() {
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const goToConvert = useCallback(() => {
    router.push("/convert");
  }, [router]);

  return (
    <div className="relative mx-auto mt-12 lg:mt-16 max-w-5xl">
      <div className="hero-glow" />

      {/* Floating badges */}
      <div
        className="absolute -left-12 top-8 z-10 hidden lg:flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-md animate-[float-1_6s_ease-in-out_infinite]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
          <TrendingUp size={14} className="text-emerald-500" />
        </div>
        <div>
          <div className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>Cash Flow</div>
          <div className="text-xs font-bold text-emerald-500">+$3,200</div>
        </div>
      </div>

      <div
        className="absolute -right-12 top-20 z-10 hidden lg:flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-md animate-[float-2_7s_ease-in-out_infinite]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue/10">
          <Shield size={14} className="text-blue" />
        </div>
        <div>
          <div className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>Accuracy</div>
          <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>99.7%</div>
        </div>
      </div>

      {/* Main card */}
      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 25px 80px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Upload zone */}
          <div
            className="p-8 lg:p-10 lg:border-r flex flex-col"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className={`flex-1 rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${
                dragOver
                  ? "border-blue bg-blue/[0.06] scale-[1.01]"
                  : "border-white/[0.1] hover:border-white/[0.18] hover:bg-white/[0.02]"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
              onDrop={(e) => { e.preventDefault(); goToConvert(); }}
              onClick={() => inputRef.current?.click()}
              style={{ minHeight: "260px" }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={goToConvert}
                className="hidden"
              />
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-5 transition-all duration-300 ${
                dragOver ? "bg-blue/20 scale-110" : "bg-white/[0.04]"
              }`}>
                <UploadCloud
                  size={28}
                  className={`transition-all duration-300 ${dragOver ? "text-blue" : ""}`}
                  style={dragOver ? {} : { color: "var(--text-tertiary)" }}
                />
              </div>
              <p className="text-base font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                Drop your file here
              </p>
              <p className="text-xs mb-5" style={{ color: "var(--text-tertiary)" }}>
                PDF, PNG, or JPG — up to 10MB
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25"
              >
                Browse files
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <Shield size={11} style={{ color: "var(--text-tertiary)" }} />
                <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>AES-256 encrypted</span>
              </div>
              <span className="text-[10px]" style={{ color: "var(--border)" }}>·</span>
              <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>Auto-deleted in 24h</span>
            </div>
          </div>

          {/* Right: Result preview */}
          <div className="p-8 lg:p-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={14} className="text-blue" />
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  Extracted Data
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                32 rows
              </span>
            </div>

            <div
              className="grid grid-cols-[55px_1fr_75px] gap-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              <span>Date</span>
              <span>Description</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="space-y-1">
              {[
                { date: "03/01", desc: "Starbucks Coffee", amt: "-$5.40" },
                { date: "03/02", desc: "Amazon Prime", amt: "-$14.99" },
                { date: "03/03", desc: "Direct Deposit — Payroll", amt: "+$3,200.00" },
                { date: "03/04", desc: "Netflix", amt: "-$15.99" },
                { date: "03/05", desc: "Whole Foods Market", amt: "-$67.32" },
              ].map((row) => (
                <div
                  key={row.desc}
                  className="grid grid-cols-[55px_1fr_75px] gap-3 items-center rounded-lg px-3 py-2.5 text-xs"
                  style={{ backgroundColor: "var(--bg-alt)" }}
                >
                  <span className="font-mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                    {row.date}
                  </span>
                  <span className="font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {row.desc}
                  </span>
                  <span
                    className={`text-right font-mono text-[11px] font-semibold ${
                      row.amt.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : ""
                    }`}
                    style={row.amt.startsWith("+") ? {} : { color: "var(--text-secondary)" }}
                  >
                    {row.amt}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue to-purple-500">
                <Sparkles size={12} className="text-white" />
              </div>
              <div
                className="rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs leading-relaxed"
                style={{
                  backgroundColor: "var(--bg-alt)",
                  color: "var(--text-secondary)",
                }}
              >
                Total spending:{" "}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>$103.70</span>
                . Largest: Whole Foods $67.32
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="orb orb-blue -top-[200px] -left-[200px]" />
      <div className="orb orb-purple top-[100px] -right-[150px]" />
      <div className="orb orb-cyan -bottom-[100px] left-[30%]" />
      <div className="hero-grid" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1
          className="mx-auto max-w-3xl text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-[3.25rem] lg:text-[3.75rem]"
          style={{ color: "var(--text-primary)" }}
        >
          Financial PDFs to{" "}
          <span className="gradient-text">clean data</span> — instantly
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Drop a bank statement, invoice, or receipt. Get structured, categorized transactions in seconds.
        </p>

        <HeroCard />
      </div>
    </section>
  );
}

// ─── Trust Bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  const ref = useReveal(0.2);
  const brands = ["Chase", "Bank of America", "Wells Fargo", "HSBC", "PayPal", "Stripe", "QuickBooks"];

  return (
    <section
      ref={ref}
      className="reveal py-14 lg:py-16 border-y"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className="text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Works with documents from
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-[1.05rem] font-semibold tracking-tight transition-opacity hover:opacity-80"
              style={{ color: "var(--text-tertiary)", opacity: 0.5 }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ───────────────────────────────────────────────────────────

function Stats() {
  const ref = useReveal(0.15);

  const stats = [
    { value: "10,000+", label: "Documents Processed", icon: <FileText size={18} /> },
    { value: "99.7%", label: "Extraction Accuracy", icon: <Zap size={18} /> },
    { value: "< 5 sec", label: "Average Processing Time", icon: <Clock size={18} /> },
    { value: "2,400+", label: "Early Access Users", icon: <Users size={18} /> },
  ];

  return (
    <section ref={ref} className="reveal stats-section py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`reveal-delay-${i + 1} text-center`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-blue/80 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--stats-text)" }}>
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm font-medium" style={{ color: "var(--stats-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function FeatureConvertPreview() {
  const formats = ["Excel", "CSV", "JSON", "QBO"];
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {formats.map((f) => (
        <span
          key={f}
          className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          .{f.toLowerCase()}
        </span>
      ))}
    </div>
  );
}

function FeatureChatPreview() {
  return (
    <div className="mt-6 space-y-2.5">
      <div
        className="rounded-xl rounded-tl-sm px-3.5 py-2.5 text-xs max-w-[85%]"
        style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-secondary)" }}
      >
        &ldquo;What did I spend on restaurants?&rdquo;
      </div>
      <div className="flex justify-end">
        <div className="rounded-xl rounded-tr-sm px-3.5 py-2.5 text-xs max-w-[85%] bg-blue/10 text-blue">
          You spent <span className="font-semibold">$342.18</span> across 12 transactions
        </div>
      </div>
    </div>
  );
}

function FeatureAnalysisPreview() {
  const bars = [65, 45, 80, 35, 90, 55, 70];
  return (
    <div className="mt-6 flex items-end gap-1.5 h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-500/60 to-purple-400/20 transition-all duration-500"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function Features() {
  const headerRef = useReveal();
  const cardsRef = useReveal(0.05);

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="orb orb-purple top-[10%] -left-[100px] w-[400px] h-[400px]" />
      <div className="orb orb-blue bottom-[10%] -right-[100px] w-[350px] h-[350px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Features
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        <div ref={cardsRef} className="reveal mt-14 lg:mt-16">
          {/* Top row: 3 hero features with previews */}
          <div className="grid gap-5 md:grid-cols-3">
            <div
              className="feature-card rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-cyan-400 text-white shadow-lg">
                <FileText size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Convert anything
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Bank statements, invoices, receipts, tax forms — any financial PDF to structured data.
              </p>
              <FeatureConvertPreview />
            </div>

            <div
              className="feature-card rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 text-white shadow-lg">
                <BarChart3 size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Auto-categorize
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                AI labels every transaction — groceries, subscriptions, transfers. See trends instantly.
              </p>
              <FeatureAnalysisPreview />
            </div>

            <div
              className="feature-card rounded-2xl border p-7"
              style={{ borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <MessageSquare size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Chat with your data
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Ask questions in plain English. Get answers and export any result.
              </p>
              <FeatureChatPreview />
            </div>
          </div>

          {/* Bottom row: 3 supporting features */}
          <div className="grid gap-5 md:grid-cols-3 mt-5">
            {[
              {
                icon: <Shield size={18} />,
                gradient: "from-emerald-400 to-teal-500",
                title: "Bank-grade security",
                desc: "AES-256 encryption. Auto-deleted in 24h. Zero data retention.",
              },
              {
                icon: <Download size={18} />,
                gradient: "from-rose-400 to-red-500",
                title: "Export anywhere",
                desc: "Excel, CSV, JSON, QBO. Push to QuickBooks or Xero in one click.",
              },
              {
                icon: <Users size={18} />,
                gradient: "from-indigo-400 to-blue-500",
                title: "Built for professionals",
                desc: "Batch processing, client organization, balance reconciliation.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="feature-card rounded-2xl border px-7 py-6 flex items-start gap-4"
                style={{ borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-md`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  const ref = useReveal(0.1);

  const steps = [
    {
      icon: <Upload size={22} />,
      title: "Upload",
      desc: "Drag and drop any financial PDF, PNG, or JPG. Numifi detects the document type automatically.",
      visual: (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
            <FileText size={16} className="text-red-400" />
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>statement_march.pdf</div>
            <div className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>2 pages · 145 KB</div>
          </div>
        </div>
      ),
    },
    {
      icon: <Sparkles size={22} />,
      title: "Extract & categorize",
      desc: "AI pulls every transaction into a structured table with automatic spending categories.",
      visual: (
        <div className="space-y-1.5">
          {[
            { cat: "Coffee", color: "bg-amber-400/15 text-amber-500" },
            { cat: "Subscription", color: "bg-purple-400/15 text-purple-400" },
            { cat: "Payroll", color: "bg-emerald-400/15 text-emerald-400" },
          ].map((c) => (
            <div key={c.cat} className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${c.color}`}>{c.cat}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "var(--border)" }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Download size={22} />,
      title: "Export & go",
      desc: "Download as Excel, CSV, or push to your accounting software. Done in 30 seconds.",
      visual: (
        <div className="flex gap-2">
          {[".xlsx", ".csv", ".json"].map((ext) => (
            <div
              key={ext}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-2"
              style={{ borderColor: "var(--border)" }}
            >
              <Download size={12} className="text-blue" />
              <span className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>{ext}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32 border-y"
      style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            How It Works
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Three steps. Thirty seconds.
          </h2>
        </div>

        <div ref={ref} className="reveal mt-16 relative">
          {/* Vertical connector line */}
          <div
            className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)" }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal-delay-${i + 1} relative flex gap-6 md:gap-8 items-start`}
              >
                {/* Step number */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-card)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div className="text-blue">{step.icon}</div>
                  <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue text-[9px] font-bold text-white shadow-md shadow-blue/25">
                    {i + 1}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className="flex-1 rounded-2xl border p-6"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {step.desc}
                  </p>
                  {step.visual}
                </div>
              </div>
            ))}
          </div>

          {/* CTA after steps */}
          <div className="mt-10 text-center">
            <a
              href="/convert"
              className="group inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 hover:scale-[1.02]"
            >
              Try it now — it&apos;s free
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--text-tertiary)" }}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const ref = useReveal(0.1);

  const faqs = [
    {
      q: "What file types does Numifi support?",
      a: "Numifi accepts PDF, PNG, and JPG files up to 10MB. We support bank statements, credit card statements, invoices, receipts, and tax forms from any bank or institution worldwide.",
    },
    {
      q: "How accurate is the data extraction?",
      a: "Our AI achieves 99%+ accuracy on most documents with automatic balance verification. Every extraction includes confidence scores so you know exactly how reliable each field is.",
    },
    {
      q: "Is my financial data safe?",
      a: "Yes. Documents are encrypted with AES-256, processed with zero-retention AI, and automatically deleted within 24 hours. We never store or train on your data.",
    },
    {
      q: "What formats can I export to?",
      a: "Excel (.xlsx), CSV, JSON, and QBO. You can also push directly to QuickBooks or Xero with one click, or connect via API and Zapier.",
    },
    {
      q: "How much does Numifi cost?",
      a: "Plans start at $24/month. The first 100 waitlist users get Pro (normally $49/month) free for 3 months. No credit card required to join the waitlist.",
    },
    {
      q: "Can I process multiple documents at once?",
      a: "Yes. Pro and Business plans include batch processing — upload hundreds of statements and process them all simultaneously.",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            FAQ
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Common questions
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal rounded-2xl border px-6 sm:px-8"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  const headerRef = useReveal();
  const cardsRef = useReveal(0.1);
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthly: 24,
      yearly: 19,
      description: "For individuals getting started",
      features: [
        "200 pages per month",
        "AI categorization",
        "Spending insights",
        "10 chatbot questions per month",
        "Excel & CSV export",
      ],
    },
    {
      name: "Pro",
      monthly: 49,
      yearly: 39,
      description: "For professionals and freelancers",
      popular: true,
      features: [
        "1,000 pages per month",
        "Unlimited AI chatbot",
        "Anomaly detection",
        "Cash flow analysis",
        "QuickBooks & Xero integration",
      ],
    },
    {
      name: "Business",
      monthly: 99,
      yearly: 79,
      description: "For teams and growing businesses",
      features: [
        "5,000 pages per month",
        "Full API access",
        "5 team seats",
        "Client organization",
        "Priority support",
        "Custom export templates",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="orb orb-blue top-[20%] -right-[200px]" />
      <div className="orb orb-cyan bottom-[10%] -left-[150px] w-[350px] h-[350px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Pricing
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Simple pricing. No surprises.
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--text-secondary)" }}>
            Start free. Upgrade when you need more.
          </p>

          <div
            className="mt-8 inline-flex items-center gap-4 rounded-full border px-5 py-2.5"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            <span
              className="text-sm font-medium transition-colors"
              style={{ color: annual ? "var(--text-tertiary)" : "var(--text-primary)" }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                annual ? "bg-blue" : ""
              }`}
              style={annual ? {} : { backgroundColor: "var(--border)" }}
              aria-label="Toggle annual pricing"
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  annual ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span
              className="text-sm font-medium transition-colors"
              style={{ color: annual ? "var(--text-primary)" : "var(--text-tertiary)" }}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-500 font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        <div ref={cardsRef} className="reveal mt-14 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal-delay-${i + 1} relative rounded-2xl border p-8 lg:p-10 transition-all duration-400 ${
                plan.popular
                  ? "pricing-popular border-transparent lg:scale-[1.03]"
                  : "feature-card"
              }`}
              style={{
                borderColor: plan.popular ? undefined : "var(--border)",
                backgroundColor: "var(--bg-card)",
                boxShadow: plan.popular
                  ? "0 25px 60px -12px rgba(59,130,246,0.15), var(--card-shadow)"
                  : "var(--card-shadow)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue to-purple-500 px-5 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-blue/25">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                {plan.name}
              </h3>
              <p className="mt-1.5 text-sm" style={{ color: "var(--text-tertiary)" }}>
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  ${annual ? plan.yearly : plan.monthly}
                </span>
                <span style={{ color: "var(--text-tertiary)" }} className="text-sm">
                  /mo
                  {annual ? <span className="text-xs"> billed yearly</span> : null}
                </span>
              </div>

              <a
                href="#waitlist"
                className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-blue text-white hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/20"
                    : "border hover:border-blue/30 hover:bg-blue/[0.03]"
                }`}
                style={
                  plan.popular
                    ? {}
                    : {
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }
                }
              >
                Coming Soon — Join Waitlist
                <ArrowRight size={14} />
              </a>

              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue/10 shrink-0">
                      <Check size={12} className="text-blue" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Section ──────────────────────────────────────────────────────

function Comparison() {
  const ref = useReveal(0.1);

  const rows = [
    {
      category: "Processing Time",
      icon: <Timer size={16} />,
      old: "45 min per statement",
      numifi: "30 seconds",
    },
    {
      category: "Accuracy",
      icon: <Target size={16} />,
      old: "Human errors inevitable",
      numifi: "99%+ with balance verification",
    },
    {
      category: "Analysis",
      icon: <BarChart3 size={16} />,
      old: "Open Excel, build formulas",
      numifi: "Automatic AI insights",
    },
    {
      category: "Questions",
      icon: <Search size={16} />,
      old: "Scroll through rows",
      numifi: "Ask in plain English",
    },
    {
      category: "Cost",
      icon: <DollarSign size={16} />,
      old: "$50+/hour accountant time",
      numifi: "From $24/month",
    },
  ];

  return (
    <section
      className="py-28 lg:py-36 border-y"
      style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Compare
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why accountants switch to Numifi
          </h2>
        </div>

        <div ref={ref} className="reveal">
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-4 rounded-t-2xl text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--text-tertiary)" }}></span>
            <span style={{ color: "var(--text-tertiary)" }} className="text-center">Manual / Traditional</span>
            <span className="text-blue text-center">Numifi</span>
          </div>

          {/* Table rows */}
          <div
            className="rounded-b-2xl border overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {rows.map((row, i) => (
              <div
                key={row.category}
                className={`reveal-delay-${Math.min(i + 1, 4)} grid grid-cols-[1fr_1fr_1fr] gap-4 items-center px-6 py-5 transition-colors`}
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-alt)",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                    style={{ backgroundColor: "var(--bg-alt)" }}
                  >
                    <span style={{ color: "var(--text-tertiary)" }}>{row.icon}</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {row.category}
                  </span>
                </div>
                <div className="text-sm text-center" style={{ color: "var(--text-tertiary)" }}>
                  {row.old}
                </div>
                <div className="text-sm font-semibold text-center text-blue">
                  {row.numifi}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Email Signup ────────────────────────────────────────────────────────────

function EmailSignup() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setStatus("loading");
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("You're on the list! We'll notify you when Numifi launches.");
          setEmail("");
        } else if (res.status === 409) {
          setStatus("duplicate");
          setMessage("You're already signed up!");
        } else {
          setStatus("error");
          setMessage(data.message || "Something went wrong. Try again.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    },
    [email]
  );

  return (
    <section
      id="waitlist"
      className="relative py-28 lg:py-36 overflow-hidden stats-section"
    >
      <div className="cta-glow" />

      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-purple-500 mb-8 shadow-lg shadow-blue/20">
            <Mail size={22} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--stats-text)" }}>
            Ready to stop wasting hours on data entry?
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--stats-muted)" }}>
            Join the waitlist. First 100 users get{" "}
            <span className="font-semibold text-blue">Pro free for 3 months</span>.
          </p>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border px-5 py-3.5 text-sm transition-all duration-200 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/40"
                style={{}}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-5 text-sm" style={{ color: "var(--stats-muted)" }}>
            No spam. No credit card. Cancel anytime.
          </p>

          {message && (
            <div
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
                status === "success"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : status === "duplicate"
                  ? "bg-blue/15 text-blue"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {(status === "success" || status === "duplicate") && <Check size={14} />}
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Numifi
            </span>
            <p className="mt-2 text-sm max-w-[280px]" style={{ color: "var(--text-tertiary)" }}>
              Built with security and privacy at the core.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Product
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Blog", href: "/blog" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Legal
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                {["Privacy Policy", "Terms of Service"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Social
              </h4>
              <div className="mt-4 flex flex-col gap-3">
                {["X / Twitter", "LinkedIn"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            &copy; 2026 Numifi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen noise-overlay" style={{ backgroundColor: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Comparison />
      <FAQ />
      <EmailSignup />
      <Footer />
    </div>
  );
}
