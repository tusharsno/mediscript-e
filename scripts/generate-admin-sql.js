const bcrypt = require('bcryptjs');

const adminEmail = process.env.ADMIN_EMAIL || 'admin@mediscript.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const adminName = process.env.ADMIN_NAME || 'System Administrator';

console.log('🔐 Generating Admin Account SQL...\n');
console.log(`📧 Email: ${adminEmail}`);
console.log(`👤 Name: ${adminName}`);
console.log(`🔑 Password: ${adminPassword}\n`);

const hashedPassword = bcrypt.hashSync(adminPassword, 10);

const sql = `
-- Professional Admin Account Creation
-- Generated on: ${new Date().toISOString()}

INSERT INTO "User" (id, email, name, password, role, "emailVerified", "verificationToken", "verificationExpires", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  '${adminEmail}',
  '${adminName}',
  '${hashedPassword}',
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
  name = '${adminName}',
  password = '${hashedPassword}',
  "emailVerified" = true,
  "verificationToken" = NULL,
  "verificationExpires" = NULL,
  "updatedAt" = NOW();

-- Verify admin was created/updated
SELECT id, email, name, role, "emailVerified" 
FROM "User" 
WHERE email = '${adminEmail}';
`;

console.log('✅ SQL Generated! Copy and run in Supabase SQL Editor:\n');
console.log('─'.repeat(60));
console.log(sql);
console.log('─'.repeat(60));
console.log('\n📋 Instructions:');
console.log('1. Copy the SQL above');
console.log('2. Go to Supabase Dashboard → SQL Editor');
console.log('3. Paste and run the SQL');
console.log('4. Admin account will be created/updated');
console.log('\n✅ Done!');
