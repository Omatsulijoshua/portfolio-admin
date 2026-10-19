"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Plus, FileEdit, Trash, Star, ExternalLink } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { Project } from "@/types";

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await dbService.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        await dbService.deleteProject(id);
        loadProjects();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Project Workspace
          </h1>
          <p className="text-gray-400 text-sm">
            Manage projects, update screenshots/metadata, and toggle featured spotlights.
          </p>
        </div>
        <div>
          <Link
            href="/admin/projects/new"
            className="neon-btn px-4 py-2.5 rounded-lg bg-gradient-neon text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-neon-blue/10"
          >
            <Plus size={14} />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Projects List Card */}
      <div className="glass-card rounded-2xl p-6 border-white/5 space-y-4 overflow-hidden">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-white/5 pb-4">
          <Briefcase size={18} className="text-neon-cyan" />
          <span>Active Listings ({projects.length})</span>
        </h2>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500 animate-pulse">
            Retrieving project database listings...
          </div>
        ) : (
          <div>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-500 font-semibold font-mono">
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Tech Stack</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/5 transition-colors group">
                      {/* Project Title & Image */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3 min-w-[200px]">
                          <div className="relative w-12 h-12 rounded bg-gray-900 border border-white/5 overflow-hidden shrink-0">
                            <Image
                              src={proj.cover_image}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="block font-bold text-white leading-normal">{proj.title}</span>
                            <span className="text-[10px] text-gray-500 font-mono">/{proj.slug}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap text-gray-300 text-xs">
                        {proj.categories?.name || <span className="text-gray-600">Unspecified</span>}
                      </td>

                      {/* Tech Stack */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {(proj.tech_stack || []).slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-400 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                          {(proj.tech_stack || []).length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-500 font-mono">
                              +{(proj.tech_stack || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Spotlight State */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {proj.featured ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-neon-purple/10 border border-neon-purple/20 text-[10px] font-bold text-neon-purple uppercase">
                            <Star size={8} className="fill-neon-purple" />
                            <span>Featured</span>
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">Standard</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/projects/${proj.slug}`}
                            target="_blank"
                            className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                            title="View Showcase"
                          >
                            <ExternalLink size={13} />
                          </Link>
                          <Link
                            href={`/admin/projects/edit/${proj.id}`}
                            className="p-1.5 rounded bg-white/5 border border-white/5 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                            title="Edit Project"
                          >
                            <FileEdit size={13} />
                          </Link>
                          <button
                            onClick={() => handleDelete(proj.id)}
                            type="button"
                            className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Project"
                          >
                            <Trash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-16 text-xs text-gray-500">
                        No projects exist in the database. Get started by adding a project.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (hidden on desktop) */}
            <div className="block md:hidden space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4 relative overflow-hidden">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded bg-gray-900 border border-white/5 overflow-hidden shrink-0">
                      <Image
                        src={proj.cover_image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <span className="block font-bold text-white truncate text-sm leading-normal">{proj.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/{proj.slug}</span>
                    </div>
                    {proj.featured && (
                      <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-neon-purple/20 border border-neon-purple/40 text-[9px] font-bold text-neon-purple uppercase">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-y border-white/5 py-3 text-xs">
                    <div>
                      <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-mono">Domain</span>
                      <span className="text-gray-300 font-semibold text-xs leading-normal">
                        {proj.categories?.name || "Unspecified"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-mono">Tech Stack</span>
                      <span className="text-gray-300 font-semibold text-xs leading-normal truncate block">
                        {(proj.tech_stack || []).slice(0, 2).join(", ")}
                        {(proj.tech_stack || []).length > 2 && "..."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-gray-500">
                      Status: <span className={proj.featured ? "text-neon-purple font-semibold" : "text-gray-400"}>{proj.featured ? "Featured" : "Standard"}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-2 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                        title="View Showcase"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/projects/edit/${proj.id}`}
                        className="p-2 rounded bg-white/5 border border-white/5 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                        title="Edit Project"
                      >
                        <FileEdit size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        type="button"
                        className="p-2 rounded bg-white/5 border border-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-16 text-xs text-gray-500">
                  No projects exist in the database. Get started by adding a project.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
