"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  BarChart3,
  MessageSquare,
  Sparkles,
  Download,
  Check,
  Sun,
  Moon,
  Menu,
  X,
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
} from "lucide-react";

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

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return { dark, toggle };
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        borderColor: scrolled ? "var(--nav-border)" : "transparent",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Numifi
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-[0.8125rem] font-medium transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#signup"
            className="hidden rounded-full bg-blue px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 sm:inline-flex items-center gap-2"
          >
            Get Early Access
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-72" : "max-h-0"
        }`}
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="px-6 py-4 space-y-1"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#signup"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full bg-blue mt-2 px-4 py-2.5 text-center text-sm font-medium text-white"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroMockup() {
  return (
    <div className="relative mx-auto mt-16 lg:mt-20 max-w-4xl">
      <div className="hero-glow" />

      {/* Floating badges */}
      <div
        className="absolute -left-4 top-12 hidden lg:flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-sm animate-[float-1_6s_ease-in-out_infinite]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
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
        className="absolute -right-4 top-24 hidden lg:flex items-center gap-2 rounded-xl border px-4 py-2.5 backdrop-blur-sm animate-[float-2_7s_ease-in-out_infinite]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
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

      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow:
            "0 25px 80px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-5 py-3.5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div
            className="mx-auto rounded-md px-12 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: "var(--bg-alt)",
              color: "var(--text-tertiary)",
            }}
          >
            numifi.com
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* PDF side */}
          <div className="p-6 md:p-8 md:border-r" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2.5 mb-6">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10"
              >
                <FileText size={15} className="text-red-500" />
              </div>
              <div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  bank_statement_march.pdf
                </div>
                <div
                  className="text-[10px]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  2 pages &middot; 145 KB
                </div>
              </div>
            </div>

            {/* Animated progress indicator */}
            <div className="mb-5 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                <div className="h-full w-full bg-gradient-to-r from-blue to-purple-500 rounded-full shimmer-line" />
              </div>
              <span className="text-[10px] font-semibold text-blue">Processed</span>
            </div>

            <div className="space-y-2.5">
              {[0.85, 1, 0.7, 0.9, 0.6, 0.8, 1, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full"
                  style={{
                    width: `${w * 100}%`,
                    backgroundColor: "var(--border)",
                    opacity: 0.6 - i * 0.04,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Table side */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={14} className="text-blue" />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Extracted Data
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                32 rows
              </span>
            </div>

            {/* Table header */}
            <div
              className="grid grid-cols-[60px_1fr_80px] gap-3 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              <span>Date</span>
              <span>Description</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="space-y-1">
              {[
                { date: "03/01", desc: "Starbucks Coffee", amt: "-$5.40", cat: "Food" },
                { date: "03/02", desc: "Amazon Prime", amt: "-$14.99", cat: "Subscription" },
                { date: "03/03", desc: "Direct Deposit — Payroll", amt: "+$3,200.00", cat: "Income" },
                { date: "03/04", desc: "Netflix", amt: "-$15.99", cat: "Subscription" },
                { date: "03/05", desc: "Whole Foods Market", amt: "-$67.32", cat: "Groceries" },
              ].map((row) => (
                <div
                  key={row.desc}
                  className="grid grid-cols-[60px_1fr_80px] gap-3 items-center rounded-lg px-3 py-2.5 text-xs transition-colors"
                  style={{ backgroundColor: "var(--bg-alt)" }}
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {row.date}
                  </span>
                  <span
                    className="font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {row.desc}
                  </span>
                  <span
                    className={`text-right font-mono text-[11px] font-semibold ${
                      row.amt.startsWith("+")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : ""
                    }`}
                    style={
                      row.amt.startsWith("+")
                        ? {}
                        : { color: "var(--text-secondary)" }
                    }
                  >
                    {row.amt}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat bubble */}
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
                Total spending this month:{" "}
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  $103.70
                </span>
                . Largest transaction: Whole Foods $67.32
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
    <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
      {/* Decorative orbs */}
      <div className="orb orb-blue -top-[200px] -left-[200px]" />
      <div className="orb orb-purple top-[100px] -right-[150px]" />
      <div className="orb orb-cyan -bottom-[100px] left-[30%]" />
      <div className="hero-grid" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium mb-8 backdrop-blur-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-card)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
          </span>
          Now in early access
        </div>

        <h1
          className="mx-auto max-w-3xl text-[2.75rem] font-bold leading-[1.08] tracking-tight sm:text-[3.5rem] lg:text-[4.25rem]"
          style={{ color: "var(--text-primary)" }}
        >
          Your finances, finally{" "}
          <span className="gradient-text">organized.</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Upload any financial PDF. Get clean data, instant insights, and an AI
          that answers your questions.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#signup"
            className="group inline-flex items-center gap-2 rounded-full bg-blue px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-hover hover:shadow-xl hover:shadow-blue/25 hover:scale-[1.02]"
          >
            Get Early Access
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-sm hover:scale-[1.02]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            See How It Works
            <ChevronDown
              size={15}
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </a>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

// ─── Trust Bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  const ref = useReveal(0.2);
  const banks = ["Chase", "Bank of America", "HSBC", "Wells Fargo", "Citi"];

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
          Works with statements from
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
          {banks.map((bank) => (
            <span
              key={bank}
              className="text-[1.05rem] font-semibold tracking-tight transition-opacity hover:opacity-80"
              style={{ color: "var(--text-tertiary)", opacity: 0.5 }}
            >
              {bank}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section (NEW) ─────────────────────────────────────────────────────

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
            <div
              key={stat.label}
              className={`reveal-delay-${i + 1} text-center`}
            >
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

function Features() {
  const headerRef = useReveal();
  const cardsRef = useReveal(0.1);

  const features = [
    {
      icon: <Upload size={24} />,
      title: "Convert",
      description:
        "Upload bank statements, invoices, receipts, tax forms. AI extracts everything into clean Excel in seconds.",
      gradient: "from-blue to-cyan-400",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analyze",
      description:
        "Auto-categorize spending. Spot anomalies. Track cash flow. Zero setup needed.",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Chat",
      description:
        "Ask questions in plain English. What did I spend on food? Are there duplicate charges? Export any answer.",
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <section id="features" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-purple top-[10%] -left-[100px] w-[400px] h-[400px]" />
      <div className="orb orb-blue bottom-[10%] -right-[100px] w-[350px] h-[350px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="reveal text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Features
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Everything you need to make sense of your finances
          </h2>
        </div>

        <div ref={cardsRef} className="reveal mt-16 lg:mt-20 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal-delay-${i + 1} feature-card rounded-2xl border p-8 lg:p-10`}
              style={{
                borderColor: "var(--border)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                {feature.icon}
              </div>
              <h3
                className="mt-7 text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-3 text-[0.9375rem] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
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
      icon: <Upload size={24} />,
      number: "01",
      title: "Upload your PDF",
      desc: "Drag & drop any financial document — statements, invoices, receipts",
    },
    {
      icon: <Sparkles size={24} />,
      number: "02",
      title: "AI extracts & analyzes",
      desc: "Data is parsed, categorized, and insights generated in seconds",
    },
    {
      icon: <Download size={24} />,
      number: "03",
      title: "Chat or download Excel",
      desc: "Ask questions about your data or export clean spreadsheets",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-28 lg:py-36 border-y"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            How It Works
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem] leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Three simple steps
          </h2>
        </div>

        <div ref={ref} className="reveal mt-20 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[38px] left-[calc(16.67%+30px)] right-[calc(16.67%+30px)]">
            <div className="h-px w-full shimmer-line" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`reveal-delay-${i + 1} step-card text-center`}
              >
                <div
                  className="step-icon relative mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-card)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div className="text-blue">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue text-[10px] font-bold text-white shadow-lg shadow-blue/25">
                    {step.number.replace("0", "")}
                  </div>
                </div>
                <h3
                  className="mt-6 text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed max-w-[240px] mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
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
        "AI-powered insights",
        "10 chatbot questions per doc",
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
        "Unlimited chatbot questions",
        "Anomaly detection",
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
        "Priority support",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background orbs */}
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
            Simple, transparent pricing
          </h2>

          {/* Annual toggle */}
          <div
            className="mt-8 inline-flex items-center gap-4 rounded-full border px-5 py-2.5"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            <span
              className="text-sm font-medium transition-colors"
              style={{
                color: annual ? "var(--text-tertiary)" : "var(--text-primary)",
              }}
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
              style={{
                color: annual ? "var(--text-primary)" : "var(--text-tertiary)",
              }}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-500 font-semibold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="reveal mt-14 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto"
        >
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

              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {plan.name}
              </h3>
              <p
                className="mt-1.5 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className="text-5xl font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  ${annual ? plan.yearly : plan.monthly}
                </span>
                <span
                  style={{ color: "var(--text-tertiary)" }}
                  className="text-sm"
                >
                  /mo
                  {annual ? (
                    <span className="text-xs"> billed yearly</span>
                  ) : null}
                </span>
              </div>

              <button
                disabled
                className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold cursor-not-allowed transition-all ${
                  plan.popular
                    ? "bg-blue/10 text-blue border border-blue/20"
                    : "border"
                }`}
                style={
                  plan.popular
                    ? {}
                    : {
                        borderColor: "var(--border)",
                        color: "var(--text-tertiary)",
                        opacity: 0.6,
                      }
                }
              >
                Coming Soon
              </button>

              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue/10">
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

// ─── Email Signup ────────────────────────────────────────────────────────────

function EmailSignup() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;

      setStatus("loading");
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.error);
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
      id="signup"
      className="relative py-28 lg:py-36 border-t overflow-hidden"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "var(--border)",
      }}
    >
      <div className="cta-glow" />

      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6">
        <div
          className="relative mx-auto max-w-2xl rounded-3xl border p-10 sm:p-14 text-center overflow-hidden"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        >
          {/* Decorative gradient corners */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue/5 to-transparent rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-br-3xl pointer-events-none" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-purple-500 mb-6 shadow-lg shadow-blue/20">
              <Mail size={22} className="text-white" />
            </div>

            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Be the first to try Numifi
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              First 100 users get{" "}
              <span className="font-semibold text-blue">
                Pro free for 3 months
              </span>
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-xl border px-5 py-3.5 text-sm transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--input-bg)",
                    color: "var(--text-primary)",
                  }}
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

            {message && (
              <div
                className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
                  status === "success"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {status === "success" && <Check size={14} />}
                {message}
              </div>
            )}
          </div>
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
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Numifi
            </span>
            <p className="mt-2 text-sm max-w-[240px]" style={{ color: "var(--text-tertiary)" }}>
              AI-powered financial document conversion and analysis.
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
                {["Features", "Pricing", "Blog"].map((link) => (
                  <a
                    key={link}
                    href={link === "Blog" ? "#" : `#${link.toLowerCase()}`}
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
      <EmailSignup />
      <Footer />
    </div>
  );
}
