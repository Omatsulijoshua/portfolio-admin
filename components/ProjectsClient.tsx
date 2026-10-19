"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderOpen, ArrowRight, ShieldAlert } from "lucide-react";
import { Project, Category } from "../types";

interface ProjectsClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export const ProjectsClient: React.FC<ProjectsClientProps> = ({
  initialProjects,
  categories,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State variables
  const [searchQuery, setSearchQuery] = useState("");

  // Derived states
  const selectedCategory = searchParams.get("category") || "all";

  // Filter projects in-render
  const filteredProjects = initialProjects.filter((proj) => {
    // 1. Filter by Category
    if (selectedCategory !== "all") {
      const catMatch = proj.categories?.slug === selectedCategory || proj.category_id === selectedCategory;
      if (!catMatch) return false;
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const searchMatch =
        proj.title.toLowerCase().includes(q) ||
        proj.short_description.toLowerCase().includes(q) ||
        (proj.tech_stack || []).some((tech) => tech.toLowerCase().includes(q));
      if (!searchMatch) return false;
    }

    return true;
  });

  const handleCategorySelect = (categorySlug: string) => {
    // Update URL query parameters
    const params = new URLSearchParams(window.location.search);
    if (categorySlug === "all") {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-10">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
        {/* Search input with glow focus */}
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects, categories, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all font-sans text-sm"
          />
        </div>

        {/* Category Buttons scrollable row */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => handleCategorySelect("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === "all"
                ? "bg-gradient-neon border-transparent text-white shadow-md shadow-neon-blue/10"
                : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.slug
                  ? "bg-gradient-neon border-transparent text-white shadow-md shadow-neon-blue/10"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of items */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group glass-card rounded-lg overflow-hidden flex flex-col h-full hover:-translate-y-1.5 border-white/5"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
                
                {/* Badges container */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-bg-dark/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-gray-300 flex items-center space-x-1">
                    <FolderOpen size={10} className="text-neon-cyan" />
                    <span>{project.categories?.name || "Software"}</span>
                  </span>

                  {project.featured && (
                    <span className="px-2 py-0.5 rounded bg-neon-purple/20 border border-neon-purple/40 text-[9px] font-bold text-neon-purple uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {project.short_description}
                  </p>
                </div>

                {/* Technologies & Details */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech_stack || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>


                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full text-center py-2.5 rounded-lg bg-white/5 group-hover:bg-gradient-neon text-white text-xs font-semibold border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>View Showcase Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 glass-card rounded-lg border-white/5 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mx-auto">
            <ShieldAlert size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-white font-bold text-lg">No projects match</h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search filters or browse other domain categories.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              handleCategorySelect("all");
            }}
            className="text-xs font-semibold text-neon-cyan hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsClient;
