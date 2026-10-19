const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

console.log("=========================================");
console.log("Supabase Database Migration Utility");
console.log("=========================================");

// Using the Neon PostgreSQL connection string
const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_I8uECfWwS0RF@ep-young-cake-axyrwp6d-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sqlPath = path.join(__dirname, "../supabase/migration.sql");

console.log("Reading migration SQL file...");
let sql;
try {
  sql = fs.readFileSync(sqlPath, "utf8");
} catch (err) {
  console.error("Failed to read migration.sql:", err.message);
  process.exit(1);
}

console.log("Connecting to Supabase Database via Connection Pooler (IPv4)...");
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL
});

client.connect((err) => {
  if (err) {
    console.error("\nConnection failed!");
    console.error("Error details:", err.message);
    process.exit(1);
  }

  console.log("Connected successfully! Executing database migrations...");
  client.query(sql, (err, res) => {
    if (err) {
      console.error("\nMigration execution failed:", err.message);
    } else {
      console.log("\nDatabase migrations applied successfully! Tables and RLS policies are now live.");
    }

    client.end();
  });
});
