-- Auto-verify all existing users (created before email verification was implemented)
-- This ensures admin and other existing users can login immediately

UPDATE "User" 
SET "emailVerified" = true 
WHERE "emailVerified" = false;

-- Verify the update
SELECT email, "emailVerified", role 
FROM "User" 
ORDER BY "createdAt" ASC;
