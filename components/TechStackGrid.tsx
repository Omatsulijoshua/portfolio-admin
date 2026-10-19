"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Database, Brain, Globe, Shield } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
}

export const TechStackGrid: React.FC = () => {
  const technologies: TechItem[] = [
    { 
      name: "Next.js", 
      category: "Frontend & Server", 
      icon: <Globe size={24} className="text-white" />, 
      description: "App router architectures, server actions, and incremental static generation." 
    },
    { 
      name: "Flutter", 
      category: "Mobile Native", 
      icon: <Cpu size={24} className="text-neon-cyan" />, 
      description: "Cross-platform iOS and Android compilation with clean architectures." 
    },
    { 
      name: "C#", 
      category: "Desktop & Backend", 
      icon: <Code2 size={24} className="text-neon-blue" />, 
      description: "Native Windows environments, high performance async task scheduling." 
    },
    { 
      name: "Node.js", 
      category: "Microservices", 
      icon: <Code2 size={24} className="text-green-400" />, 
      description: "Low-latency WebSocket servers and cluster thread management." 
    },
    { 
      name: "Python", 
      category: "AI & Scraping", 
      icon: <Brain size={24} className="text-yellow-400" />, 
      description: "Data orchestration scripts, NLP training pipelines, AI automation systems, and comprehensive data scraping (web, image, audio, video)." 
    },
    { 
      name: "Firebase", 
      category: "Cloud Services", 
      icon: <Shield size={24} className="text-orange-400" />, 
      description: "Real-time state channels, cloud logging, and secure edge triggers." 
    },
    { 
      name: "Supabase", 
      category: "Backend-as-a-Service", 
      icon: <Database size={24} className="text-emerald-400" />, 
      description: "Postgres infrastructure, storage bucket pipelines, and Row Level Security." 
    },
    { 
      name: "TensorFlow", 
      category: "AI & Neural Networks", 
      icon: <Brain size={24} className="text-neon-purple" />, 
      description: "Localized model inferencing, text classification, and embedding vectors." 
    },
    { 
      name: "PostgreSQL", 
      category: "Relational Database", 
      icon: <Database size={24} className="text-blue-400" />, 
      description: "Complex table joints, JSONB indexes, and custom stored procedures." 
    },
    { 
      name: "Solidity", 
      category: "Web3 & Smart Contracts", 
      icon: <Code2 size={24} className="text-purple-400" />, 
      description: "Writing security-audited smart contracts, ERC standards, NFT assets, and deploying to Ethereum/EVM chains." 
    },
    { 
      name: "Solana (Rust)", 
      category: "High-Speed On-Chain", 
      icon: <Cpu size={24} className="text-neon-cyan" />, 
      description: "Building low-latency on-chain protocols, Anchor program pipelines, and high-frequency Web3 integrations." 
    },
    { 
      name: "Framer Motion", 
      category: "Motion Graphics & UI", 
      icon: <Globe size={24} className="text-neon-purple" />, 
      description: "Crafting fluid animations, 3D CSS transforms, complex layout transitions, and premium interactive gestures." 
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;


  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-xs text-neon-purple font-semibold">
            <Code2 size={12} />
            <span>ENGINEERING STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Core Technologies
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            A comprehensive list of core runtime languages, frameworks, and databases utilized in active production environments.
          </p>
        </div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="group glass-card rounded-lg p-6 flex flex-col justify-between border-white/5 hover:border-white/10 hover:bg-white/5 transition-all"
            >
              <div className="space-y-4">
                {/* Icon & Category Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold font-mono">
                    {tech.category}
                  </span>
                </div>

                {/* Tech Title & Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackGrid;
