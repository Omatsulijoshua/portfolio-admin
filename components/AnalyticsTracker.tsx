"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Exclude admin pages and API routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api") || lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname }),
    }).catch((err) => {
      console.error("Analytics log failed:", err);
    });
  }, [pathname]);

  return null;
}
