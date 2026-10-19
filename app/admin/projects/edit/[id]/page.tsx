"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { dbService } from "@/lib/dbService";
import ProjectForm from "@/components/ProjectForm";
import { Category, Project } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditProjectPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const cats = await dbService.getCategories();
        setCategories(cats);

        const projs = await dbService.getProjects();
        const foundProj = projs.find((p) => p.id === id) || null;
        
        if (foundProj) {
          setProject(foundProj);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error("Failed to load project details for editing:", e);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (formData: Omit<Project, "id" | "created_at" | "categories">) => {
    try {
      await dbService.updateProject(id, formData);
      router.push("/admin/projects");
      router.refresh();
    } catch (e) {
      console.error(e);
      throw new Error(e instanceof Error ? e.message : "Failed to update project data");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-gray-500 animate-pulse">
        Retrieving project specifications...
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="py-20 text-center text-sm text-red-400">
        Project specifications not found in the database.
      </div>
    );
  }

  return (
    <ProjectForm
      initialData={project}
      categories={categories}
      onSubmit={handleSubmit}
      titleText={`Edit Project: ${project.title}`}
    />
  );
}
