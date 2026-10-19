import { Category, Project, Message } from "../types";
import { mockCategories, mockProjects } from "./mockData";
import { Pool } from "pg";

const IS_SERVER = typeof window === "undefined";
const connectionString = process.env.DATABASE_URL || "";
const isDbConfigured = !!connectionString && (connectionString.startsWith("postgresql://") || connectionString.startsWith("postgres://"));

let pool: Pool | null = null;
if (IS_SERVER && isDbConfigured) {
  try {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  } catch (err) {
    console.error("Failed to initialize pg Pool:", err);
  }
}

// Client-side API caller helper
async function callApi(action: string, payload?: any) {
  const res = await fetch("/api/db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, payload }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

function mapProjectRow(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category_id: row.category_id,
    short_description: row.short_description,
    full_description: row.full_description,
    tech_stack: row.tech_stack || [],
    featured: row.featured,
    private_github: row.private_github,
    cover_image: row.cover_image,
    gallery_images: row.gallery_images || [],
    demo_video: row.demo_video,
    external_url: row.external_url,
    github_url: row.github_url,
    project_highlights: row.project_highlights || [],
    employer_note: row.employer_note,
    project_resources: row.project_resources || [],
    created_at: row.created_at,
    categories: row.cat_id ? {
      id: row.cat_id,
      name: row.cat_name,
      slug: row.cat_slug,
      icon: row.cat_icon,
      created_at: row.cat_created_at
    } : null
  };
}

export const dbService = {
  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    if (!IS_SERVER) {
      try {
        return await callApi("getCategories");
      } catch (err) {
        console.warn("Client categories fetch failed, falling back to local storage:", err);
        const { getLocalCategories } = require("./mockData");
        return getLocalCategories();
      }
    }

    if (!pool) return mockCategories;

    try {
      const res = await pool.query("SELECT * FROM categories ORDER BY name ASC");
      return res.rows as Category[];
    } catch (err) {
      console.error("Database query failed (getCategories), falling back to mock:", err);
      return mockCategories;
    }
  },

  async addCategory(category: Omit<Category, "id" | "created_at">): Promise<Category> {
    if (!IS_SERVER) {
      return callApi("addCategory", { category });
    }

    const id = "cat-" + Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();

    if (!pool) {
      return { id, ...category, created_at: createdAt };
    }

    try {
      const res = await pool.query(
        "INSERT INTO categories (name, slug, icon) VALUES ($1, $2, $3) RETURNING *",
        [category.name, category.slug, category.icon]
      );
      return res.rows[0] as Category;
    } catch (err) {
      console.error("Database insert failed (addCategory):", err);
      throw err;
    }
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    if (!IS_SERVER) {
      return callApi("updateCategory", { id, updates });
    }

    if (!pool) return null;

    try {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      for (const [key, val] of Object.entries(updates)) {
        fields.push(`${key} = $${idx}`);
        values.push(val);
        idx++;
      }

      if (fields.length === 0) return null;

      values.push(id);
      const query = `UPDATE categories SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
      const res = await pool.query(query, values);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Database update failed (updateCategory):", err);
      throw err;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (!IS_SERVER) {
      return callApi("deleteCategory", { id });
    }

    if (!pool) return true;

    try {
      await pool.query("DELETE FROM categories WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("Database delete failed (deleteCategory):", err);
      throw err;
    }
  },

  // --- PROJECTS ---
  async getProjects(): Promise<Project[]> {
    if (!IS_SERVER) {
      try {
        return await callApi("getProjects");
      } catch (err) {
        console.warn("Client projects fetch failed, falling back to local storage:", err);
        const { getLocalProjects } = require("./mockData");
        return getLocalProjects();
      }
    }

    if (!pool) return mockProjects;

    try {
      const query = `
        SELECT p.*, 
               c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c.icon AS cat_icon, c.created_at AS cat_created_at
        FROM projects p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
      `;
      const res = await pool.query(query);
      return res.rows.map(mapProjectRow);
    } catch (err) {
      console.error("Database query failed (getProjects), falling back to mock:", err);
      return mockProjects;
    }
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (!IS_SERVER) {
      try {
        return await callApi("getProjectBySlug", { slug });
      } catch (err) {
        console.warn("Client project fetch failed, falling back to mock:", err);
        const { getLocalProjects } = require("./mockData");
        return getLocalProjects().find((p: any) => p.slug === slug) || null;
      }
    }

    if (!pool) {
      return mockProjects.find((p) => p.slug === slug) || null;
    }

    try {
      const query = `
        SELECT p.*, 
               c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c.icon AS cat_icon, c.created_at AS cat_created_at
        FROM projects p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = $1
        LIMIT 1
      `;
      const res = await pool.query(query, [slug]);
      return res.rows[0] ? mapProjectRow(res.rows[0]) : null;
    } catch (err) {
      console.error("Database query failed (getProjectBySlug):", err);
      return null;
    }
  },

  async addProject(project: Omit<Project, "id" | "created_at" | "categories">): Promise<Project> {
    if (!IS_SERVER) {
      return callApi("addProject", { project });
    }

    if (!pool) {
      const id = "proj-" + Math.random().toString(36).substring(2, 9);
      const createdAt = new Date().toISOString();
      return { id, ...project, created_at: createdAt, categories: null };
    }

    try {
      const query = `
        INSERT INTO projects (
          title, slug, category_id, short_description, full_description, 
          tech_stack, featured, private_github, cover_image, gallery_images, 
          demo_video, external_url, github_url, project_highlights, 
          employer_note, project_resources
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        )
        RETURNING id
      `;
      const params = [
        project.title,
        project.slug,
        project.category_id,
        project.short_description,
        project.full_description,
        project.tech_stack,
        project.featured,
        project.private_github,
        project.cover_image,
        project.gallery_images,
        project.demo_video,
        project.external_url,
        project.github_url,
        project.project_highlights,
        project.employer_note,
        JSON.stringify(project.project_resources || [])
      ];
      
      const insertRes = await pool.query(query, params);
      const newId = insertRes.rows[0].id;
      
      // Fetch full project with category joined
      const selectQuery = `
        SELECT p.*, 
               c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c.icon AS cat_icon, c.created_at AS cat_created_at
        FROM projects p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
      `;
      const res = await pool.query(selectQuery, [newId]);
      return mapProjectRow(res.rows[0]);
    } catch (err) {
      console.error("Database insert failed (addProject):", err);
      throw err;
    }
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    if (!IS_SERVER) {
      return callApi("updateProject", { id, updates });
    }

    if (!pool) return null;

    try {
      const dbUpdates = { ...updates };
      delete dbUpdates.categories; // Remove front-end helper property

      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      for (const [key, val] of Object.entries(dbUpdates)) {
        fields.push(`${key} = $${idx}`);
        if (key === 'project_resources' && typeof val === 'object') {
          values.push(JSON.stringify(val));
        } else {
          values.push(val);
        }
        idx++;
      }

      if (fields.length === 0) return null;

      values.push(id);
      const query = `UPDATE projects SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id`;
      const updateRes = await pool.query(query, values);
      
      if (!updateRes.rows[0]) return null;
      
      // Fetch updated project with category joined
      const selectQuery = `
        SELECT p.*, 
               c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c.icon AS cat_icon, c.created_at AS cat_created_at
        FROM projects p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
      `;
      const res = await pool.query(selectQuery, [updateRes.rows[0].id]);
      return mapProjectRow(res.rows[0]);
    } catch (err) {
      console.error("Database update failed (updateProject):", err);
      throw err;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    if (!IS_SERVER) {
      return callApi("deleteProject", { id });
    }

    if (!pool) return true;

    try {
      await pool.query("DELETE FROM projects WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("Database delete failed (deleteProject):", err);
      throw err;
    }
  },

  // --- MESSAGES ---
  async saveMessage(name: string, email: string, message: string): Promise<Message> {
    if (!IS_SERVER) {
      return callApi("saveMessage", { name, email, message });
    }

    const id = "msg-" + Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();

    if (!pool) {
      return { id, name, email, message, created_at: createdAt };
    }

    try {
      const res = await pool.query(
        "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
        [name, email, message]
      );
      return res.rows[0] as Message;
    } catch (err) {
      console.error("Database insert failed (saveMessage):", err);
      throw err;
    }
  },

  async getMessages(): Promise<Message[]> {
    if (!IS_SERVER) {
      try {
        return await callApi("getMessages");
      } catch (err) {
        console.warn("Client messages fetch failed:", err);
        return [];
      }
    }

    if (!pool) return [];

    try {
      const res = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
      return res.rows as Message[];
    } catch (err) {
      console.error("Database query failed (getMessages):", err);
      return [];
    }
  },

  async deleteMessage(id: string): Promise<boolean> {
    if (!IS_SERVER) {
      return callApi("deleteMessage", { id });
    }

    if (!pool) return true;

    try {
      await pool.query("DELETE FROM messages WHERE id = $1", [id]);
      return true;
    } catch (err) {
      console.error("Database delete failed (deleteMessage):", err);
      throw err;
    }
  },

  // --- ANALYTICS ---
  async trackPageView(pagePath: string, ip: string, userAgent: string): Promise<void> {
    if (!IS_SERVER) {
      return callApi("trackPageView", { pagePath, ip, userAgent });
    }

    if (!pool) return;

    try {
      // Calculate a simple, fast anonymous hash of the IP for GDPR/privacy compliance
      let hash = 0;
      for (let i = 0; i < ip.length; i++) {
        hash = (hash << 5) - hash + ip.charCodeAt(i);
        hash |= 0;
      }
      const ipHash = hash.toString(16);

      await pool.query(
        "INSERT INTO page_views (page_path, ip_hash, user_agent) VALUES ($1, $2, $3)",
        [pagePath, ipHash, userAgent]
      );
    } catch (err) {
      console.error("Database insert failed (trackPageView):", err);
    }
  },

  async getPageViewStats(): Promise<{ totalViews: number; uniqueVisitors: number; popularPages: { path: string; count: number }[] }> {
    if (!IS_SERVER) {
      return callApi("getPageViewStats");
    }

    if (!pool) {
      return { totalViews: 0, uniqueVisitors: 0, popularPages: [] };
    }

    try {
      const viewsRes = await pool.query("SELECT COUNT(*) AS count FROM page_views");
      const visitorsRes = await pool.query("SELECT COUNT(DISTINCT ip_hash) AS count FROM page_views");
      const breakdownRes = await pool.query(`
        SELECT page_path AS path, COUNT(*) AS count 
        FROM page_views 
        GROUP BY page_path 
        ORDER BY count DESC 
        LIMIT 10
      `);

      return {
        totalViews: parseInt(viewsRes.rows[0]?.count || "0", 10),
        uniqueVisitors: parseInt(visitorsRes.rows[0]?.count || "0", 10),
        popularPages: breakdownRes.rows.map((row: any) => ({
          path: row.path,
          count: parseInt(row.count, 10),
        })),
      };
    } catch (err) {
      console.error("Database query failed (getPageViewStats):", err);
      return { totalViews: 0, uniqueVisitors: 0, popularPages: [] };
    }
  },
};
