import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Clock, ArrowRight } from "lucide-react";
import BlogGrid from "./BlogGrid";

export const metadata: Metadata = {
  title: "Blog — Numifi",
  description:
    "Insights on AI-powered document conversion, financial data automation, and more from the Numifi team.",
  openGraph: {
    title: "Blog — Numifi",
    description:
      "Insights on AI-powered document conversion, financial data automation, and more from the Numifi team.",
    type: "website",
    url: "https://numifi.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-16 text-center">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            The Numifi <span className="gradient-text">Blog</span>
          </h1>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Insights on financial document automation, AI, and data workflows.
          </p>
        </div>

        {posts.length === 0 ? (
          <div
            className="mx-auto max-w-md rounded-2xl border p-12 text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <p
              className="text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Coming soon
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              We&apos;re working on our first posts. Check back soon!
            </p>
          </div>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </main>

      <footer
        className="border-t py-8 text-center text-sm"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-tertiary)",
        }}
      >
        &copy; {new Date().getFullYear()} Numifi. All rights reserved.
      </footer>
    </div>
  );
}
