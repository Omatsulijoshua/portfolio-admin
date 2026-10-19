export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  created_at?: string;
}

export type ProjectResourceType =
  | "apk"
  | "app"
  | "demo"
  | "repository"
  | "document"
  | "download"
  | "other";

export interface ProjectResource {
  id: string;
  label: string;
  url: string;
  type: ProjectResourceType;
  description?: string | null;
  thumbnail_url?: string | null;
  file_name?: string | null;
  file_size?: number | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  short_description: string;
  full_description: string;
  tech_stack: string[];
  featured: boolean;
  private_github: boolean;
  cover_image: string;
  gallery_images: string[];
  demo_video?: string | null;
  external_url?: string | null;
  github_url?: string | null;
  project_highlights?: string[];
  employer_note?: string | null;
  project_resources?: ProjectResource[];
  created_at?: string;
  categories?: Category | null; // Nested category from Supabase join
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}
