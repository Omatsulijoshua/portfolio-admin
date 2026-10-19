"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Code, Cpu, ShieldCheck, Smartphone, Brain, Gamepad, Monitor, Globe, CreditCard, Link2, ArrowRight, Database } from "lucide-react";

export const Hero: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  } as const;


  const heroCategories = [
    { name: "Mobile Apps", slug: "mobile-apps", icon: <Smartphone size={14} className="text-neon-cyan" />, glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-500/30" },
    { name: "AI Automation Systems", slug: "ai-systems", icon: <Brain size={14} className="text-neon-purple" />, glow: "hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:border-purple-500/30" },
    { name: "Games", slug: "games", icon: <Gamepad size={14} className="text-neon-pink" />, glow: "hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:border-pink-500/30" },
    { name: "Desktop Software", slug: "desktop-software", icon: <Monitor size={14} className="text-green-400" />, glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/30" },
    { name: "Web Platforms", slug: "web-platforms", icon: <Globe size={14} className="text-neon-cyan" />, glow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-500/30" },
    { name: "Fintech", slug: "fintech", icon: <CreditCard size={14} className="text-yellow-500" />, glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-500/30" },
    { name: "Web3 & Blockchain", slug: "web3-blockchain", icon: <Link2 size={14} className="text-green-400" />, glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:border-emerald-500/30" },
    { name: "Data Scraping", slug: "data-scraping", icon: <Database size={14} className="text-neon-blue" />, glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:border-blue-500/30" },
  ];

  const floatingBadges = [
    { text: "Flutter Apps", icon: <Cpu className="text-neon-cyan" size={14} />, positionClass: "top-[12%] left-2 sm:-left-12", delay: 0 },
    { text: "AI Workflows", icon: <Sparkles className="text-neon-purple" size={14} />, positionClass: "top-[24%] right-2 sm:-right-12", delay: 0.8 },
    { text: "Backend Systems", icon: <Code className="text-neon-blue" size={14} />, positionClass: "bottom-[24%] left-2 sm:-left-14", delay: 0.4 },
    { text: "Secure Delivery", icon: <ShieldCheck className="text-green-400" size={14} />, positionClass: "bottom-[12%] right-2 sm:-right-14", delay: 1.2 },
  ];


  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden py-12">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.14),transparent_28rem),radial-gradient(circle_at_72%_16%,rgba(20,184,166,0.2),transparent_30rem),linear-gradient(135deg,#fff8f3_0%,#eefcff_48%,#fff7ed_100%)] z-0" />
      
      {/* Neon glowing meshes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 glow-overlay-blue w-[400px] h-[400px]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 glow-overlay-purple w-[400px] h-[400px]" />
      <div className="absolute bottom-[12%] left-[48%] h-[260px] w-[260px] rounded-full bg-orange-300/20 blur-3xl" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="self-center lg:self-start inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/70 border border-orange-200/70 text-xs text-slate-700 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={12} className="text-neon-cyan animate-pulse" />
            <span className="font-semibold tracking-wide">AVAILABLE FOR CONTRACT AND FULL-TIME ROLES</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black tracking-tight text-white leading-[1.05] font-sans"
          >
            Software that is useful, fast, and built to last.
            <span className="block text-gradient-neon font-black">Across web, mobile, AI, and Web3.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-base leading-7 max-w-2xl mx-auto lg:mx-0 font-sans"
          >
            I&apos;m Omatsuli Joshua, a full-stack software engineer creating clean interfaces, reliable backends, automation tools, and business-ready applications.
          </motion.p>

          {/* Quick Domain Directory */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
          >
            {heroCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/projects?category=${cat.slug}`}
                className={`group flex items-center justify-between p-3 rounded-lg bg-white/75 border border-slate-200/70 shadow-sm transition-all duration-300 hover:bg-white ${cat.glow}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-orange-50 flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                    {cat.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                  <span className="text-[10px] text-neon-cyan font-mono font-semibold">Explore</span>
                  <ArrowRight size={10} className="text-neon-cyan" />
                </div>
              </Link>
            ))}
          </motion.div>



          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <Link 
              href="/projects" 
              className="neon-btn px-6 py-3 rounded-lg bg-gradient-neon text-white font-semibold text-sm hover:shadow-lg hover:shadow-neon-blue/20 transition-all flex items-center space-x-1.5"
            >
              <span>Explore Projects</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual Mockups Column */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] flex items-center justify-center">
          {/* Main Mockup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 10, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            className="w-[280px] sm:w-[340px] h-[340px] sm:h-[400px] glass-card rounded-lg p-6 relative overflow-hidden flex flex-col justify-between select-none shadow-2xl border-white/10"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-orange-400" />
            {/* Mockup Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 tracking-wider">portfolio_build.sh</span>

            </div>

            {/* Mockup Code Display */}
            <div className="flex-1 font-mono text-[10px] text-gray-400 py-4 space-y-1.5 overflow-hidden">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-neon-cyan">$ npm run build</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-gray-500">&gt; next-portfolio-v2@1.0.0 build</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-gray-500">&gt; next build</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-green-400">OK Compiled client code</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="text-neon-purple">INFO Generating project pages...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }} className="text-gray-300">OK /projects ready</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-gray-300">OK /projects/[slug] ready</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.0 }} className="text-yellow-400">OK Private code paths protected</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="text-green-400">READY Production build complete</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 4.6, duration: 0.8, repeat: Infinity }} className="w-1.5 h-3 bg-neon-cyan mt-1 inline-block" />
            </div>

            {/* Mockup Footer */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="text-[10px] font-semibold text-gray-400">PROJECT DATA CONNECTED</span>
              </div>
              <span className="text-[10px] text-gray-500">v1.2.6</span>
            </div>
          </motion.div>

          {/* Floating interactive elements */}
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                // Floating animation
                y: [0, -12, 0]
              }}
              transition={{
                opacity: { duration: 0.5, delay: badge.delay },
                scale: { duration: 0.5, delay: badge.delay },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  ease: "easeInOut",
                  delay: badge.delay
                }
              }}
              className={`absolute z-20 px-3 py-1.5 rounded-lg glass-card border-white/10 text-xs font-semibold text-white shadow-xl flex items-center space-x-1.5 cursor-default select-none pointer-events-none ${badge.positionClass}`}
            >
              {badge.icon}
              <span>{badge.text}</span>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Hero;
