"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

export const MainLayoutWrapper: React.FC<MainLayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <main className={isAdminRoute ? "flex-grow" : "flex-grow pt-24 pb-12"}>
      {children}
    </main>
  );
};

export default MainLayoutWrapper;
