"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="flex items-center gap-1.5">
      <Eye size={14} />
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
