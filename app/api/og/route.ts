import { NextRequest, NextResponse } from "next/server";
import { fetchOpenGraphDataServer } from "@/lib/og-server";

export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Fetch Open Graph data using server-side function
    const ogData = await fetchOpenGraphDataServer(url);

    if (!ogData) {
      return NextResponse.json({ error: "Failed to fetch Open Graph data" }, { status: 500 });
    }

    return NextResponse.json(ogData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Open Graph data:", error);
    return NextResponse.json({ error: "Failed to fetch Open Graph data" }, { status: 500 });
  }
}
