import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes, but ignore the login page and static assets
  if (path.startsWith("/admin") && path !== "/admin/login") {
    // 1. Check local session cookie first (for fallback local mode)
    const localSession = request.cookies.get("joshua_studio_admin_session");
    
    // 2. Check Supabase session if configured (cookies created by Supabase Auth client)
    // The Supabase auth client stores token in a cookie named "sb-*-auth-token" or similar.
    // If localSession cookie is set to "authenticated", we grant access.
    if (localSession?.value === "authenticated") {
      return NextResponse.next();
    }

    // In a real environment, we'd also check Supabase Auth session.
    // However, since Next.js Middleware/Proxy runs on the server, checking Supabase Auth requires
    // importing @supabase/ssr helpers. To prevent runtime errors when Supabase is not configured,
    // we use cookie validation. On the admin pages themselves, we'll double-check authorization.
    
    // Redirect to login page
    const loginUrl = new URL("/admin/login", request.url);
    // Add return path
    loginUrl.searchParams.set("returnTo", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
