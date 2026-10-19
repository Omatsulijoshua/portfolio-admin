"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Folder } from "lucide-react";
import { Project } from "../types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  } as const;


  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-xs text-neon-purple font-semibold">
              <Star size={12} className="fill-neon-purple" />
              <span>SPOTLIGHT WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              A handpicked selection of production-grade apps, AI setups, and platforms developed to solve real-world problems.
            </p>
          </div>
          
          <Link 
            href="/projects" 
            className="group inline-flex items-center space-x-1 text-sm font-semibold text-neon-cyan hover:text-white transition-colors"
          >
            <span>All Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group glass-card rounded-lg overflow-hidden flex flex-col h-full hover:-translate-y-2 border-white/5"
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
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-bg-dark/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-gray-300 flex items-center space-x-1">
                  <Folder size={10} className="text-neon-cyan" />
                  <span>{project.categories?.name || "Software"}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {project.short_description}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech_stack || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.tech_stack || []).length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400">
                        +{(project.tech_stack || []).length - 4} more
                      </span>
                    )}
                  </div>


                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full text-center py-2.5 rounded-lg bg-white/5 group-hover:bg-gradient-neon text-white text-xs font-semibold border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center space-x-1"
                  >
                    <span>View Project Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
