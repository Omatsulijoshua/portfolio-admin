"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "./LucideIcon";
import { Category } from "../types";
import { LayoutGrid } from "lucide-react";

interface CategoryShowcaseProps {
  categories: Category[];
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  } as const;


  // Color mappings for neon glows on hover
  const glowColors: { [key: string]: string } = {
    "mobile-apps": "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-500/40",
    "ai-systems": "hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:border-purple-500/40",
    "games": "hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] hover:border-pink-500/40",
    "desktop-software": "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-500/40",
    "web-platforms": "hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-500/40",
    "fintech": "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-500/40",
  };

  const defaultGlow = "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:border-purple-500/30";

  return (
    <section className="py-20 relative bg-bg-dark/40 border-y border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-overlay-blue w-[500px] h-[500px] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-xs text-neon-cyan font-semibold">
            <LayoutGrid size={12} />
            <span>CATEGORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Project Domains
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Browse through specialized domains representing structured focus areas across my software engineering trajectory.
          </p>
        </div>

        {/* Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {categories.map((cat) => {
            const glowClass = glowColors[cat.slug] || defaultGlow;

            return (
              <motion.div key={cat.id} variants={itemVariants}>
                <Link
                  href={`/projects?category=${cat.slug}`}
                className={`group block glass-card rounded-lg p-6 text-center transition-all duration-300 relative overflow-hidden border border-white/5 ${glowClass}`}
                >
                  {/* Glowing background hint on hover */}
                  <div className="absolute -inset-10 bg-radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%) opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col items-center space-y-4 relative z-10">
                    {/* Icon container with border glow */}
                    <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                      <LucideIcon name={cat.icon || "Folder"} size={26} className="transition-transform group-hover:rotate-6" />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-gray-500 group-hover:text-neon-cyan font-medium transition-colors">
                        Explore Category &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
