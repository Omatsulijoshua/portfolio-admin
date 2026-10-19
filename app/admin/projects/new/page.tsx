"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dbService } from "@/lib/dbService";
import ProjectForm from "@/components/ProjectForm";
import { Category, Project } from "@/types";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await dbService.getCategories();
        setCategories(cats);
      } catch (e) {
        console.error("Failed to load categories in project form:", e);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (formData: Omit<Project, "id" | "created_at" | "categories">) => {
    try {
      await dbService.addProject(formData);
      router.push("/admin/projects");
      router.refresh();
    } catch (e) {
      console.error(e);
      throw new Error(e instanceof Error ? e.message : "Failed to create project");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-gray-500 animate-pulse">
        Initializing workspace components...
      </div>
    );
  }

  return (
    <ProjectForm
      categories={categories}
      onSubmit={handleSubmit}
      titleText="Add New Project Showcase"
    />
  );
}
