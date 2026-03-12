"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; href: string; highlight?: boolean }[] = [
    { label: "Features", href: "/#features" },
    { label: "Convert", href: "/convert", highlight: true },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
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
        <a
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Numifi
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-[0.8125rem] font-medium transition-colors ${
                link.highlight
                  ? "bg-blue/10 text-blue hover:bg-blue/[0.15]"
                  : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              }`}
              style={link.highlight ? {} : { color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

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
            href="/#waitlist"
            className="hidden rounded-full bg-blue px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-all duration-200 hover:bg-blue-hover hover:shadow-lg hover:shadow-blue/25 sm:inline-flex items-center gap-2"
          >
            Join Waitlist
          </a>

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

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-80" : "max-h-0"
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
            href="/#waitlist"
            onClick={() => setMobileOpen(false)}
            className="block rounded-full bg-blue mt-2 px-4 py-2.5 text-center text-sm font-medium text-white"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}
