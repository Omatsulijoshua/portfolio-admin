"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, AlertCircle, Loader } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function AdminLoginForm() {

  const router = useRouter();
  const searchParams = useSearchParams();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const returnTo = searchParams.get("returnTo") || "/admin";

    const adminEmails = [
      "joshuaomatsuli01@gmail.com",
      "joshuaomatsuil01@gmail.com",
      "joshuaomatsul01@gmail.com",
    ];

    // 0. Hardcoded Admin Override (prioritized)
    if (adminEmails.includes(email.trim().toLowerCase()) && password === "Jos@56567") {
      const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `joshua_studio_admin_session=authenticated; path=/; max-age=86400; SameSite=Lax${secureFlag}`;
      setTimeout(() => {
        router.push(returnTo);
        router.refresh();
      }, 500);
      return;
    }

    // 1. If Supabase is configured, use real Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }

        // Set session cookie for middleware protection
        const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `joshua_studio_admin_session=authenticated; path=/; max-age=86400; SameSite=Lax${secureFlag}`;
        router.push(returnTo);
        router.refresh();
      } catch {
        setError("An authentication error occurred. Falling back...");
      }
    } else {
      // 2. Demo fallback check
      if (adminEmails.includes(email.trim().toLowerCase()) && password === "Jos@56567") {
        // Set local session cookie for middleware validation
        const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `joshua_studio_admin_session=authenticated; path=/; max-age=86400; SameSite=Lax${secureFlag}`;
        
        setTimeout(() => {
          router.push(returnTo);
          router.refresh();
        }, 800);
      } else {
        setError("Invalid admin credentials. Use joshuaomatsuli01@gmail.com and the admin password.");
        setLoading(false);
      }



    }
  };


  return (
    <div className="max-w-md mx-auto px-6 py-12 space-y-8 flex flex-col justify-center min-h-[60vh]">
      {/* Icon header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-neon flex items-center justify-center shadow-lg shadow-neon-blue/20 mx-auto">
          <Shield size={28} className="text-white" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold font-mono">
            Protected Systems Node
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/5 relative overflow-hidden">
        {/* Neon accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon" />

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start space-x-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}







          {/* Email field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <Mail size={13} />
              <span>Security Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter security email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all text-sm font-sans"
              required
            />



          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <Lock size={13} />
              <span>Secret Passphrase</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all text-sm font-sans"
              required
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="neon-btn w-full py-3 rounded-lg bg-gradient-neon text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader size={15} className="animate-spin" />
                  <span>Authorizing Node...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Authorize Admin Node</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto px-6 py-12 flex flex-col justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-10 h-10 rounded bg-white/5 border border-white/5 flex items-center justify-center animate-pulse mx-auto">
          <Loader size={18} className="animate-spin text-gray-500" />
        </div>
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Syncing Admin Terminal Node...</span>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
