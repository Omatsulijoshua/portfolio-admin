import { NextResponse } from "next/server";
import { dbService } from "@/lib/dbService";

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Capture requester IP address and User Agent
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    await dbService.trackPageView(path, ip, userAgent);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Analytics tracking API route error:", err);
    return NextResponse.json({ error: err.message || "Failed to log page view" }, { status: 500 });
  }
}
