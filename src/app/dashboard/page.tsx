"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Upload,
  Bell,
  Menu,
  X,
  TrendingUp,
  Clock,
  Check,
  ChevronDown,
  Send,
  AlertTriangle,
  Search,
  Loader2,
  Trash2,
  ArrowRight,
  Eye,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import Navbar from "@/components/Navbar";

// ─── Types ──────────────────────────────────────────────────────────────────

type Tab = "home" | "documents" | "analysis" | "chat" | "settings";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <LayoutDashboard size={18} /> },
  { id: "documents", label: "Documents", icon: <FileText size={18} /> },
  { id: "analysis", label: "Analysis", icon: <BarChart3 size={18} /> },
  { id: "chat", label: "Chat", icon: <MessageSquare size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

// ─── Demo Banner ────────────────────────────────────────────────────────────

function DemoBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="px-4 py-2.5 flex items-center justify-center gap-3 text-sm relative"
      style={{
        background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
      }}
    >
      <span className="font-medium text-white">
        You&apos;re viewing a demo of Numifi.{" "}
        <span className="hidden sm:inline">Join the waitlist to get early access.</span>
      </span>
      <a
        href="/#waitlist"
        className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
      >
        Join Waitlist
        <ArrowRight size={12} />
      </a>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded text-white/80 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────

function Sidebar({
  tab,
  onTabChange,
  open,
  onClose,
}: {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto border-r`}
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between h-[72px] px-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Numifi
          </a>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            style={{ color: "var(--text-tertiary)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-all duration-200 ${
                tab === item.id
                  ? "bg-blue/10 text-blue shadow-sm"
                  : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
              }`}
              style={tab !== item.id ? { color: "var(--text-secondary)" } : {}}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              D
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                Demo User
              </div>
              <div className="text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>
                demo@numifi.app
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Top Bar ────────────────────────────────────────────────────────────────

function TopBar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between h-16 px-4 sm:px-6 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 rounded-lg transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          style={{ color: "var(--text-secondary)" }}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          style={{ color: "var(--text-secondary)" }}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue" />
        </button>
        <a
          href="/convert"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25"
        >
          <Upload size={15} />
          Upload Document
        </a>
      </div>
    </div>
  );
}

// ─── Card wrapper (matches feature-card style) ─────────────────────────────

function DashCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${className}`}
      style={{
        background: "var(--feature-card-bg)",
        borderColor: "var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Home Tab ───────────────────────────────────────────────────────────────

const SPENDING_DATA = [
  { name: "Restaurants", value: 1240, color: "#3B82F6" },
  { name: "Groceries", value: 890, color: "#10B981" },
  { name: "Transportation", value: 650, color: "#F59E0B" },
  { name: "Subscriptions", value: 420, color: "#8B5CF6" },
  { name: "Utilities", value: 380, color: "#EF4444" },
  { name: "Other", value: 1450, color: "#6B7280" },
];

const RECENT_DOCS = [
  { name: "Chase_Statement_Feb2026.pdf", type: "Bank Statement", date: "Feb 28, 2026", status: "completed" as const },
  { name: "BofA_CreditCard_Jan2026.pdf", type: "Credit Card", date: "Jan 31, 2026", status: "completed" as const },
  { name: "Invoice_Acme_Corp.pdf", type: "Invoice", date: "Feb 15, 2026", status: "completed" as const },
  { name: "W2_2025_Form.pdf", type: "Tax Form", date: "Feb 1, 2026", status: "completed" as const },
  { name: "Receipt_Office_Supplies.jpg", type: "Receipt", date: "Mar 5, 2026", status: "processing" as const },
];

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <DashCard>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: "rgba(59,130,246,0.08)", color: "#3B82F6" }}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
      {sub && (
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-500">
          <TrendingUp size={12} />
          {sub}
        </div>
      )}
    </DashCard>
  );
}

function HomeTab() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Documents Processed" value="24" sub="+12% this month" icon={<FileText size={16} />} />
        <StatCard label="Transactions Extracted" value="1,847" sub="+8% this month" icon={<BarChart3 size={16} />} />
        <StatCard label="Time Saved" value="18.5 hrs" icon={<Clock size={16} />} />
        <StatCard label="Accuracy Rate" value="99.2%" icon={<Check size={16} />} />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Recent Documents */}
        <DashCard>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Recent Documents
          </h2>
          <div className="space-y-1">
            {RECENT_DOCS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <FileText size={15} className="text-red-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {doc.name}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                    {doc.type} · {doc.date}
                  </div>
                </div>
                {doc.status === "completed" ? (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                    Completed
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-500">
                    <Loader2 size={10} className="animate-spin" />
                    Processing
                  </span>
                )}
              </div>
            ))}
          </div>
        </DashCard>

        {/* Spending Chart */}
        <DashCard>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Spending by Category
          </h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPENDING_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {SPENDING_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {SPENDING_DATA.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>
                  {d.name}
                </span>
                <span className="text-[11px] font-medium ml-auto" style={{ color: "var(--text-secondary)" }}>
                  ${d.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </DashCard>
      </div>
    </div>
  );
}

// ─── Documents Tab ──────────────────────────────────────────────────────────

const ALL_DOCS = [
  { name: "Chase_Statement_Feb2026.pdf", type: "Bank Statement", date: "Feb 28, 2026", pages: 3, status: "completed" as const },
  { name: "BofA_CreditCard_Jan2026.pdf", type: "Credit Card", date: "Jan 31, 2026", pages: 5, status: "completed" as const },
  { name: "Invoice_Acme_Corp.pdf", type: "Invoice", date: "Feb 15, 2026", pages: 1, status: "completed" as const },
  { name: "W2_2025_Form.pdf", type: "Tax Form", date: "Feb 1, 2026", pages: 2, status: "completed" as const },
  { name: "Receipt_Office_Supplies.jpg", type: "Receipt", date: "Mar 5, 2026", pages: 1, status: "processing" as const },
  { name: "Wells_Fargo_Mar2026.pdf", type: "Bank Statement", date: "Mar 10, 2026", pages: 4, status: "completed" as const },
  { name: "Amex_Platinum_Feb2026.pdf", type: "Credit Card", date: "Feb 28, 2026", pages: 7, status: "completed" as const },
  { name: "1099_Freelance_2025.pdf", type: "Tax Form", date: "Jan 28, 2026", pages: 1, status: "completed" as const },
  { name: "Invoice_Client_XYZ.pdf", type: "Invoice", date: "Mar 1, 2026", pages: 2, status: "completed" as const },
  { name: "Receipt_Business_Lunch.jpg", type: "Receipt", date: "Mar 8, 2026", pages: 1, status: "completed" as const },
];

const DOC_FILTERS = ["All", "Bank Statements", "Credit Cards", "Invoices", "Receipts", "Tax Forms"];

function DocumentsTab() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let docs = ALL_DOCS;
    if (filter !== "All") {
      const typeMap: Record<string, string> = {
        "Bank Statements": "Bank Statement",
        "Credit Cards": "Credit Card",
        Invoices: "Invoice",
        Receipts: "Receipt",
        "Tax Forms": "Tax Form",
      };
      docs = docs.filter((d) => d.type === typeMap[filter]);
    }
    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter((d) => d.name.toLowerCase().includes(q));
    }
    return docs;
  }, [filter, search]);

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative max-w-md">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm transition-colors"
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {DOC_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              filter === f
                ? "bg-blue text-white shadow-sm shadow-blue/25"
                : "border"
            }`}
            style={
              filter !== f
                ? {
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                    backgroundColor: "var(--bg-card)",
                  }
                : {}
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <DashCard className="!p-0 overflow-hidden">
        {/* Header */}
        <div
          className="hidden sm:grid grid-cols-[1fr_120px_100px_60px_90px_100px] gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider border-b"
          style={{ color: "var(--text-tertiary)", borderColor: "var(--border)" }}
        >
          <span>Filename</span>
          <span>Type</span>
          <span>Date</span>
          <span>Pages</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {filtered.map((doc) => (
          <div
            key={doc.name}
            className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_60px_90px_100px] gap-2 sm:gap-3 items-center px-5 py-3 border-b transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
            style={{ borderColor: "var(--border-light)" }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText size={14} className="text-red-500 shrink-0" />
              <span className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                {doc.name}
              </span>
            </div>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{doc.type}</span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{doc.date}</span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{doc.pages}</span>
            <span>
              {doc.status === "completed" ? (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                  Completed
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500 w-fit">
                  <Loader2 size={9} className="animate-spin" />
                  Processing
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                style={{ color: "var(--text-tertiary)" }}
              >
                <Eye size={14} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === doc.name ? null : doc.name)}
                  className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-blue"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Export
                  <ChevronDown size={12} />
                </button>
                {openDropdown === doc.name && (
                  <div
                    className="absolute right-0 top-full mt-1 rounded-xl border p-1.5 z-10 min-w-[100px]"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border)",
                      boxShadow: "var(--card-shadow-hover)",
                    }}
                  >
                    {["Excel", "CSV", "JSON", "QBO"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full text-left rounded-lg px-3 py-1.5 text-xs transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm" style={{ color: "var(--text-tertiary)" }}>
            No documents found.
          </div>
        )}
      </DashCard>
    </div>
  );
}

// ─── Analysis Tab ───────────────────────────────────────────────────────────

const MONTHLY_SPEND = [
  { month: "Sep", amount: 3200 },
  { month: "Oct", amount: 3850 },
  { month: "Nov", amount: 3400 },
  { month: "Dec", amount: 4200 },
  { month: "Jan", amount: 4680 },
  { month: "Feb", amount: 5030 },
];

const INCOME_VS_EXPENSE = [
  { month: "Sep", income: 6200, expenses: 3200 },
  { month: "Oct", income: 6200, expenses: 3850 },
  { month: "Nov", income: 6500, expenses: 3400 },
  { month: "Dec", income: 6500, expenses: 4200 },
  { month: "Jan", income: 6800, expenses: 4680 },
  { month: "Feb", income: 6800, expenses: 5030 },
];

const TOP_MERCHANTS = [
  { name: "Amazon", amount: 847 },
  { name: "Whole Foods", amount: 623 },
  { name: "Shell Gas", amount: 412 },
  { name: "Netflix/Spotify", amount: 389 },
  { name: "Uber", amount: 298 },
];

function AnalysisTab() {
  return (
    <div className="space-y-6">
      {/* Date range */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
        <Clock size={14} />
        <span>Feb 1 - Feb 28, 2026</span>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending */}
        <DashCard>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Monthly Spending Trend
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SPEND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    boxShadow: "var(--card-shadow-hover)",
                  }}
                  labelStyle={{ color: "var(--text-tertiary)" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Spending"]}
                />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashCard>

        {/* Income vs Expenses */}
        <DashCard>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Income vs Expenses
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_VS_EXPENSE}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    boxShadow: "var(--card-shadow-hover)",
                  }}
                  labelStyle={{ color: "var(--text-tertiary)" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                />
                <Bar dataKey="income" fill="#10B981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Income
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-blue" /> Expenses
            </div>
          </div>
        </DashCard>
      </div>

      {/* Top Merchants */}
      <DashCard>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Top Merchants
        </h3>
        <div className="space-y-3">
          {TOP_MERCHANTS.map((m) => {
            const maxAmount = TOP_MERCHANTS[0].amount;
            return (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-sm w-28 shrink-0 truncate" style={{ color: "var(--text-secondary)" }}>
                  {m.name}
                </span>
                <div
                  className="flex-1 h-7 rounded-lg overflow-hidden"
                  style={{ backgroundColor: "rgba(59,130,246,0.06)" }}
                >
                  <div
                    className="h-full rounded-lg flex items-center px-3"
                    style={{
                      width: `${(m.amount / maxAmount) * 100}%`,
                      background: "linear-gradient(90deg, rgba(59,130,246,0.15), rgba(59,130,246,0.25))",
                    }}
                  >
                    <span className="text-[11px] font-semibold text-blue">${m.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashCard>

      {/* Anomalies */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Anomalies Detected
        </h3>
        <div
          className="rounded-2xl p-4 border flex items-start gap-3"
          style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "rgba(245,158,11,0.04)" }}
        >
          <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-amber-600 dark:text-amber-400">Unusual charge</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              $2,499.00 at ELECTRONICS STORE on Feb 12 — this is 5x your average transaction
            </div>
          </div>
        </div>
        <div
          className="rounded-2xl p-4 border flex items-start gap-3"
          style={{ borderColor: "rgba(249,115,22,0.2)", backgroundColor: "rgba(249,115,22,0.04)" }}
        >
          <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-orange-600 dark:text-orange-400">Duplicate charge</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              $14.99 at NETFLIX on Feb 1 and Feb 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chat Tab ───────────────────────────────────────────────────────────────

const MOCK_MESSAGES: { role: "user" | "ai"; content: string }[] = [
  {
    role: "user",
    content: "How much did I spend on restaurants in February?",
  },
  {
    role: "ai",
    content:
      "You spent **$1,240.50** on restaurants in February 2026 across 23 transactions. Your top restaurants were:\n\n- Chipotle — $186\n- Starbucks — $142\n- DoorDash — $128\n\nThis is **15% higher** than your January restaurant spending of $1,078.",
  },
  {
    role: "user",
    content: "Show me all transactions over $500",
  },
  {
    role: "ai",
    content:
      "I found **3 transactions** over $500 in February:\n\n- Feb 12 — ELECTRONICS STORE — $2,499.00\n- Feb 1 — RENT PAYMENT — $1,850.00\n- Feb 15 — INSURANCE PREMIUM — $624.00\n\nWould you like me to export these to Excel?",
  },
];

function ChatTab() {
  const [input, setInput] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    setInput("");
    setShowNotice(true);
  }, [input]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[400px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-5 py-4 pr-2">
        {MOCK_MESSAGES.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue to-purple-500 mt-0.5 shadow-sm shadow-blue/25">
                <MessageSquare size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue text-white rounded-tr-sm shadow-sm shadow-blue/20"
                  : "rounded-tl-sm border"
              }`}
              style={
                msg.role === "ai"
                  ? {
                      background: "var(--feature-card-bg)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }
                  : {}
              }
            >
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={k} className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={k}>{part}</span>
                    )
                  )}
                  {j < msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {showNotice && (
          <div className="flex justify-center">
            <div
              className="rounded-2xl border px-5 py-3 text-center"
              style={{
                backgroundColor: "rgba(59,130,246,0.06)",
                borderColor: "rgba(59,130,246,0.15)",
              }}
            >
              <p className="text-sm text-blue font-medium">Chat will be available when Numifi launches.</p>
              <a href="/#waitlist" className="text-xs text-blue/70 hover:text-blue hover:underline mt-1 inline-block">
                Join the waitlist
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your finances..."
            className="flex-1 rounded-xl border px-4 py-3 text-sm transition-colors"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={handleSend}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue text-white hover:bg-blue-hover transition-all duration-200 hover:shadow-lg hover:shadow-blue/25"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Tab ───────────────────────────────────────────────────────────

function SettingsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <DashCard>
        <h2 className="text-sm font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Name
            </label>
            <input
              type="text"
              value="Demo User"
              disabled
              className="w-full rounded-xl border px-4 py-2.5 text-sm cursor-not-allowed opacity-60"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Email
            </label>
            <input
              type="email"
              value="demo@numifi.app"
              disabled
              className="w-full rounded-xl border px-4 py-2.5 text-sm cursor-not-allowed opacity-60"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            />
          </div>
        </div>
      </DashCard>

      {/* Plan */}
      <DashCard>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Plan
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Current Plan:{" "}
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Preview (Free)
              </span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
              Limited features. Upgrade for full access.
            </div>
          </div>
          <a
            href="/#pricing"
            className="rounded-full bg-blue px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25"
          >
            Upgrade
          </a>
        </div>
      </DashCard>

      {/* Data */}
      <DashCard>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Data
        </h2>
        <p className="text-xs mb-4" style={{ color: "var(--text-tertiary)" }}>
          Permanently delete all uploaded documents and extracted data.
        </p>
        <button className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/5 transition-colors">
          <Trash2 size={14} />
          Delete all my data
        </button>
      </DashCard>

      <p className="text-xs text-center" style={{ color: "var(--text-tertiary)" }}>
        Full account management coming soon.
      </p>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const TAB_TITLES: Record<Tab, string> = {
  home: "Dashboard",
  documents: "Documents",
  analysis: "Analysis",
  chat: "AI Chat",
  settings: "Settings",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }} />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) || "home";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const setTab = useCallback(
    (t: Tab) => {
      const url = t === "home" ? "/dashboard" : `/dashboard?tab=${t}`;
      router.push(url);
    },
    [router]
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-alt)" }}>
      {showBanner && <DemoBanner onDismiss={() => setShowBanner(false)} />}

      <div
        className="flex"
        style={{ minHeight: showBanner ? "calc(100vh - 44px)" : "100vh" }}
      >
        <Sidebar tab={tab} onTabChange={setTab} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar title={TAB_TITLES[tab]} onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {tab === "home" && <HomeTab />}
            {tab === "documents" && <DocumentsTab />}
            {tab === "analysis" && <AnalysisTab />}
            {tab === "chat" && <ChatTab />}
            {tab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
