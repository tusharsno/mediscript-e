# 🔧 Fix: Vercel TLS Certificate Error

## Problem:
```
Error opening a TLS connection: self-signed certificate in certificate chain
Code: P1011
```

## Root Cause:
Vercel production environment needs explicit SSL configuration for Supabase PostgreSQL connection.

---

## ✅ Solution Steps:

### Step 1: Update Prisma Schema ✅ (Already Done)

File: `prisma/schema.prisma`

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Step 2: Update Vercel Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Update these two variables:

#### DATABASE_URL:
```
postgresql://postgres.frkfjywzcrjzypspvhpl:tu269c%2Byt%3Fx@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require
```

#### DIRECT_URL:
```
postgresql://postgres.frkfjywzcrjzypspvhpl:tu269c%2Byt%3Fx@db.frkfjywzcrjzypspvhpl.supabase.co:5432/postgres?sslmode=require
```

**Key Change**: Added `&sslmode=require` at the end of both URLs

### Step 3: Redeploy

```bash
# Commit changes
git add .
git commit -m "fix: Add SSL configuration for Vercel deployment"
git push origin main

# Vercel will auto-deploy
```

Or manually trigger deployment in Vercel Dashboard.

---

## 🔍 Verification:

After deployment, test:
1. Google OAuth login
2. GitHub OAuth login
3. Email/Password login
4. Database operations

All should work without TLS errors!

---

## 📝 Alternative Solutions (If Above Doesn't Work):

### Option 1: Disable SSL Verification (Not Recommended)
```
DATABASE_URL="...?sslmode=disable"
```

### Option 2: Use Connection Pooling Only
```
DATABASE_URL="...?pgbouncer=true&connection_limit=1"
```

### Option 3: Update Prisma Client
```bash
npm install @prisma/client@latest prisma@latest
npx prisma generate
```

---

## 🎯 Why This Happens:

- **Local**: Direct connection to Supabase (SSL not strictly enforced)
- **Vercel**: Serverless functions need explicit SSL configuration
- **Supabase**: Uses self-signed certificates that need `sslmode=require`

---

## ✅ Final Checklist:

- [x] Update `prisma/schema.prisma` with url and directUrl
- [ ] Update Vercel Environment Variables with `&sslmode=require`
- [ ] Redeploy to Vercel
- [ ] Test OAuth login (Google + GitHub)
- [ ] Test database operations

---

**Status**: Ready to deploy! 🚀
