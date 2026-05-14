# 🏥 MediScript-E — Digital Healthcare Platform

A modern, secure digital healthcare platform built with Next.js 16, enabling seamless interaction between patients and doctors with features like appointment booking, e-prescriptions, medicine reminders, and secure medical record management.

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
- **Appointment Tracking:** Monitor appointment status (Pending/Confirmed/Completed)
- **Blood Group Management:** Select blood group during registration (A+, A-, B+, B-, AB+, AB-, O+, O-)

### 👨‍⚕️ For Doctors
- **Appointment Management:** View, confirm, cancel, and complete patient appointments
- **Digital Prescriptions:** Issue prescriptions with diagnosis and medications
- **Patient Information:** Access patient details and appointment history
- **Doctor Profile:** Manage specialization and license information

### 🛡️ For Administrators
- **Dashboard Overview:** Real-time statistics (users, patients, doctors, appointments, prescriptions, contacts)
- **User Management:** View all users with profiles, delete users (except self)
- **Appointment Overview:** Monitor all appointments with status filters
- **Contact Messages:** View and manage contact form submissions

### 🔐 Security & Authentication
- **NextAuth Integration:** Secure credential-based authentication
- **Email Verification:** Prevents fake/unknown email registrations
- **Two-Factor Authentication (2FA):** Email OTP verification with 10-minute expiry
- **OAuth Support:** Google and GitHub login integration (auto-verified)
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
- **Forms:** React Hook Form 7.72.1

### Backend
- **API:** Next.js API Routes (Serverless)
- **Authentication:** NextAuth 4.24.14
- **Database ORM:** Prisma 7.8.0
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage
- **Email:** Nodemailer 6.9.16 (Gmail SMTP)

### Development
- **Language:** TypeScript 5.x
- **Linting:** ESLint 9
- **Package Manager:** pnpm

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Supabase account for storage
- Gmail account with App Password for email

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

3. **Environment Variables**

Create a `.env` file in the root directory:

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

# Cron API Key (for automated medicine reminders)
CRON_API_KEY="your-secret-cron-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

4. **Generate Prisma Client**
```bash
npx prisma generate
```

5. **Database Setup**

Run via Supabase SQL Editor or Prisma migrate:
```bash
npx prisma migrate dev
```

6. **Create Supabase Storage Bucket**
- Go to Supabase Dashboard → Storage
- Create a bucket named `medical-reports`
- Set it to **Public** access

7. **Run Development Server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
mediscript-e/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── prisma.config.ts               # Prisma 7 configuration
├── public/                        # Static assets
├── lab-reports/                   # SDLC lab documentation
│   ├── lab-session-3.md           # Requirements Engineering
│   ├── lab-session-4.md           # SRS Document
│   ├── lab-session-5.md           # Use Case Modeling
│   ├── lab-session-6.md           # System Design & UML
│   ├── lab-session-7.md           # Security Engineering
│   ├── lab-session-8.md           # Software Testing
│   ├── lab-session-9.md           # Implementation
│   └── lab-session-10.md          # Maintenance & Ethics
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── stats/         # Dashboard statistics
│   │   │   │   ├── users/         # User management
│   │   │   │   ├── appointments/  # Appointment overview
│   │   │   │   └── contacts/      # Contact messages
│   │   │   ├── appointment/       # Appointment CRUD
│   │   │   ├── auth/
│   │   │   │   └── 2fa/
│   │   │   │       ├── send/      # Send OTP
│   │   │   │       └── verify/    # Verify OTP
│   │   │   ├── contact/           # Contact form
│   │   │   ├── doctors/           # Doctor list
│   │   │   ├── medicine-reminder/ # Medicine reminders
│   │   │   ├── prescription/      # Prescription API
│   │   │   ├── register/          # User registration
│   │   │   ├── settings/
│   │   │   │   ├── 2fa/           # Toggle 2FA
│   │   │   │   ├── password/      # Change password
│   │   │   │   └── profile/       # Update profile
│   │   │   ├── vault/             # Medical vault
│   │   │   ├── verify-email/      # Email verification
│   │   │   └── resend-verification/
│   │   ├── dashboard/             # Dashboard page
│   │   ├── login/                 # Login page
│   │   ├── register/              # Register page
│   │   ├── settings/              # Settings page
│   │   ├── verify-2fa/            # 2FA OTP verification page
│   │   ├── verify-email/          # Email verification page
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── AppointmentOverview.tsx
│   │   ├── BookAppointment.tsx
│   │   ├── ContactMessages.tsx
│   │   ├── ContactSection.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DoctorAppointments.tsx
│   │   ├── DownloadPDF.tsx
│   │   ├── FeatureModal.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MyAppointments.tsx
│   │   ├── Navbar.tsx
│   │   ├── PowerFeatures.tsx
│   │   ├── PrescriptionForm.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── SettingsForm.tsx
│   │   └── UserManagement.tsx
│   ├── hooks/
│   │   └── useScrollHash.ts       # Scroll-based hash navigation
│   └── lib/
│       ├── auth.ts                # NextAuth configuration
│       ├── db.ts                  # Prisma client with pg adapter
│       └── supabase.ts            # Supabase client
├── vercel.json                    # Vercel deployment config
├── .env.example                   # Example environment variables
├── next.config.ts                 # Next.js config
└── tsconfig.json                  # TypeScript config
```

---

## 🗄️ Database Schema

### Models
- **User** — Authentication, profile, 2FA fields
- **DoctorProfile** — Specialization, license number
- **PatientProfile** — Date of birth, blood group
- **Appointment** — Booking with status tracking
- **Prescription** — Digital prescriptions
- **MedicineReminder** — Medication schedules with email alerts
- **MedicalVault** — Uploaded medical documents
- **ContactMessage** — Contact form submissions

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
| POST | `/api/resend-verification` | Resend verification email |
| POST | `/api/auth/2fa/send` | Send 2FA OTP |
| POST | `/api/auth/2fa/verify` | Verify 2FA OTP |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointment` | Get user appointments |
| POST | `/api/appointment` | Create appointment |
| PATCH | `/api/appointment/[id]` | Update appointment status |
| DELETE | `/api/appointment/[id]` | Delete appointment |

### Prescriptions & Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET/POST | `/api/prescription` | Get/Create prescription |

### Medicine Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/medicine-reminder` | Get/Create reminders |
| PATCH | `/api/medicine-reminder/[id]` | Mark as taken/undo |
| DELETE | `/api/medicine-reminder/[id]` | Delete reminder |
| POST | `/api/medicine-reminder/send-notifications` | Send email alerts (cron) |

### Medical Vault
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/vault` | Upload medical record |
| DELETE | `/api/vault/[id]` | Delete record |

### Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/settings/profile` | Update profile name |
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

> **Note:** Use `vercel --prod` CLI for manual deployments if GitHub webhook is not triggering.

### Important Production Notes
- `DATABASE_URL` must include `?sslmode=no-verify` for Supabase pooler
- `NEXTAUTH_URL` must be set to your production URL
- Google OAuth: Add `https://your-domain.vercel.app/api/auth/callback/google` to authorized redirect URIs
- GitHub OAuth: Add `https://your-domain.vercel.app/api/auth/callback/github` to callback URLs

---

## 📝 Usage Guide

### For Patients
1. Register as PATIENT → select blood group
2. Verify email via inbox link
3. Login → optionally enable 2FA in Settings
4. Book appointments, set medicine reminders, upload medical records
5. View and download prescriptions as PDF

### For Doctors
1. Register as DOCTOR → provide license number and specialization
2. Verify email via inbox link
3. Login → manage appointments (confirm/cancel/complete)
4. Issue prescriptions with diagnosis and medications

### For Administrators
1. Login with admin credentials
2. Monitor real-time dashboard statistics
3. Manage users, appointments, and contact messages

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
- ✅ File upload validation (type and size)
- ✅ Environment variables for all secrets
- ✅ OAuth auto-verification (Google, GitHub)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#1A6080` (Teal Blue) |
| Font | Geist (Next.js default) |
| Headings | font-black (900) |
| Body | font-medium (500) |

---

## 👨‍💻 Author

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

---

**Built with ❤️ using Next.js and TypeScript**
