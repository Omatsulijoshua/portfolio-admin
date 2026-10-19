"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GithubIcon size={18} />, href: "https://github.com/Omatsulijoshua/", label: "GitHub" },
    { icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/joshua-omatsuli", label: "LinkedIn" },
    { icon: <Mail size={18} />, href: "mailto:joshuaomatsuli01@gmail.com", label: "Email" },
    { icon: <Phone size={18} />, href: "https://wa.me/2348158075936", label: "WhatsApp" },
  ];


  return (
    <footer className="mt-auto border-t border-white/5 bg-bg-dark/50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left column: Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-white">
              Emerald Code Studio by <span className="text-gradient-neon">Omatsuli Joshua</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm text-center md:text-left">
            Building mobile apps, AI automation systems, Web3 products, and dependable web platforms.
          </p>
        </div>

        {/* Center column: Copyright */}
        <div className="text-xs text-gray-400">
          &copy; {currentYear} Emerald Code Studio by Omatsuli Joshua. Selected code samples available on request.
        </div>


        {/* Right column: Socials */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all hover:scale-105"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
