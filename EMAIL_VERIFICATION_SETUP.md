# Email Verification Setup Guide

## 🎯 Overview
Email verification system has been implemented to prevent fake/unknown email registrations. Users must verify their email before logging in.

## ✅ What's Been Added

### 1. Database Changes
- `emailVerified` - Boolean flag (default: false)
- `verificationToken` - Unique token for verification
- `verificationExpires` - Token expiry time (24 hours)

### 2. New API Endpoints
- `POST /api/verify-email` - Verify email with token
- `POST /api/resend-verification` - Resend verification email

### 3. New Pages
- `/verify-email` - Email verification page

### 4. Updated Features
- **Registration**: Sends verification email after signup
- **Login**: Blocks unverified users with resend option
- **OAuth**: Auto-verifies Google/GitHub users

## 🚀 Setup Instructions

### Step 1: Run Database Migration

**Option A: Using Supabase SQL Editor (Recommended)**
1. Go to Supabase Dashboard → SQL Editor
2. Copy the SQL from `prisma/migrations/add_email_verification.sql`
3. Run the query

**Option B: Using Prisma CLI**
```bash
npx prisma migrate dev --name add_email_verification
npx prisma generate
```

### Step 2: Verify Email Configuration

Make sure these are set in your `.env` file:
```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
NEXTAUTH_URL="http://localhost:3000"  # or your production URL
```

### Step 3: Test the System

1. **Register a new user**
   - Go to `/register`
   - Fill in details
   - Submit form
   - Check email for verification link

2. **Verify email**
   - Click link in email
   - Should redirect to verification page
   - Then redirect to login

3. **Try logging in without verification**
   - Should show error message
   - Option to resend verification email

## 📧 Email Template

The verification email includes:
- Professional HTML design
- Verification button
- Fallback link
- 24-hour expiry notice
- MediScript-E branding

## 🔒 Security Features

### Implemented
✅ Unique verification tokens (32-byte random hex)
✅ Token expiry (24 hours)
✅ One-time use tokens (deleted after verification)
✅ Email format validation
✅ Prevents login without verification
✅ OAuth users auto-verified
✅ Resend verification option

### Token Generation
```typescript
crypto.randomBytes(32).toString("hex")
// Example: "a1b2c3d4e5f6..."
```

## 🎨 User Flow

### New User Registration
```
1. User fills registration form
2. System creates account (emailVerified: false)
3. Generates verification token
4. Sends verification email
5. Shows success message
6. User clicks email link
7. Token verified → emailVerified: true
8. User can now login
```

### Login Attempt (Unverified)
```
1. User enters credentials
2. System checks emailVerified
3. If false → Show error + Resend button
4. User clicks "Resend Verification Email"
5. New token generated
6. New email sent
```

### OAuth Login (Google/GitHub)
```
1. User clicks OAuth button
2. Authenticates with provider
3. System creates/finds user
4. Sets emailVerified: true (auto-verified)
5. User logged in immediately
```

## 🛠️ API Usage

### Verify Email
```typescript
POST /api/verify-email
Body: { token: "verification-token-here" }

Response (Success):
{
  "message": "Email verified successfully! You can now login."
}

Response (Error):
{
  "message": "Invalid verification token"
}
```

### Resend Verification
```typescript
POST /api/resend-verification
Body: { email: "user@example.com" }

Response (Success):
{
  "message": "Verification email sent! Please check your inbox."
}

Response (Error):
{
  "message": "Email already verified"
}
```

## 📝 Code Examples

### Check if User is Verified
```typescript
const user = await db.user.findUnique({
  where: { email: "user@example.com" }
});

if (!user.emailVerified) {
  throw new Error("Please verify your email");
}
```

### Generate New Token
```typescript
import crypto from "crypto";

const verificationToken = crypto.randomBytes(32).toString("hex");
const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

await db.user.update({
  where: { id: userId },
  data: { verificationToken, verificationExpires }
});
```

## 🐛 Troubleshooting

### Email Not Received
1. Check spam/junk folder
2. Verify EMAIL_USER and EMAIL_PASS in .env
3. Check Gmail "Less secure app access" or use App Password
4. Check server logs for email errors

### Token Expired
- Tokens expire after 24 hours
- User can request new token via "Resend Verification Email"

### Already Verified Error
- User trying to verify again
- Check database: `SELECT emailVerified FROM "User" WHERE email = '...'`

### OAuth Users Can't Login
- OAuth users should be auto-verified
- Check `src/lib/auth.ts` - line with `emailVerified: true`

## 📊 Database Queries

### Check Verification Status
```sql
SELECT email, "emailVerified", "verificationExpires" 
FROM "User" 
WHERE email = 'user@example.com';
```

### Manually Verify User (Emergency)
```sql
UPDATE "User" 
SET "emailVerified" = true, 
    "verificationToken" = NULL, 
    "verificationExpires" = NULL 
WHERE email = 'user@example.com';
```

### Find Unverified Users
```sql
SELECT email, "createdAt" 
FROM "User" 
WHERE "emailVerified" = false 
ORDER BY "createdAt" DESC;
```

### Clean Expired Tokens (Optional Cron Job)
```sql
UPDATE "User" 
SET "verificationToken" = NULL, 
    "verificationExpires" = NULL 
WHERE "verificationExpires" < NOW() 
  AND "emailVerified" = false;
```

## 🔄 Migration for Existing Users

If you have existing users, you can:

**Option 1: Auto-verify all existing users**
```sql
UPDATE "User" SET "emailVerified" = true WHERE "emailVerified" = false;
```

**Option 2: Send verification emails to all**
```typescript
// Create a script to send emails to all unverified users
const unverifiedUsers = await db.user.findMany({
  where: { emailVerified: false }
});

for (const user of unverifiedUsers) {
  const token = crypto.randomBytes(32).toString("hex");
  await db.user.update({
    where: { id: user.id },
    data: { 
      verificationToken: token,
      verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  });
  await sendVerificationEmail(user.email, token);
}
```

## 📈 Future Enhancements

Consider adding:
- [ ] Email verification reminder (after 24 hours)
- [ ] Account deletion for unverified users (after 7 days)
- [ ] Rate limiting on resend verification
- [ ] Email change verification
- [ ] Two-factor authentication (2FA)
- [ ] SMS verification as alternative

## 🎉 Benefits

✅ **Prevents Fake Registrations**: Only real emails can register
✅ **Reduces Spam**: Bots can't create accounts easily
✅ **Email Ownership**: Confirms user owns the email
✅ **Better Security**: Adds extra layer of verification
✅ **Professional**: Industry-standard practice
✅ **User Trust**: Shows platform is secure

## 📞 Support

If you face any issues:
1. Check server logs: `npm run dev`
2. Check database: Supabase Dashboard
3. Test email sending: Send test email manually
4. Verify environment variables are set correctly

---

**Implementation Complete! ✅**

All files have been created and updated. Follow the setup instructions above to activate the email verification system.
