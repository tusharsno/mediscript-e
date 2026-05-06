-- Professional Admin Seeding Script
-- Run this in Supabase SQL Editor

-- Create or update admin account
INSERT INTO "User" (id, email, name, password, role, "emailVerified", "verificationToken", "verificationExpires", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@mediscript.com',
  'System Administrator',
  '$2a$10$YourHashedPasswordHere', -- Will be replaced by script
  'ADMIN',
  true,
  NULL,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (email) 
DO UPDATE SET
  role = 'ADMIN',
  "emailVerified" = true,
  "verificationToken" = NULL,
  "verificationExpires" = NULL,
  "updatedAt" = NOW();

-- Verify admin was created
SELECT id, email, name, role, "emailVerified" 
FROM "User" 
WHERE email = 'admin@mediscript.com';
