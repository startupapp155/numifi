"use client";

import { useState } from "react";
import { Share2, Link, Check } from "lucide-react";

export default function ShareButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <Share2 size={14} />
        Share
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border p-1.5 shadow-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--card-shadow-hover)",
            }}
          >
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              style={{ color: "var(--text-secondary)" }}
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Link size={14} />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button
              onClick={shareToX}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
            <button
              onClick={shareToLinkedIn}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Share on LinkedIn
            </button>
          </div>
        </>
      )}
    </div>
  );
}
