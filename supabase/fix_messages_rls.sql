-- Run this in your Supabase Dashboard SQL Editor
-- This will allow your admin panel to read messages even if Supabase Authentication is bypassed.

DROP POLICY IF EXISTS "Allow authenticated admin access to messages" ON messages;
CREATE POLICY "Allow public read access to messages" ON messages FOR SELECT USING (true);
