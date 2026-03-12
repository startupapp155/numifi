"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  BarChart3,
  MessageSquare,
  Check,
  ArrowRight,
  X,
  FileText,
  Image,
  Shield,
  Sparkles,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// ─── Format Selector ────────────────────────────────────────────────────────

const OUTPUT_FORMATS = [
  { id: "excel", label: "Excel", ext: ".xlsx" },
  { id: "csv", label: "CSV", ext: ".csv" },
  { id: "json", label: "JSON", ext: ".json" },
  { id: "qbo", label: "QBO", ext: ".qbo" },
] as const;

type OutputFormat = (typeof OUTPUT_FORMATS)[number]["id"];

function FormatSelector({
  selected,
  onChange,
}: {
  selected: OutputFormat;
  onChange: (f: OutputFormat) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium mr-1" style={{ color: "var(--text-tertiary)" }}>
        Output:
      </span>
      {OUTPUT_FORMATS.map((fmt) => (
        <button
          key={fmt.id}
          onClick={() => onChange(fmt.id)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            selected === fmt.id
              ? "bg-blue text-white shadow-sm shadow-blue/25"
              : "border hover:border-blue/30 hover:bg-blue/[0.04]"
          }`}
          style={
            selected === fmt.id
              ? {}
              : { borderColor: "var(--border)", color: "var(--text-secondary)" }
          }
        >
          {fmt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Processing Animation ───────────────────────────────────────────────────

const PROCESSING_STEPS = [
  { label: "Uploading document", duration: 1200 },
  { label: "Extracting transactions", duration: 1800 },
  { label: "Categorizing with AI", duration: 1400 },
];

function ProcessingOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step >= PROCESSING_STEPS.length) {
      onComplete();
      return;
    }

    const duration = PROCESSING_STEPS[step].duration;
    const interval = 30;
    const increment = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setStep((s) => s + 1);
          setProgress(0);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-2xl border p-8 animate-[fadeIn_0.2s_ease-out]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 25px 80px -12px rgba(0,0,0,0.4)",
        }}
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-purple-500 mb-6 shadow-lg shadow-blue/20">
            <Loader2 size={24} className="text-white animate-spin" />
          </div>

          <div className="space-y-4 mb-6">
            {PROCESSING_STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  {i < step ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check size={12} className="text-emerald-400" />
                    </div>
                  ) : i === step ? (
                    <div className="h-5 w-5 rounded-full border-2 border-blue border-t-transparent animate-spin" />
                  ) : (
                    <div
                      className="h-5 w-5 rounded-full border-2"
                      style={{ borderColor: "var(--border)" }}
                    />
                  )}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      i <= step ? "var(--text-primary)" : "var(--text-tertiary)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {step < PROCESSING_STEPS.length && (
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--border)" }}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue to-purple-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Waitlist Modal ─────────────────────────────────────────────────────────

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        setMessage(
          "You're on the list! We'll notify you when Numifi launches."
        );
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
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border p-8 animate-[fadeIn_0.2s_ease-out]"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 25px 80px -12px rgba(0,0,0,0.4)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <X size={16} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-purple-500 mb-5 shadow-lg shadow-blue/20">
            <Sparkles size={20} className="text-white" />
          </div>

          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Almost there!
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Numifi is launching soon. Join the waitlist to get access when
            we go live. Early users get{" "}
            <span className="font-semibold text-blue">
              Pro free for 3 months
            </span>
            .
          </p>

          {status === "success" || status === "duplicate" ? (
            <div
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
                status === "success"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-blue/15 text-blue"
              }`}
            >
              <Check size={14} />
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoFocus
                  className="flex-1 rounded-xl border px-4 py-3 text-sm transition-all duration-200 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/40 focus:outline-none focus:border-blue/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">{message}</p>
              )}
            </form>
          )}

          <button
            onClick={onClose}
            className="mt-5 text-sm transition-colors hover:underline"
            style={{ color: "var(--text-tertiary)" }}
          >
            or go back
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Zone ────────────────────────────────────────────────────────────

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf")
    return <FileText size={20} className="text-red-400" />;
  if (["png", "jpg", "jpeg"].includes(ext || ""))
    return <Image size={20} className="text-blue" />;
  return <FileText size={20} style={{ color: "var(--text-tertiary)" }} />;
}

function UploadZone() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("excel");
  const [showProcessing, setShowProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) setFile(selected);
    },
    []
  );

  const handleSample = useCallback(() => {
    const sampleFile = new File(
      [new ArrayBuffer(148992)],
      "chase_statement_march_2026.pdf",
      { type: "application/pdf" }
    );
    setFile(sampleFile);
  }, []);

  const handleConvert = useCallback(() => {
    setShowProcessing(true);
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setShowProcessing(false);
    setShowModal(true);
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <div
        className={`relative mx-auto max-w-3xl rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
          dragOver
            ? "border-blue bg-blue/[0.06] scale-[1.01]"
            : file
            ? "border-white/[0.15] bg-white/[0.02]"
            : "border-white/[0.12] hover:border-white/[0.2] hover:bg-white/[0.01]"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!file) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleSelect}
          className="hidden"
        />

        {file ? (
          <div
            className="flex flex-col items-center justify-center px-8 py-10 sm:px-12 sm:py-12 animate-[fadeIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* File info */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--bg-alt)" }}
              >
                {getFileIcon(file.name)}
              </div>
              <div>
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {file.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06] ml-2"
                style={{ color: "var(--text-tertiary)" }}
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </div>

            {/* Format selector */}
            <div className="mb-8">
              <FormatSelector
                selected={outputFormat}
                onChange={setOutputFormat}
              />
            </div>

            {/* Convert button */}
            <button
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-full bg-blue px-10 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-xl hover:shadow-blue/25 hover:scale-[1.02]"
            >
              Convert to{" "}
              {OUTPUT_FORMATS.find((f) => f.id === outputFormat)?.label}
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-8 py-12 sm:px-12 sm:py-16">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-5 transition-all duration-300 ${
                dragOver ? "bg-blue/20 scale-110" : "bg-white/[0.04]"
              }`}
            >
              <UploadCloud
                size={32}
                className={`transition-all duration-300 ${
                  dragOver ? "text-blue" : ""
                }`}
                style={dragOver ? {} : { color: "var(--text-tertiary)" }}
              />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Drop your financial document here
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              Supports PDF, PNG, JPG — up to 10MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 mb-4"
            >
              Browse files
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSample();
              }}
              className="text-sm font-medium transition-colors hover:underline text-blue/70 hover:text-blue"
            >
              or try with a sample bank statement
            </button>
          </div>
        )}
      </div>

      {/* Trust signal */}
      <div className="mx-auto mt-4 max-w-3xl flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <Shield size={13} style={{ color: "var(--text-tertiary)" }} />
          <span
            className="text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            AES-256 encrypted
          </span>
        </div>
        <span style={{ color: "var(--border)" }}>·</span>
        <span
          className="text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          Auto-deleted in 24h
        </span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span
          className="text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          No data retention
        </span>
      </div>

      {showProcessing && (
        <ProcessingOverlay onComplete={handleProcessingComplete} />
      )}
      {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </>
  );
}

// ─── Feature Cards ──────────────────────────────────────────────────────────

function FeatureCards() {
  const cards = [
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Convert",
      desc: "PDF to Excel, CSV, JSON, or QBO in seconds",
      gradient: "from-blue to-cyan-400",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analyze",
      desc: "Auto-categorize transactions and spot anomalies",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Chat",
      desc: "Ask questions about your financial data in plain English",
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="mx-auto mt-16 max-w-4xl grid gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="feature-card rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg mb-4`}
          >
            {card.icon}
          </div>
          <h3
            className="text-base font-semibold mb-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            {card.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Supported Formats ──────────────────────────────────────────────────────

function SupportedFormats() {
  const formats = ["PDF", "PNG", "JPG", "Excel", "CSV", "JSON", "QBO"];

  return (
    <div className="mx-auto mt-16 max-w-3xl text-center">
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
        style={{ color: "var(--text-tertiary)" }}
      >
        Export to any format
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {formats.map((fmt) => (
          <span
            key={fmt}
            className="rounded-full border px-4 py-1.5 text-xs font-medium transition-colors hover:border-blue/30 hover:bg-blue/[0.04]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ConvertPage() {
  return (
    <div
      className="min-h-screen noise-overlay"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <Navbar />

      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="orb orb-blue -top-[200px] -left-[200px]" />
        <div className="orb orb-purple top-[100px] -right-[150px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-[fadeIn_0.5s_ease-out]">
            <h1
              className="text-[2.25rem] font-bold leading-[1.1] tracking-tight sm:text-[3rem] lg:text-[3.5rem]"
              style={{ color: "var(--text-primary)" }}
            >
              Convert Any Financial Document{" "}
              <span className="gradient-text">in Seconds</span>
            </h1>
            <p
              className="mt-5 text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Bank statements, credit cards, invoices, receipts, tax forms
              — extracted, categorized, and ready to use.
            </p>
          </div>

          {/* Upload Zone */}
          <div className="animate-[fadeIn_0.6s_ease-out_0.1s_both]">
            <UploadZone />
          </div>

          {/* Feature Cards */}
          <div className="animate-[fadeIn_0.6s_ease-out_0.2s_both]">
            <FeatureCards />
          </div>

          {/* Supported Formats */}
          <div className="animate-[fadeIn_0.6s_ease-out_0.3s_both]">
            <SupportedFormats />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 py-10 text-center">
          <p
            className="text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            &copy; 2026 Numifi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
