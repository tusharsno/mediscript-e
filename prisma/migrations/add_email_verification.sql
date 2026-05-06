-- Add email verification fields to User table
ALTER TABLE "User" 
ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verificationToken" TEXT,
ADD COLUMN "verificationExpires" TIMESTAMP(3);

-- Create unique index on verificationToken
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");

-- Set existing users as verified (optional - for existing users)
-- UPDATE "User" SET "emailVerified" = true WHERE "emailVerified" = false;
