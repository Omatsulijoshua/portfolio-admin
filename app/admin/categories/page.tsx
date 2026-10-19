"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash, ListTodo } from "lucide-react";
import { dbService } from "@/lib/dbService";
import { Category } from "@/types";
import { LucideIcon } from "@/components/LucideIcon";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Smartphone");
  const [formError, setFormError] = useState("");

  const presetIcons = ["Smartphone", "Brain", "Gamepad", "Monitor", "Globe", "CreditCard", "Code", "Server", "Database", "Shield"];

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await dbService.getCategories();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-generate slug from name as derived state
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !slug) {
      setFormError("Name and slug are required.");
      return;
    }

    try {
      await dbService.addCategory({ name, slug, icon });
      setName("");
      loadCategories();
    } catch {
      setFormError("Failed to add category. Name or slug might already exist.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? This might affect projects using it.")) {
      try {
        await dbService.deleteCategory(id);
        loadCategories();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
          Category Manager
        </h1>
        <p className="text-gray-400 text-sm">
          Create, view, and delete project domain categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Create Form */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center space-x-1.5">
              <Plus size={18} className="text-neon-cyan" />
              <span>Create Category</span>
            </h2>

            {formError && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {formError}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Mobile Apps"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                URL Slug (Auto Generated)
              </label>
              <input
                type="text"
                placeholder="mobile-apps"
                value={slug}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 bg-black/10 focus:outline-none text-xs font-mono"
                required
                readOnly
              />
            </div>

            {/* Preset Icons dropdown */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Icon representation
              </label>
              <div className="grid grid-cols-5 gap-2 border border-white/5 p-3 rounded-lg bg-white/5">
                {presetIcons.map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setIcon(ic)}
                    className={`w-9 h-9 rounded border flex items-center justify-center transition-colors ${
                      icon === ic
                        ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                        : "bg-white/5 border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    <LucideIcon name={ic} size={16} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="neon-btn w-full py-2.5 rounded-lg bg-gradient-neon text-white font-bold text-xs"
            >
              Add Domain Category
            </button>
          </form>
        </div>

        {/* Right Side: Listing Grid */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-white/5 pb-4 flex items-center space-x-2">
            <ListTodo size={18} className="text-neon-purple" />
            <span>Active Categories</span>
          </h2>

          {loading ? (
            <div className="py-20 text-center text-xs text-gray-500 animate-pulse">
              Retrieving category database entries...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-neon-cyan">
                      <LucideIcon name={cat.icon || "Folder"} size={20} />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white">{cat.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/{cat.slug}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 rounded bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-white/5 lg:opacity-0 lg:group-hover:opacity-100 transition-all"
                    title="Delete Category"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="col-span-2 text-center py-12 text-xs text-gray-500">
                  No domain categories exist yet. Build one on the left.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
