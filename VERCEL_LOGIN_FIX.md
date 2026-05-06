# 🔧 Vercel Login Issue - Troubleshooting Guide

## ❌ Problem: Login kaj korche na Vercel e deploy korar por

---

## ✅ Step-by-Step Fix

### Step 1: Vercel Environment Variables Check Koro

Vercel Dashboard → Your Project → Settings → Environment Variables

**MUST HAVE these variables:**

```env
# 1. NEXTAUTH_URL (MOST IMPORTANT!)
NEXTAUTH_URL=https://your-app-name.vercel.app

# 2. NEXTAUTH_SECRET
NEXTAUTH_SECRET=your-generated-secret

# 3. DATABASE_URL (with connection pooling)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&connection_limit=1

# 4. DIRECT_URL
DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# 5. Email (if using email verification)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# 6. Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: NEXTAUTH_URL Fix (CRITICAL!)

**Problem**: Tumhar `.env` e `NEXTAUTH_URL="http://localhost:3000"` ache

**Solution**:
1. Vercel Dashboard e jao
2. Settings → Environment Variables
3. `NEXTAUTH_URL` edit koro
4. Value set koro: `https://your-app-name.vercel.app` (tumhar actual Vercel URL)
5. Save koro
6. Redeploy koro

### Step 3: Database Connection String Fix

Supabase use korle DATABASE_URL e **MUST** add koro:
```
?pgbouncer=true&connection_limit=1
```

**Example:**
```
postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### Step 4: Email Verification Issue

Jodi login e "Please verify your email" error ashe:

**Option 1: Email Setup Koro**
- Gmail App Password generate koro (not regular password)
- Vercel e `EMAIL_USER` ebong `EMAIL_PASS` set koro

**Option 2: Manually Verify Koro (Testing er jonno)**
Supabase SQL Editor e run koro:
```sql
UPDATE "User" 
SET "emailVerified" = true 
WHERE email = 'your-test-email@example.com';
```

### Step 5: OAuth Setup (Google/GitHub)

Jodi OAuth use korcho:

**Google Cloud Console:**
1. APIs & Services → Credentials
2. OAuth 2.0 Client IDs → Edit
3. Authorized redirect URIs add koro:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

**GitHub Developer Settings:**
1. Settings → Developer settings → OAuth Apps
2. Authorization callback URL update koro:
   ```
   https://your-app-name.vercel.app/api/auth/callback/github
   ```

### Step 6: Redeploy

Sob environment variables set korar por:
1. Vercel Dashboard → Deployments
2. Latest deployment e 3 dots click koro
3. "Redeploy" select koro
4. "Use existing Build Cache" UNCHECK koro
5. Redeploy button click koro

---

## 🐛 Common Errors & Solutions

### Error 1: "Invalid callback URL"
**Cause**: NEXTAUTH_URL wrong ache
**Fix**: Vercel e NEXTAUTH_URL production URL set koro

### Error 2: "Please verify your email before logging in"
**Cause**: Email verification pending
**Fix**: 
- Email credentials set koro Vercel e
- Or manually database e emailVerified = true set koro

### Error 3: "Internal Server Error" / 500
**Cause**: Database connection issue
**Fix**: 
- DATABASE_URL e `?pgbouncer=true&connection_limit=1` add koro
- Supabase e IP whitelist check koro (0.0.0.0/0 allow koro)

### Error 4: "User not found"
**Cause**: Database e user nai
**Fix**: Notun user register koro

### Error 5: OAuth login redirect loop
**Cause**: OAuth callback URL mismatch
**Fix**: Google/GitHub console e callback URL update koro

---

## 🔍 Debug Steps

### 1. Vercel Function Logs Check Koro
```
Vercel Dashboard → Deployments → Latest → View Function Logs
```

### 2. Browser Console Check Koro
```
F12 → Console tab → Error messages dekho
```

### 3. Network Tab Check Koro
```
F12 → Network tab → /api/auth/signin request dekho
```

### 4. Database Connection Test Koro
Vercel e ekta test API route create koro:
```typescript
// app/api/test-db/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await db.user.count();
    return NextResponse.json({ success: true, userCount: count });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
```

Visit: `https://your-app.vercel.app/api/test-db`

---

## ✅ Final Checklist

- [ ] NEXTAUTH_URL = production URL (https://your-app.vercel.app)
- [ ] NEXTAUTH_SECRET = strong random string
- [ ] DATABASE_URL = correct with ?pgbouncer=true&connection_limit=1
- [ ] EMAIL_USER & EMAIL_PASS = set (if using email verification)
- [ ] OAuth callback URLs = updated in Google/GitHub console
- [ ] Vercel redeploy = done without cache
- [ ] Test user = created and email verified

---

## 📞 Still Not Working?

1. Vercel logs e exact error message dekho
2. Browser console e error dekho
3. Database e user exist kore kina check koro
4. Email verified ache kina check koro

**Quick Test User Create:**
```sql
-- Supabase SQL Editor e run koro
INSERT INTO "User" (id, email, name, password, role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  'test-user-id',
  'test@example.com',
  'Test User',
  '$2a$10$abcdefghijklmnopqrstuvwxyz', -- dummy hash
  'PATIENT',
  true,
  NOW(),
  NOW()
);

INSERT INTO "PatientProfile" (id, "userId", dob, "bloodGroup")
VALUES (
  'test-patient-id',
  'test-user-id',
  NOW(),
  'O+'
);
```

Password: `test123` (bcrypt hash generate koro: https://bcrypt-generator.com/)
