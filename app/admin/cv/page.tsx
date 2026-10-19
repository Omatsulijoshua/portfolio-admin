"use client";

import React, { useState } from "react";
import { FileUp, ShieldCheck, AlertCircle, FileText, Download, CheckCircle2 } from "lucide-react";

export default function AdminCvPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess(false);
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setFile(null);
        return;
      }
      setFile(selected);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload file.");
      }

      setSuccess(true);
      setFile(null);
      // Clean up file input if needed
      const input = document.getElementById("cv-file-input") as HTMLInputElement;
      if (input) input.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
          CV Manager
        </h1>
        <p className="text-gray-400 text-sm">
          Keep your professional details up to date. Re-uploading will automatically replace the CV download across the entire portfolio site.
        </p>
      </div>

      {/* Main Upload Interface */}
      <div className="max-w-2xl">
        <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/5 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon" />

          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileText size={18} className="text-neon-cyan" />
            <span>Upload Updated Resume (PDF)</span>
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Upload Zone */}
            <div className="relative group border-2 border-dashed border-white/10 hover:border-neon-cyan/40 rounded-xl p-8 text-center bg-white/5 transition-all flex flex-col items-center justify-center space-y-3">
              <input
                id="cv-file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-neon-cyan transition-colors">
                <FileUp size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">
                  {file ? file.name : "Click to select or drag and drop"}
                </p>
                <p className="text-[10px] text-gray-500">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Support PDF files only (max 10MB)"}
                </p>
              </div>
            </div>

            {/* Notification messages */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center space-x-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>CV updated successfully! The new version is live on all download buttons.</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <a
                href="/joshuas-resume.pdf"
                target="_blank"
                className="text-xs text-gray-400 hover:text-white flex items-center space-x-1 font-semibold"
              >
                <Download size={13} />
                <span>Inspect Current Live CV</span>
              </a>

              <button
                type="submit"
                disabled={loading || !file}
                className="neon-btn w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-neon text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-neon-blue/10 disabled:opacity-50"
              >
                <ShieldCheck size={14} />
                <span>{loading ? "Publishing CV..." : "Publish New CV"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
