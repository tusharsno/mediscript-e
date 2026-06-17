# 🔐 Admin Account Management - Professional Guide

## Overview
Professional admin account creation system using Prisma seed scripts. This is the industry-standard approach used by production applications.

---

## 🎯 Features

✅ **Environment-based Configuration** - Admin credentials from `.env` file  
✅ **Idempotent** - Safe to run multiple times  
✅ **Auto-verified** - Admin account pre-verified  
✅ **Secure** - Password hashing with bcryptjs  
✅ **Flexible** - Customizable via environment variables  
✅ **Production-ready** - Works in all environments  

---

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install tsx --save-dev
```

### Step 2: Configure Admin Credentials (Optional)

Edit `.env` file to customize admin credentials:

```env
# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@mediscript.com"
ADMIN_PASSWORD="admin123"
ADMIN_NAME="System Administrator"
```

**Default Values** (if not set in `.env`):
- Email: `admin@mediscript.com`
- Password: `admin123`
- Name: `System Administrator`

### Step 3: Run Seed Command
```bash
npm run seed
```

---

## 📋 What Happens When You Run Seed?

### First Time (No Admin Exists)
```
🌱 Starting database seeding...
📧 Admin Email: admin@mediscript.com
✅ Admin user created successfully!
   ID: clx1234567890
   Email: admin@mediscript.com
   Name: System Administrator
   Role: ADMIN
   Email Verified: true
🏁 Seeding completed!
```

### Subsequent Runs (Admin Already Exists)
```
🌱 Starting database seeding...
📧 Admin Email: admin@mediscript.com
✅ Admin user already exists. Updating if needed...
✅ Admin user updated successfully!
🏁 Seeding completed!
```

---

## 🔧 Usage Scenarios

### Scenario 1: Development Setup
```bash
# Clone repository
git clone <repo-url>
cd mediscript-e

# Install dependencies
npm install

# Run migrations
npx prisma migrate dev

# Create admin account
npm run seed

# Start development server
npm run dev
```

### Scenario 2: Production Deployment
```bash
# Build application
npm run build

# Run migrations
npx prisma migrate deploy

# Create admin account
npm run seed

# Start production server
npm start
```

### Scenario 3: Custom Admin Credentials
```bash
# Set environment variables
export ADMIN_EMAIL="superadmin@company.com"
export ADMIN_PASSWORD="SecurePassword123!"
export ADMIN_NAME="Super Administrator"

# Run seed
npm run seed
```

### Scenario 4: Multiple Environments
```env
# .env.development
ADMIN_EMAIL="admin@localhost.com"
ADMIN_PASSWORD="dev123"

# .env.production
ADMIN_EMAIL="admin@mediscript.com"
ADMIN_PASSWORD="ProductionSecurePassword123!"
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Change default password in production
- Use strong passwords (12+ characters, mixed case, numbers, symbols)
- Store credentials in environment variables
- Use different credentials per environment
- Rotate passwords regularly
- Enable 2FA (if implemented)

### ❌ DON'T:
- Commit `.env` file to Git
- Use default password in production
- Share admin credentials
- Store passwords in plain text
- Use weak passwords

### Production Password Example:
```env
ADMIN_PASSWORD="M3d!Scr1pt@2025#Secure"
```

---

## 📊 Database Schema

Admin user structure:
```typescript
{
  id: "clx1234567890",
  email: "admin@mediscript.com",
  name: "System Administrator",
  password: "$2a$10$...", // bcrypt hashed
  role: "ADMIN",
  emailVerified: true,
  verificationToken: null,
  verificationExpires: null,
  createdAt: "2025-01-13T...",
  updatedAt: "2025-01-13T..."
}
```

---

## 🔍 Verification

### Check Admin Exists
```sql
SELECT id, email, name, role, "emailVerified" 
FROM "User" 
WHERE role = 'ADMIN';
```

### Check Admin Can Login
```sql
SELECT email, "emailVerified", role 
FROM "User" 
WHERE email = 'admin@mediscript.com';
```

Expected result:
```
email                  | emailVerified | role
-----------------------|---------------|------
admin@mediscript.com   | true          | ADMIN
```

---

## 🐛 Troubleshooting

### Error: "tsx: command not found"
```bash
npm install tsx --save-dev
```

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: "Database connection failed"
Check `.env` file:
- `DATABASE_URL` is correct
- Database is running
- Network connectivity

### Admin Already Exists But Can't Login
```bash
# Re-run seed to update admin
npm run seed

# Or manually verify in database
UPDATE "User" 
SET "emailVerified" = true, role = 'ADMIN' 
WHERE email = 'admin@mediscript.com';
```

### Want to Reset Admin Password
```bash
# Update .env with new password
ADMIN_PASSWORD="NewSecurePassword123!"

# Delete existing admin
DELETE FROM "User" WHERE email = 'admin@mediscript.com';

# Re-run seed
npm run seed
```

---

## 🔄 Seed Script Logic

```typescript
1. Read admin credentials from environment variables
2. Check if admin user already exists
3. If exists:
   - Update role to ADMIN
   - Set emailVerified to true
   - Clear verification tokens
4. If not exists:
   - Hash password with bcrypt
   - Create new admin user
   - Set emailVerified to true
   - Set role to ADMIN
5. Log success message
```

---

## 📁 Files Created

1. **`prisma/seed.ts`** - Main seed script
2. **`prisma.config.ts`** - Prisma configuration
3. **`ADMIN_SEEDING_GUIDE.md`** - This documentation

## 📝 Files Modified

1. **`package.json`** - Added seed script and tsx dependency
2. **`.env`** - Added admin credentials

---

## 🎓 Why This Approach is Professional

### Industry Standards
- ✅ Used by Laravel, Django, Ruby on Rails
- ✅ Recommended by Prisma documentation
- ✅ Common in enterprise applications

### Benefits Over Manual Creation
| Manual SQL | Seed Script |
|------------|-------------|
| ❌ Error-prone | ✅ Automated |
| ❌ Not repeatable | ✅ Idempotent |
| ❌ No version control | ✅ Git tracked |
| ❌ Environment-specific | ✅ Environment-agnostic |
| ❌ No validation | ✅ Built-in checks |

### Real-World Examples
- **Laravel**: `php artisan db:seed`
- **Django**: `python manage.py loaddata`
- **Rails**: `rails db:seed`
- **Prisma**: `npx prisma db seed`

---

## 🚀 Advanced Usage

### Create Multiple Admins
Edit `prisma/seed.ts`:
```typescript
const admins = [
  { email: "admin1@mediscript.com", name: "Admin One" },
  { email: "admin2@mediscript.com", name: "Admin Two" },
];

for (const admin of admins) {
  // Create admin logic
}
```

### Seed Other Data
Add to `prisma/seed.ts`:
```typescript
// Create sample doctors
await prisma.user.create({
  data: {
    email: "doctor@mediscript.com",
    role: "DOCTOR",
    // ...
  }
});

// Create sample patients
await prisma.user.create({
  data: {
    email: "patient@mediscript.com",
    role: "PATIENT",
    // ...
  }
});
```

### CI/CD Integration
```yaml
# .github/workflows/deploy.yml
- name: Run Database Migrations
  run: npx prisma migrate deploy

- name: Seed Database
  run: npm run seed
  env:
    ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
    ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
```

---

## 📚 Additional Resources

- [Prisma Seeding Documentation](https://www.prisma.io/docs/guides/database/seed-database)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Password Security Guidelines](https://owasp.org/www-community/password-special-characters)

---

## ✅ Checklist

Before deploying to production:

- [ ] Changed default admin password
- [ ] Set strong password (12+ characters)
- [ ] Configured environment variables
- [ ] Tested seed script locally
- [ ] Verified admin can login
- [ ] Documented admin credentials securely
- [ ] Added `.env` to `.gitignore`
- [ ] Set up password rotation policy

---

## 🎉 Summary

**Professional admin account management is now implemented!**

- ✅ Environment-based configuration
- ✅ Secure password hashing
- ✅ Idempotent seed script
- ✅ Production-ready
- ✅ Industry-standard approach

**Run `npm run seed` to create your admin account!**

---

**Questions?** Check the troubleshooting section or review the seed script at `prisma/seed.ts`.
