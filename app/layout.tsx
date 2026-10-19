import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Omatsuli Joshua",
    template: "%s | Admin Panel",
  },
  description: "Administrative control node for Omatsuli Joshua Portfolio.",
  icons: {
    icon: "/icon.png",
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-bg-dark text-gray-100 font-sans selection:bg-neon-cyan/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
