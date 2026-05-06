# 🚀 Deployment Guide

## Vercel Deployment Steps

### 1️⃣ Prepare for Deployment

```bash
# Make sure everything works locally
npm run build
```

### 2️⃣ Push to GitHub

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 3️⃣ Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

---

## 🔐 Environment Variables for Production

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Database (Supabase/Neon/Railway)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth (IMPORTANT: Generate new secret!)
NEXTAUTH_SECRET="generate-new-random-secret-here"
NEXTAUTH_URL="https://your-app.vercel.app"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Email
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# Cron API Key (Generate new!)
CRON_API_KEY="generate-new-random-key"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Generate Secrets:

```bash
# For NEXTAUTH_SECRET and CRON_API_KEY
openssl rand -base64 32
```

---

## 👨‍💼 Create Admin Account in Production

### Method 1: Using Script (Recommended)

After deployment, run this locally with production DATABASE_URL:

```bash
# Set production DATABASE_URL temporarily
export DATABASE_URL="your-production-database-url"

# Run admin creation script
npm run create-admin
```

### Method 2: Using Supabase SQL Editor

1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL:

```sql
-- Generate password hash for 'admin123'
-- Hash: $2a$10$rQZ9vXqZ9vXqZ9vXqZ9vXeO (example, generate your own)

INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@mediscript.com',
  'Admin',
  '$2a$10$K8qvXqZ9vXqZ9vXqZ9vXeOYourHashedPasswordHere',
  'ADMIN',
  NOW(),
  NOW()
);
```

To generate password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

### Method 3: Register as Patient, Then Upgrade

1. Register normally as PATIENT
2. Go to Supabase → Table Editor → User table
3. Find your user and change `role` to `ADMIN`

---

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)

1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy connection string
4. Run migrations:

```bash
# Set DATABASE_URL
export DATABASE_URL="your-supabase-url"

# Run migrations
npx prisma migrate deploy
```

### Option 2: Neon

1. Create database at [neon.tech](https://neon.tech)
2. Copy connection string
3. Run migrations (same as above)

---

## 📧 Email Setup (Gmail)

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Use that password in `EMAIL_PASS`

---

## 🔄 Cron Job Setup (Medicine Reminders)

### Using Vercel Cron:

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/medicine-reminder/send-notifications",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### Using External Cron (cron-job.org):

1. Go to [cron-job.org](https://cron-job.org)
2. Create new cron job
3. URL: `https://your-app.vercel.app/api/medicine-reminder/send-notifications`
4. Schedule: Every 5 minutes
5. Add header: `Authorization: Bearer YOUR_CRON_API_KEY`

---

## ✅ Post-Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Admin account created
- [ ] Admin login works
- [ ] Test patient registration
- [ ] Test doctor registration
- [ ] Test appointment booking
- [ ] Test file upload (Supabase bucket public)
- [ ] Test medicine reminders
- [ ] Test email notifications
- [ ] OAuth login works (if configured)
- [ ] Change default admin password

---

## 🔒 Security Checklist

- [ ] Changed NEXTAUTH_SECRET from default
- [ ] Changed CRON_API_KEY from default
- [ ] Changed admin password from 'admin123'
- [ ] Database SSL enabled
- [ ] Supabase RLS policies configured (optional)
- [ ] CORS configured properly
- [ ] Rate limiting enabled (optional)

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build
```

### Database Connection Error

- Check DATABASE_URL format
- Ensure SSL mode is correct
- Check database is accessible from Vercel

### Admin Login Not Working

- Verify admin account exists in database
- Check password hash is correct
- Try Method 3 (upgrade existing user)

### File Upload Not Working

- Check Supabase bucket is public
- Verify SUPABASE_URL and ANON_KEY
- Check bucket name is 'medical-reports'

---

## 📱 Testing Production

```bash
# Test registration
curl -X POST https://your-app.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"123456","role":"PATIENT"}'

# Test admin login
# Go to: https://your-app.vercel.app/login
# Email: admin@mediscript.com
# Password: admin123
```

---

## 🔄 Update Deployment

```bash
git add .
git commit -m "Update"
git push origin main
```

Vercel will auto-deploy.

---

## 📞 Support

If you face issues:
1. Check Vercel deployment logs
2. Check database logs
3. Check browser console
4. Review SECURITY.md

---

**Important**: After first admin login, immediately change the password in Settings!
