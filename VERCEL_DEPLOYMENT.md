# 🚀 Vercel Deployment Checklist

## ⚠️ Critical Environment Variables

Vercel e deploy korar age **MUST** set korte hobe:

### 1. Database (Required)
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```
**Note**: Supabase use korle `?pgbouncer=true&connection_limit=1` add koro connection pooling er jonno

### 2. NextAuth (Required)
```env
NEXTAUTH_SECRET="generate-a-strong-random-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
```
**Generate Secret**: `openssl rand -base64 32`

### 3. Supabase Storage (Required)
```env
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 4. Email Service (Optional but Recommended)
```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```
**Note**: Na dile email verification skip hobe, kintu user login korte parbe na

### 5. OAuth Providers (Optional)
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```
**Note**: Na dile shudhu email/password login available hobe

### 6. Cron API (Optional)
```env
CRON_API_KEY="your-secret-key"
```

---

## 📋 Deployment Steps

### Step 1: Vercel e Environment Variables Set Koro
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Uporer sob variables add koro
3. **Production**, **Preview**, **Development** - sob environment e add koro

### Step 2: OAuth Callback URLs Update Koro

**Google Cloud Console:**
- Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

**GitHub Developer Settings:**
- Authorization callback URL: `https://your-app.vercel.app/api/auth/callback/github`

### Step 3: Database Migration Run Koro
```bash
# Local theke production database e migrate koro
npx prisma migrate deploy
```

### Step 4: Deploy to Vercel
```bash
git push origin main
```
Or Vercel Dashboard theke manual deploy koro

---

## 🐛 Common Errors & Solutions

### Error 1: "Cannot find module '@prisma/client'"
**Solution**: 
- `package.json` e `build` script check koro: `"build": "prisma generate && next build"`
- Vercel e redeploy koro

### Error 2: "too many connections"
**Solution**:
- DATABASE_URL e `?pgbouncer=true&connection_limit=1` add koro
- Supabase connection pooling enable koro

### Error 3: "Invalid callback URL"
**Solution**:
- NEXTAUTH_URL production URL set koro (https://your-app.vercel.app)
- OAuth provider e callback URL update koro

### Error 4: "Please verify your email before logging in"
**Solution**:
- EMAIL_USER ebong EMAIL_PASS set koro
- Gmail App Password use koro (not regular password)
- Or manually database e `emailVerified = true` set koro

### Error 5: "Database connection failed"
**Solution**:
- DATABASE_URL correct ache kina check koro
- Supabase e IP whitelist check koro (0.0.0.0/0 allow koro)
- SSL certificate issue hole `?sslmode=require` add koro

---

## ✅ Post-Deployment Verification

1. **Test Registration**: Notun user register koro
2. **Test Email**: Verification email ashe kina check koro
3. **Test Login**: Credentials diye login koro
4. **Test OAuth**: Google/GitHub login test koro
5. **Test Database**: Appointment book koro
6. **Test File Upload**: Medical vault e file upload koro

---

## 🔒 Security Checklist

- ✅ NEXTAUTH_SECRET strong ebong unique
- ✅ Database credentials secure
- ✅ Email credentials App Password (not regular password)
- ✅ OAuth secrets properly configured
- ✅ Environment variables shudhu Vercel e ache (not in code)
- ✅ .env file .gitignore e ache

---

## 📞 Support

Kono issue hole:
1. Vercel logs check koro: Dashboard → Deployments → View Function Logs
2. Browser console check koro
3. Network tab e API response check koro
