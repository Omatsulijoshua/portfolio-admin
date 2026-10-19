"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Shield } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkAdmin = () => {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("joshua_studio_admin_session="));
      setIsAdmin(match?.split("=")[1] === "authenticated");
    };

    window.addEventListener("scroll", handleScroll);
    checkAdmin();

    // Re-check cookie on visibility change or routing
    const interval = setInterval(checkAdmin, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleResumeDownload = () => {
    // Standard mock CV file or dynamic link
    // Users can customize this later, we will use a sample file path
    const link = document.createElement("a");
    link.href = "/joshuas-resume.pdf";
    link.download = "Joshua's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-neon flex items-center justify-center shadow-lg shadow-neon-blue/20">
            <Terminal size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-neon-cyan transition-colors leading-none">
              Emerald Code<span className="text-gradient-neon font-extrabold">Studio</span>
            </span>
            <span className="text-[9px] text-gray-500 font-mono tracking-wider uppercase mt-1 leading-none group-hover:text-gray-400 transition-colors">
              by Omatsuli Joshua
            </span>
          </div>
        </Link>



        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLink"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-neon rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / Admin Link */}
        <div className="hidden md:flex items-center space-x-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs font-semibold text-neon-cyan border border-neon-cyan/20 transition-all"
            >
              <Shield size={13} />
              <span>Admin Panel</span>
            </Link>
          )}
          {!isAdmin && (
            <Link
              href="/admin/login"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs font-semibold text-neon-cyan border border-neon-cyan/20 transition-all"
            >
              <Shield size={13} />
              <span>Admin Panel</span>
            </Link>
          )}

          <button
            onClick={handleResumeDownload}
            type="button"
            className="neon-btn px-5 py-2 rounded-md bg-gradient-neon text-white text-sm font-semibold hover:shadow-lg hover:shadow-neon-purple/20 transition-all"
          >
            Download CV
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2 md:hidden text-gray-300 hover:text-white transition-colors focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-panel border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-semibold py-2 transition-colors ${
                      isActive ? "text-neon-cyan" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-[1px] bg-white/5 my-2" />

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 py-3 rounded-md bg-white/5 text-sm font-semibold text-neon-cyan border border-neon-cyan/20"
                >
                  <Shield size={15} />
                  <span>Admin Panel</span>
                </Link>
              )}

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleResumeDownload();
                }}
                type="button"
                className="w-full text-center py-3 rounded-md bg-gradient-neon text-white text-sm font-semibold"
              >
                Download CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
