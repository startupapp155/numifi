import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json");

type ViewsData = Record<string, number>;

async function getViews(): Promise<ViewsData> {
  try {
    const data = await fs.readFile(VIEWS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveViews(views: ViewsData) {
  await fs.mkdir(path.dirname(VIEWS_FILE), { recursive: true });
  await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2));
}

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const views = await getViews();
  return NextResponse.json({ views: views[slug] || 0 });
}

export async function POST(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const views = await getViews();
  views[slug] = (views[slug] || 0) + 1;
  await saveViews(views);
  return NextResponse.json({ views: views[slug] });
}
