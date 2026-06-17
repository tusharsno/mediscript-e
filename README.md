# 🏥 MediScript-E — Digital Healthcare Platform

A modern, secure digital healthcare platform built with Next.js 16, enabling seamless interaction between patients and doctors with features like appointment booking, e-prescriptions, medicine reminders, secure medical record management, and an AI-powered chatbot assistant.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

**Live Demo:** https://mediscript-e.vercel.app

---

## 🌟 Features

### 👤 For Patients
- **Appointment Booking:** Book appointments with available doctors
- **Medicine Reminders:** Set medication schedules with automated email alerts
- **Medical Vault:** Securely upload and store medical reports (Supabase Storage)
- **E-Prescriptions:** View and download prescriptions as PDF
- **Appointment Tracking:** Monitor appointment status (Pending/Confirmed/Completed/Cancelled)
- **Blood Group Management:** Select blood group during registration
- **Share Feedback:** Submit testimonials about the platform

### 👨⚕️ For Doctors
- **Appointment Management:** View, confirm, cancel, and complete patient appointments
- **Digital Prescriptions:** Issue prescriptions with diagnosis and medications
- **Prescription Archive:** Archive/unarchive old prescriptions
- **Prescription Edit/Delete:** Edit or delete issued prescriptions
- **Patient Information:** Access patient details including blood group

### 🛡️ For Administrators
- **Dashboard Overview:** Real-time statistics
- **User Management:** View all users, delete users (except self)
- **Appointment Overview:** Monitor all appointments with status filters
- **Contact Messages:** View and manage contact form submissions

### 🤖 AI Chatbot
- **MediBot:** AI-powered assistant built with Groq (Llama 3.1) for platform-related queries
- Responds in user's language — English by default, Bangla if user writes in Bangla

### 🔐 Security & Authentication
- **NextAuth Integration:** Secure credential-based authentication
- **Email Verification:** 24-hour token expiry
- **Two-Factor Authentication (2FA):** Email OTP with 10-minute expiry
- **OAuth Support:** Google and GitHub login with profile picture
- **Role-Based Access Control:** PATIENT, DOCTOR, ADMIN roles
- **Password Encryption:** bcryptjs hashing (10 salt rounds)
- **Session Management:** JWT-based sessions (30-day expiry)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.2.3 (App Router)
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12.38.0
- **Icons:** Lucide React

### Backend
- **API:** Next.js API Routes (Serverless)
- **Authentication:** NextAuth 4.24.14
- **Database ORM:** Prisma 7.8.0
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage
- **Email:** Nodemailer 6.9.16 (Gmail SMTP)
- **AI Chatbot:** Groq SDK (Llama 3.1 8B Instant)

### Development
- **Language:** TypeScript 5.x
- **Package Manager:** pnpm

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Gmail account with App Password for email
- Groq API key (free at console.groq.com)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/tusharsno/mediscript-e.git
cd mediscript-e
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Variables** — Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&sslmode=no-verify"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Email (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# Cron API Key
CRON_API_KEY="your-secret-cron-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Chatbot
GROQ_API_KEY="your-groq-api-key"
```

4. **Generate Prisma Client**
```bash
npx prisma generate
```

5. **Database Setup**
```bash
npx prisma migrate dev
```

6. **Create Supabase Storage Bucket**
- Go to Supabase Dashboard → Storage
- Create a bucket named `medical-reports` → set to **Public**

7. **Run Development Server**
```bash
pnpm dev
```

---

## 🗺️ Page Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/dashboard` | Overview with stats | All roles |
| `/appointments` | Appointments management | All roles |
| `/prescriptions` | Prescriptions | Patient + Doctor |
| `/reminders` | Medicine reminders | Patient |
| `/vault` | Medical vault | Patient |
| `/feedback` | Share feedback | Patient + Doctor |
| `/users` | User management | Admin |
| `/contacts` | Contact messages | Admin |
| `/settings` | Account settings | All roles |

---

## 🗄️ Database Schema

### Models
- **User** — Authentication, profile, 2FA fields
- **DoctorProfile** — Specialization, license number
- **PatientProfile** — Date of birth, blood group
- **Appointment** — Booking with status tracking
- **Prescription** — Digital prescriptions with archive support
- **MedicineReminder** — Medication schedules with email alerts
- **MedicalVault** — Uploaded medical documents
- **ContactMessage** — Contact form submissions
- **Testimonial** — User feedback and ratings

### Appointment Status Flow
```
PENDING → CONFIRMED → COMPLETED
   ↓
CANCELLED
```

---

## 🔧 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/verify-email` | Verify email token |
| POST | `/api/auth/2fa/send` | Send 2FA OTP |
| POST | `/api/auth/2fa/verify` | Verify 2FA OTP |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointment` | Get user appointments |
| POST | `/api/appointment` | Create appointment |
| PATCH | `/api/appointment/[id]` | Update status |
| DELETE | `/api/appointment/[id]` | Delete appointment |

### Prescriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET/POST | `/api/prescription` | Get/Create prescription |
| PATCH | `/api/prescription/[id]` | Edit/Archive prescription |
| DELETE | `/api/prescription/[id]` | Delete prescription |

### Medicine Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/medicine-reminder` | Get/Create reminders |
| PATCH | `/api/medicine-reminder/[id]` | Mark as taken/undo |
| DELETE | `/api/medicine-reminder/[id]` | Delete reminder |
| POST | `/api/medicine-reminder/send-notifications` | Send email alerts (cron) |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/vault` | Upload medical record |
| POST | `/api/chatbot` | AI chatbot (Groq) |
| GET | `/api/search?q=` | Global search |
| PATCH | `/api/settings/profile` | Update profile |
| PATCH | `/api/settings/password` | Change password |
| PATCH | `/api/settings/2fa` | Toggle 2FA |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/users` | All users |
| DELETE | `/api/admin/users/[id]` | Delete user |
| GET | `/api/admin/appointments` | All appointments |
| GET | `/api/admin/contacts` | Contact messages |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

> **Note:** Use `vercel --prod` CLI for manual deployments.

### Important Production Notes
- `DATABASE_URL` must include `?sslmode=no-verify` for Supabase pooler
- `NEXTAUTH_URL` must be set to your production URL
- `GROQ_API_KEY` must be added to Vercel environment variables
- Google OAuth: Add `https://your-domain.vercel.app/api/auth/callback/google`
- GitHub OAuth: Add `https://your-domain.vercel.app/api/auth/callback/github`

---

## 🔒 Security

- ✅ Email verification (24-hour token expiry)
- ✅ Two-Factor Authentication via email OTP (10-minute expiry)
- ✅ bcryptjs password hashing (10 salt rounds)
- ✅ JWT session management (30-day expiry)
- ✅ Role-Based Access Control (RBAC)
- ✅ SQL injection prevention via Prisma ORM
- ✅ CSRF protection via NextAuth
- ✅ SSL/TLS database connections
- ✅ Input validation on all API routes
- ✅ OAuth auto-verification (Google, GitHub)
- ✅ Appointment ownership authorization

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#1A6080` (Teal Blue) |
| Font | Geist (Next.js default) |
| Headings | font-black (900) |

---

## 👨💻 Author

**Tushar**
- GitHub: [@tusharsno](https://github.com/tusharsno)
- University: USTC, Chittagong, Bangladesh

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) — Framework
- [Vercel](https://vercel.com) — Hosting & deployment
- [Supabase](https://supabase.com) — Database & storage
- [Prisma](https://prisma.io) — ORM
- [NextAuth.js](https://next-auth.js.org) — Authentication
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Groq](https://groq.com) — AI inference (MediBot)
- [Framer Motion](https://www.framer.com/motion) — Animations

---

**Built with ❤️ using Next.js and TypeScript**
