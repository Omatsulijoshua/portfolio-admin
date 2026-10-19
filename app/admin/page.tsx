import React from "react";
import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/dbService";
import { Project, Category, Message } from "@/types";
import { 
  Briefcase, 
  ListTodo, 
  MessageSquare, 
  Star, 
  ArrowUpRight, 
  Clock, 
  Mail,
  Eye,
  Users
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let projects: Project[] = [];
  let categories: Category[] = [];
  let messages: Message[] = [];
  let analyticsStats = { totalViews: 0, uniqueVisitors: 0, popularPages: [] as { path: string; count: number }[] };

  try {
    projects = await dbService.getProjects();
    categories = await dbService.getCategories();
    messages = await dbService.getMessages();
    analyticsStats = await dbService.getPageViewStats();
  } catch (error) {
    console.error("Failed to load admin dashboard overview statistics:", error);
  }

  // Calculate statistics
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const totalCategories = categories.length;
  const totalMessages = messages.length;

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: <Briefcase size={20} className="text-neon-cyan" />, href: "/admin/projects" },
    { label: "Featured Projects", value: featuredProjects, icon: <Star size={20} className="text-neon-purple" />, href: "/admin/projects" },
    { label: "Total Categories", value: totalCategories, icon: <ListTodo size={20} className="text-neon-blue" />, href: "/admin/categories" },
    { label: "Inbox Messages", value: totalMessages, icon: <MessageSquare size={20} className="text-yellow-400" />, href: "/admin/messages" },
    { label: "Total Page Views", value: analyticsStats.totalViews, icon: <Eye size={20} className="text-neon-cyan" />, href: "#popular-pages" },
    { label: "Unique Visitors", value: analyticsStats.uniqueVisitors, icon: <Users size={20} className="text-neon-purple" />, href: "#popular-pages" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
          Overview Analytics
        </h1>
        <p className="text-gray-400 text-sm">
          System telemetry and content statistics for Emerald Code Studio by Omatsuli Joshua.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            href={stat.href}
            className="group block glass-card rounded-xl p-6 border-white/5 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  {stat.label}
                </span>
                <span className="block text-3xl font-extrabold text-white group-hover:text-neon-cyan transition-colors">
                  {stat.value}
                </span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Uploads Table */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Clock size={18} className="text-neon-cyan" />
              <span>Recent Project Listings</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-neon-cyan hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {projects.slice(0, 4).map((proj) => (
              <div key={proj.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-10 h-10 rounded bg-gray-900 border border-white/5 overflow-hidden shrink-0">
                    <Image
                      src={proj.cover_image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-bold text-white truncate">{proj.title}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{proj.categories?.name || "Software"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {proj.featured && (
                    <span className="px-1.5 py-0.5 rounded bg-neon-purple/20 border border-neon-purple/40 text-[9px] font-bold text-neon-purple uppercase">
                      Featured
                    </span>
                  )}
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                  >
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-8 text-xs text-gray-500">
                No projects listed. Tap projects menu to add one.
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Mail size={18} className="text-neon-purple" />
              <span>Visitor Inquiries</span>
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-neon-purple hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{msg.name}</span>
                  <span className="text-[9px] text-gray-500 font-mono">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ""}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-12 text-xs text-gray-500">
                Inbox is clean. No contact requests.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div id="popular-pages" className="glass-card rounded-2xl p-6 border-white/5 space-y-6">
        <div className="border-b border-white/5 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Eye size={18} className="text-neon-cyan" />
            <span>Most Popular Showcase Routes</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">Detailed visitor route telemetry and page view distribution.</p>
        </div>
        
        <div className="space-y-4">
          {analyticsStats.popularPages.map((page, idx) => {
            const maxCount = analyticsStats.popularPages[0]?.count || 1;
            const percent = Math.max(5, Math.round((page.count / maxCount) * 100));
            
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300 font-semibold truncate max-w-md">{page.path}</span>
                  <span className="text-neon-cyan font-bold">{page.count} views</span>
                </div>
                <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-neon rounded" 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}

          {analyticsStats.popularPages.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500">
              No traffic logs captured yet. Pages will list here as visitors navigate the site.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
