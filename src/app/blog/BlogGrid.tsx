"use client";

import { useRef, useEffect } from "react";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

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

function BlogCard({
  post,
  index,
}: {
  post: BlogPostMeta;
  index: number;
}) {
  const ref = useReveal();
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${(index % 4) + 1}`}
    >
      <a
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border p-8 transition-all duration-400 hover:-translate-y-1 feature-card"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {post.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "rgba(59,130,246,0.08)",
                color: "#3B82F6",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          className="text-xl font-semibold leading-snug mb-3 transition-colors group-hover:text-blue"
          style={{ color: "var(--text-primary)" }}
        >
          {post.title}
        </h2>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-blue opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
            Read More
            <ArrowRight size={14} />
          </span>
        </div>
      </a>
    </div>
  );
}

export default function BlogGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
