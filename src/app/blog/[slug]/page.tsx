import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

const SITE_URL = "https://numifi.com";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Numifi Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Numifi",
      url: SITE_URL,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue mb-10 transition-colors hover:opacity-80"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </a>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
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

          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          <div
            className="mt-6 flex flex-wrap items-center gap-5 text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </header>

        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
