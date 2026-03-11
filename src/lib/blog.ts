import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  metaDescription: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  metaDescription: string;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): BlogPostMeta[] {
  const files = getMarkdownFiles();

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug: data.slug || slug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      author: data.author || "",
      readTime: data.readTime || "",
      tags: data.tags || [],
      metaDescription: data.metaDescription || "",
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = getMarkdownFiles();
  const filename = files.find((f) => {
    const filePath = path.join(BLOG_DIR, f);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);
    const fileSlug = data.slug || f.replace(/\.md$/, "");
    return fileSlug === slug;
  });

  if (!filename) return null;

  const filePath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || filename.replace(/\.md$/, ""),
    title: data.title || "",
    date: data.date || "",
    excerpt: data.excerpt || "",
    author: data.author || "",
    readTime: data.readTime || "",
    tags: data.tags || [],
    metaDescription: data.metaDescription || "",
    content,
  };
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
