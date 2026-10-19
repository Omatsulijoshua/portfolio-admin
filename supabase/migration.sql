-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create categories table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  icon text, -- Icon name string (Lucide icon identifier)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  category_id uuid references categories(id) on delete set null,
  short_description text not null,
  full_description text not null,
  tech_stack text[] not null, -- Array of strings (e.g., ['Next.js', 'PostgreSQL'])
  featured boolean default false not null,
  private_github boolean default true not null,
  cover_image text not null, -- URL from supabase storage
  gallery_images text[] default '{}'::text[] not null, -- Array of URLs
  demo_video text, -- URL from supabase storage or external link
  external_url text, -- Live deployment URL
  github_url text, -- Private link (stored in DB, hidden from public responses if desired)
  project_highlights text[] default '{}'::text[] not null, -- Employer-facing wins/features
  employer_note text, -- Short pitch for recruiters/employers
  project_resources jsonb default '[]'::jsonb not null, -- Extra test links, APKs, docs, repos, downloads
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Existing databases can run this safely after the initial migration.
alter table projects
  add column if not exists project_resources jsonb default '[]'::jsonb not null;

alter table projects
  add column if not exists project_highlights text[] default '{}'::text[] not null,
  add column if not exists employer_note text;

-- Create messages table
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies omitted for standard PostgreSQL compatibility (Neon)

-- Create page_views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_path TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at);

