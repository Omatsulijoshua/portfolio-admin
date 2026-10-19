const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_I8uECfWwS0RF@ep-young-cake-axyrwp6d-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function fixRLS() {
  try {
    await client.connect();
    console.log("Connected to DB. Fixing RLS for messages table...");
    
    // Drop the restrictive policy
    await client.query(`DROP POLICY IF EXISTS "Allow authenticated admin access to messages" ON messages;`);
    
    // Create a new policy that allows anyone to select (read) messages
    await client.query(`CREATE POLICY "Allow public read access to messages" ON messages FOR SELECT USING (true);`);
    
    console.log("RLS policy for messages table updated successfully!");
  } catch (err) {
    console.error("Error fixing RLS:", err.message);
  } finally {
    await client.end();
  }
}

fixRLS();
