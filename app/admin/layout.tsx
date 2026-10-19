"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  ListTodo, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  Terminal,
  FileUp
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Projects", href: "/admin/projects", icon: <Briefcase size={18} /> },
    { label: "Categories", href: "/admin/categories", icon: <ListTodo size={18} /> },
    { label: "Messages", href: "/admin/messages", icon: <MessageSquare size={18} /> },
    { label: "CV Manager", href: "/admin/cv", icon: <FileUp size={18} /> },
  ];


  const handleLogout = async () => {
    // 1. Log out of Supabase if configured
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }

    // 2. Clear local session cookies
    const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `joshua_studio_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax${secureFlag}`;
    
    // Redirect to login
    router.push("/admin/login");
    router.refresh();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-bg-dark border-r border-white/5 py-6 px-4 justify-between">
      <div className="space-y-8">
        {/* Brand */}
        <Link href="/admin" className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center">
            <Terminal size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-white leading-none">
              Emerald<span className="text-neon-cyan">Admin</span>
            </span>
            <span className="text-[8px] text-gray-500 font-mono tracking-wider uppercase mt-1 leading-none">
              by Omatsuli Joshua
            </span>
          </div>
        </Link>



        {/* Navigation links */}
        <nav className="flex flex-col space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-neon text-white shadow-md shadow-neon-blue/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div>
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/10"
        >
          <LogOut size={18} />
          <span>Exit Panel</span>
        </button>
      </div>
    </div>
  );

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-bg-dark">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-bg-dark text-gray-100">
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>


      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-6 bg-bg-dark/80 backdrop-blur-md sticky top-0 z-40">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-neon flex items-center justify-center">
              <Terminal size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-white leading-none">
                Emerald<span className="text-neon-cyan">Admin</span>
              </span>
              <span className="text-[8px] text-gray-500 font-mono tracking-wider uppercase mt-0.5 leading-none">
                by Omatsuli Joshua
              </span>
            </div>
          </Link>



          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label={mobileOpen ? "Close admin navigation" : "Open admin navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer side */}
            <div className="relative w-64 max-w-xs h-full z-10 flex flex-col">
              {sidebarContent}
              <button
                onClick={() => setMobileOpen(false)}
                type="button"
                className="absolute top-4 right-[-44px] w-9 h-9 bg-bg-dark border border-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white"
                aria-label="Close admin navigation"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Inner page content container */}
        <main className="flex-grow p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
