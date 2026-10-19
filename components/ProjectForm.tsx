"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Star, ShieldAlert, Video, Plus, Trash2, Upload, Link as LinkIcon, Loader } from "lucide-react";
import Link from "next/link";
import { Project, Category, ProjectResource, ProjectResourceType } from "../types";

interface ProjectFormProps {
  initialData?: Project | null;
  categories: Category[];
  onSubmit: (data: Omit<Project, "id" | "created_at" | "categories">) => Promise<void>;
  titleText: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  categories,
  onSubmit,
  titleText,
}) => {
  // Form fields state initialized with initialData if editing
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [shortDescription, setShortDescription] = useState(initialData?.short_description || "");
  const [fullDescription, setFullDescription] = useState(initialData?.full_description || "");
  const [employerNote, setEmployerNote] = useState(initialData?.employer_note || "");
  const [projectHighlightsInput, setProjectHighlightsInput] = useState(initialData?.project_highlights?.join("\n") || "");
  const [techStackInput, setTechStackInput] = useState(initialData?.tech_stack?.join(", ") || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [privateGithub, setPrivateGithub] = useState(initialData?.private_github !== false); // default to true
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [galleryImagesInput, setGalleryImagesInput] = useState(initialData?.gallery_images?.join(", ") || "");
  const [demoVideo, setDemoVideo] = useState(initialData?.demo_video || "");
  const [externalUrl, setExternalUrl] = useState(initialData?.external_url || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || "");
  const [projectResources, setProjectResources] = useState<ProjectResource[]>(initialData?.project_resources || []);
  const [uploadingResourceId, setUploadingResourceId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!initialData) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const resourceTypes: Array<{ value: ProjectResourceType; label: string }> = [
    { value: "apk", label: "Android APK" },
    { value: "app", label: "App / Store" },
    { value: "demo", label: "Live Demo" },
    { value: "repository", label: "Repository" },
    { value: "document", label: "Document" },
    { value: "download", label: "Download" },
    { value: "other", label: "Other" },
  ];

  const addResource = () => {
    setProjectResources((current) => [
      ...current,
      {
        id: `resource-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        label: "",
        type: "apk",
        url: "",
        file_name: null,
        file_size: null,
      },
    ]);
  };

  const updateResource = (id: string, updates: Partial<ProjectResource>) => {
    setProjectResources((current) =>
      current.map((resource) => (resource.id === id ? { ...resource, ...updates } : resource))
    );
  };

  const removeResource = (id: string) => {
    setProjectResources((current) => current.filter((resource) => resource.id !== id));
  };

  const uploadResourceFile = async (resourceId: string, file: File | null) => {
    if (!file) return;

    setUploadingResourceId(resourceId);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-project-resource", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "File upload failed.");
      }

      updateResource(resourceId, {
        url: result.url,
        file_name: result.fileName,
        file_size: result.fileSize,
        label: projectResources.find((resource) => resource.id === resourceId)?.label || file.name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "File upload failed.");
    } finally {
      setUploadingResourceId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !slug || !shortDescription || !fullDescription || !coverImage) {
      setError("Please fill in all required fields (marked with *).");
      return;
    }

    setLoading(true);

    // Clean up comma-separated lists
    const tech_stack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const gallery_images = galleryImagesInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const project_highlights = projectHighlightsInput
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const project_resources = projectResources
      .map((resource) => ({
        ...resource,
        label: resource.label.trim(),
        url: resource.url.trim(),
        description: resource.description?.trim() || null,
        thumbnail_url: resource.thumbnail_url?.trim() || null,
      }))
      .filter((resource) => resource.label && resource.url);

    // Sanitize slug to ensure it is URL-friendly and not a full website URL
    let cleanSlug = slug.trim();
    if (cleanSlug.includes(".") || cleanSlug.includes("/")) {
      // Fallback: slugify the title if the user entered a URL or domain in the slug field
      cleanSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    } else {
      // Standardize the slug format
      cleanSlug = cleanSlug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    if (!cleanSlug) {
      cleanSlug = "project-" + Math.random().toString(36).substring(2, 7);
    }

    try {
      await onSubmit({
        title,
        slug: cleanSlug,
        category_id: categoryId || null,
        short_description: shortDescription,
        full_description: fullDescription,
        employer_note: employerNote || null,
        project_highlights,
        tech_stack,
        featured,
        private_github: privateGithub,
        cover_image: coverImage,
        gallery_images,
        demo_video: demoVideo || null,
        external_url: externalUrl || null,
        github_url: githubUrl || null,
        project_resources,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Workspace</span>
        </Link>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">{titleText}</h2>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Title & Slug Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Project Title *
              </label>
              <input
                type="text"
                placeholder="Aether Wallet"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                URL Slug (Auto Generated) *
              </label>
              <input
                type="text"
                placeholder="aether-wallet"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 bg-black/10 focus:outline-none text-xs font-mono"
                required
                readOnly={!!initialData}
              />
              <p className="text-[10px] text-gray-500 font-sans leading-none mt-1">
                Do NOT enter a full website URL here. Use a simple URL-friendly name like <span className="text-neon-cyan font-mono">midlex-ai</span>.
              </p>
            </div>
          </div>

          {/* Category & Tech Stack Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Domain Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-bg-dark border border-white/5 text-gray-200 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Technologies Used (Comma Separated) *</span>
                <span className="text-[9px] text-neon-cyan lowercase">Next.js, Python, Flutter</span>
              </label>
              <input
                type="text"
                placeholder="Next.js, Tailwind CSS, Supabase"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
                required
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
              Short Description (Card Teaser) *
            </label>
            <input
              type="text"
              placeholder="Brief 1-sentence teaser displaying in listings..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              required
            />
          </div>

          {/* Full Description / Logic */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center justify-between">
              <span>Full Project Specifications *</span>
              <span className="text-[9px] text-gray-500">Supports double linebreaks for paragraphs. Use ## for headers.</span>
            </label>
            <textarea
              rows={8}
              placeholder="## Overview&#10;Describe the project, architectures, and libraries.&#10;&#10;## Key Architecture&#10;- Bullet point 1&#10;- Bullet point 2"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans resize-none"
              required
            />
          </div>

          {/* Employer pitch details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Employer Pitch Note
              </label>
              <textarea
                rows={5}
                placeholder="Why this project proves you can solve real business problems..."
                value={employerNote}
                onChange={(e) => setEmployerNote(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Employer Highlights</span>
                <span className="text-[9px] text-gray-500">One per line</span>
              </label>
              <textarea
                rows={5}
                placeholder="Built authentication and admin dashboard&#10;Added downloadable Android APK for testing&#10;Optimized loading and data flow"
                value={projectHighlightsInput}
                onChange={(e) => setProjectHighlightsInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans resize-none"
              />
            </div>
          </div>

          {/* Toggles Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
            {/* Featured toggle */}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-1 w-4 h-4 text-neon-purple rounded border-white/10 bg-bg-dark focus:ring-0"
              />
              <div>
                <span className="block text-xs font-bold text-white flex items-center space-x-1">
                  <Star size={12} className="text-neon-purple fill-neon-purple" />
                  <span>Feature on homepage</span>
                </span>
                <span className="text-[10px] text-gray-500">Places project in the main landing screen spotlight section.</span>
              </div>
            </label>

            {/* GitHub privacy toggle */}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privateGithub}
                onChange={(e) => setPrivateGithub(e.target.checked)}
                className="mt-1 w-4 h-4 text-neon-cyan rounded border-white/10 bg-bg-dark focus:ring-0"
              />
              <div>
                <span className="block text-xs font-bold text-white flex items-center space-x-1">
                  <ShieldAlert size={12} className="text-neon-cyan" />
                  <span>Hide source code (Private Repository)</span>
                </span>
                <span className="text-[10px] text-gray-500">Public details page displays private request banner.</span>
              </div>
            </label>
          </div>

          {/* Cover & Gallery Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Cover Image URL *
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-... (1200x800)"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Gallery Images (Comma Separated URLs)</span>
                <span className="text-[9px] text-gray-500">Optional</span>
              </label>
              <input
                type="text"
                placeholder="https://image1.com, https://image2.com"
                value={galleryImagesInput}
                onChange={(e) => setGalleryImagesInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              />
            </div>
          </div>

          {/* Video & External URLs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center space-x-1 text-gray-400">
                <Video size={12} className="text-neon-purple" />
                <span>Demo Video URL</span>
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=... (Optional)"
                value={demoVideo}
                onChange={(e) => setDemoVideo(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                Live Deployment URL
              </label>
              <input
                type="url"
                placeholder="https://my-app.vercel.app (Optional)"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono flex items-center space-x-1 text-gray-400">
                <ShieldAlert size={12} className="text-neon-cyan" />
                <span>Private repository URL</span>
              </label>
              <input
                type="url"
                placeholder="https://github.com/user/repo-private (Optional)"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs font-sans"
              />
            </div>
          </div>

          {/* Extra test resources */}
          <div className="space-y-4 rounded-xl border border-white/5 bg-white/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <LinkIcon size={15} className="text-neon-cyan" />
                  <span>Employer Test Links & Downloads</span>
                </h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Add APK builds, app store links, live demos, documents, repository links, or any other resource employers can open.
                </p>
              </div>
              <button
                type="button"
                onClick={addResource}
                className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-2 text-[10px] font-bold text-neon-cyan hover:bg-neon-cyan/15"
              >
                <Plus size={13} />
                <span>Add Resource</span>
              </button>
            </div>

            {projectResources.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 px-4 py-6 text-center text-xs text-gray-500">
                No extra test resources yet. Add an APK, live demo, app listing, repo, PDF, or download link.
              </div>
            ) : (
              <div className="space-y-3">
                {projectResources.map((resource) => (
                  <div key={resource.id} className="rounded-lg border border-white/5 bg-bg-dark/60 p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-3 space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          Type
                        </label>
                        <select
                          value={resource.type}
                          onChange={(e) => updateResource(resource.id, { type: e.target.value as ProjectResourceType })}
                          className="w-full px-3 py-2.5 rounded-lg bg-bg-dark border border-white/5 text-gray-200 focus:outline-none focus:border-neon-cyan/50 text-xs"
                        >
                          {resourceTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-4 space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          Button Label
                        </label>
                        <input
                          type="text"
                          placeholder="Download Android APK"
                          value={resource.label}
                          onChange={(e) => updateResource(resource.id, { label: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs"
                        />
                      </div>

                      <div className="md:col-span-5 space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          Link / Uploaded File URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={resource.url}
                          onChange={(e) => updateResource(resource.id, { url: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          Resource Description
                        </label>
                        <input
                          type="text"
                          placeholder="Short note: best for Android phones, public repo, case study, etc."
                          value={resource.description || ""}
                          onChange={(e) => updateResource(resource.id, { description: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          Resource Thumbnail URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://... optional image thumbnail"
                          value={resource.thumbnail_url || ""}
                          onChange={(e) => updateResource(resource.id, { thumbnail_url: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold text-gray-300 hover:text-white">
                          {uploadingResourceId === resource.id ? (
                            <Loader size={13} className="animate-spin text-neon-cyan" />
                          ) : (
                            <Upload size={13} className="text-neon-cyan" />
                          )}
                          <span>{uploadingResourceId === resource.id ? "Uploading..." : "Upload APK/File"}</span>
                          <input
                            type="file"
                            accept=".apk,.aab,.zip,.pdf,.doc,.docx,.exe,.dmg,.ipa,application/vnd.android.package-archive,application/pdf"
                            className="sr-only"
                            disabled={uploadingResourceId === resource.id}
                            onChange={(e) => {
                              uploadResourceFile(resource.id, e.target.files?.[0] || null);
                              e.target.value = "";
                            }}
                          />
                        </label>

                        {resource.file_name && (
                          <span className="text-[10px] text-gray-500">
                            Uploaded: {resource.file_name}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeResource(resource.id)}
                        className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-red-500/10 bg-red-500/5 px-3 py-2 text-[10px] font-bold text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="neon-btn px-6 py-3 rounded-lg bg-gradient-neon text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-neon-blue/10 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{loading ? "Saving Specifications..." : "Save Project specifications"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectForm;
