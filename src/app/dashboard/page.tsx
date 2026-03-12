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
    <div className="bg-amber-500/90 text-black px-4 py-2.5 flex items-center justify-center gap-3 text-sm relative">
      <span className="font-medium">
        You&apos;re viewing a demo of Numifi.{" "}
        <span className="hidden sm:inline">Join the waitlist to get early access.</span>
      </span>
      <a
        href="/#waitlist"
        className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-4 py-1 text-xs font-semibold hover:bg-black/20 transition-colors"
      >
        Join Waitlist
        <ArrowRight size={12} />
      </a>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded transition-colors"
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
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[250px] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#0F172A" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/[0.06]">
          <a href="/" className="text-lg font-bold text-white tracking-tight">
            Numifi
          </a>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
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
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === item.id
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
              D
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-200 truncate">Demo User</div>
              <div className="text-[11px] text-gray-500 truncate">demo@numifi.app</div>
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
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white p-1"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>
        <a
          href="/convert"
          className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
        >
          <Upload size={15} />
          Upload Document
        </a>
      </div>
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
    <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400">{label}</span>
        <span className="text-gray-500">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && (
        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-400">
          <TrendingUp size={12} />
          {sub}
        </div>
      )}
    </div>
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
        <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
          <h2 className="text-sm font-semibold text-white mb-4">Recent Documents</h2>
          <div className="space-y-1">
            {RECENT_DOCS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <FileText size={14} className="text-red-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-200 truncate">{doc.name}</div>
                  <div className="text-[11px] text-gray-500">{doc.type} · {doc.date}</div>
                </div>
                {doc.status === "completed" ? (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                    Completed
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                    <Loader2 size={10} className="animate-spin" />
                    Processing
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Spending Chart */}
        <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
          <h2 className="text-sm font-semibold text-white mb-4">Spending by Category</h2>
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
                <span className="text-[11px] text-gray-400 truncate">{d.name}</span>
                <span className="text-[11px] font-medium text-gray-300 ml-auto">${d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
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
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-lg bg-white/[0.05] border border-white/[0.08] pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {DOC_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-white/[0.05] text-gray-400 hover:bg-white/[0.08]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#334155" }}>
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_100px_60px_90px_100px] gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-b border-white/[0.06]">
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
            className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_60px_90px_100px] gap-2 sm:gap-3 items-center px-5 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText size={14} className="text-red-400 shrink-0" />
              <span className="text-sm text-gray-200 truncate">{doc.name}</span>
            </div>
            <span className="text-xs text-gray-400">{doc.type}</span>
            <span className="text-xs text-gray-500">{doc.date}</span>
            <span className="text-xs text-gray-500">{doc.pages}</span>
            <span>
              {doc.status === "completed" ? (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Completed
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 w-fit">
                  <Loader2 size={9} className="animate-spin" />
                  Processing
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Eye size={14} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === doc.name ? null : doc.name)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Export
                  <ChevronDown size={12} />
                </button>
                {openDropdown === doc.name && (
                  <div
                    className="absolute right-0 top-full mt-1 rounded-lg border p-1.5 z-10 min-w-[100px]"
                    style={{ backgroundColor: "#1E293B", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    {["Excel", "CSV", "JSON", "QBO"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full text-left rounded px-3 py-1.5 text-xs text-gray-300 hover:bg-white/[0.06]"
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
          <div className="px-5 py-10 text-center text-sm text-gray-500">No documents found.</div>
        )}
      </div>
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
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock size={14} />
        <span>Feb 1 - Feb 28, 2026</span>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending */}
        <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
          <h3 className="text-sm font-semibold text-white mb-4">Monthly Spending Trend</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SPEND}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "#94A3B8" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Spending"]}
                />
                <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: "#3B82F6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
          <h3 className="text-sm font-semibold text-white mb-4">Income vs Expenses</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_VS_EXPENSE}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }}
                  labelStyle={{ color: "#94A3B8" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Income</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Expenses</div>
          </div>
        </div>
      </div>

      {/* Top Merchants */}
      <div className="rounded-xl p-5" style={{ backgroundColor: "#334155" }}>
        <h3 className="text-sm font-semibold text-white mb-4">Top Merchants</h3>
        <div className="space-y-3">
          {TOP_MERCHANTS.map((m) => {
            const maxAmount = TOP_MERCHANTS[0].amount;
            return (
              <div key={m.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-28 shrink-0 truncate">{m.name}</span>
                <div className="flex-1 h-6 rounded-md overflow-hidden bg-white/[0.04]">
                  <div
                    className="h-full rounded-md bg-blue-500/30 flex items-center px-2.5"
                    style={{ width: `${(m.amount / maxAmount) * 100}%` }}
                  >
                    <span className="text-[11px] font-semibold text-blue-300">${m.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Anomalies */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Anomalies Detected</h3>
        <div className="rounded-xl p-4 border border-amber-500/20 bg-amber-500/[0.05] flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-amber-300">Unusual charge</div>
            <div className="text-xs text-gray-400 mt-0.5">$2,499.00 at ELECTRONICS STORE on Feb 12 — this is 5x your average transaction</div>
          </div>
        </div>
        <div className="rounded-xl p-4 border border-orange-500/20 bg-orange-500/[0.05] flex items-start gap-3">
          <AlertTriangle size={16} className="text-orange-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-orange-300">Duplicate charge</div>
            <div className="text-xs text-gray-400 mt-0.5">$14.99 at NETFLIX on Feb 1 and Feb 2</div>
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
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mt-0.5">
                <MessageSquare size={12} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-sm"
                  : "rounded-tl-sm text-gray-300"
              }`}
              style={msg.role === "ai" ? { backgroundColor: "#334155" } : {}}
            >
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={k} className="font-semibold text-white">
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
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 py-3 text-center">
              <p className="text-sm text-blue-300 font-medium">Chat will be available when Numifi launches.</p>
              <a href="/#waitlist" className="text-xs text-blue-400 hover:underline mt-1 inline-block">
                Join the waitlist
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your finances..."
            className="flex-1 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50"
          />
          <button
            onClick={handleSend}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
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
    <div className="max-w-2xl space-y-8">
      {/* Profile */}
      <div className="rounded-xl p-6" style={{ backgroundColor: "#334155" }}>
        <h2 className="text-sm font-semibold text-white mb-5">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              value="Demo User"
              disabled
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value="demo@numifi.app"
              disabled
              className="w-full rounded-lg bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Plan */}
      <div className="rounded-xl p-6" style={{ backgroundColor: "#334155" }}>
        <h2 className="text-sm font-semibold text-white mb-3">Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-300">Current Plan: <span className="font-semibold text-white">Preview (Free)</span></div>
            <div className="text-xs text-gray-500 mt-0.5">Limited features. Upgrade for full access.</div>
          </div>
          <a
            href="/#pricing"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Upgrade
          </a>
        </div>
      </div>

      {/* Data */}
      <div className="rounded-xl p-6" style={{ backgroundColor: "#334155" }}>
        <h2 className="text-sm font-semibold text-white mb-3">Data</h2>
        <p className="text-xs text-gray-500 mb-4">
          Permanently delete all uploaded documents and extracted data.
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
          <Trash2 size={14} />
          Delete all my data
        </button>
      </div>

      <p className="text-xs text-gray-600 text-center">
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
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: "#0F172A" }} />}>
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
    <div className="min-h-screen" style={{ backgroundColor: "#1E293B" }}>
      {showBanner && <DemoBanner onDismiss={() => setShowBanner(false)} />}

      <div className="flex h-[calc(100vh-var(--banner-h,0px))]" style={{ "--banner-h": showBanner ? "44px" : "0px" } as React.CSSProperties}>
        <Sidebar tab={tab} onTabChange={setTab} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar title={TAB_TITLES[tab]} onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
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
