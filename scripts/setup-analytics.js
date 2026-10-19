const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_I8uECfWwS0RF@ep-young-cake-axyrwp6d-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function setupAnalyticsTable() {
  try {
    await client.connect();
    console.log("Connected to Neon DB. Setting up page_views table...");

    // Create the page_views table
    await client.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        page_path TEXT NOT NULL,
        ip_hash TEXT NOT NULL,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);

    // Create index on page_path and created_at to optimize statistics queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (page_path);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at);
    `);

    console.log("Page views analytics table and indices created successfully!");
  } catch (err) {
    console.error("Error setting up analytics table:", err.message);
  } finally {
    await client.end();
  }
}

setupAnalyticsTable();
