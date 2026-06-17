# MediScript-E — Presentation Slides
# Software Engineering | SDLC + IEEE | USTC
# ✅ 22 Slides — All images injected, no orphan placeholders

---

## SLIDE 1 — Title
> ✅ IMAGE: `Landing_page_1.png` — Right side

# MediScript-E
### A Secure Digital Healthcare Platform
*Software Engineering Course Project*

**Tushar Barua** | CSE — USTC, Chittagong | 2024–2025
🌐 mediscript-e.vercel.app

---

## SLIDE 2 — Abstract (IEEE)
> ✅ IMAGE: `Patient-Dashboard-overview-1.png` — Right side

**What is MediScript-E?**
- Full-stack digital healthcare platform
- Connects Patients, Doctors, and Administrators
- Built following complete SDLC methodology

**Core Purpose:**
- Digitize patient-doctor workflow end-to-end
- Secure medical data in the cloud
- Automate medicine reminders

**Built with:** Next.js · TypeScript · PostgreSQL · Vercel

---

## SLIDE 3 — Outline (IEEE)
> ✅ No image — table only

| # | Section | Phase |
|---|---|---|
| 1 | Related Work | IEEE |
| 2 | Problem Statement | SDLC Phase 1 |
| 3 | Proposed Solution | SDLC Phase 1 |
| 4 | Requirements Analysis | SDLC Phase 1 |
| 5 | Use Cases & Actors | SDLC Phase 1 |
| 6 | System Architecture | SDLC Phase 2 |
| 7 | Database Design | SDLC Phase 2 |
| 8 | Tech Stack | SDLC Phase 3 |
| 9 | Auth & Security | SDLC Phase 3 |
| 10 | Core Features | SDLC Phase 3 |
| 11 | Testing | SDLC Phase 4 |
| 12 | Results & Deployment | SDLC Phase 5 |
| 13 | Challenges & Conclusion | IEEE |

---

## SLIDE 4 — Related Work (IEEE)
> ✅ No image — table only

| Platform | Primary Focus | What It Lacks (Combined) |
|---|---|---|
| Practo (India) | Doctor discovery & appointment booking | No unified: reminders + vault + AI chatbot + open access |
| Zocdoc (USA) | Online appointment scheduling | No unified: e-prescriptions + 2FA + AI + free open platform |
| HealthTap (USA) | AI symptom checker + doctor chat | No unified: appointment booking + RBAC + prescription PDF |
| Manual / Paper-based | Traditional in-person healthcare | No digitization at all — records lost, no reminders |

**The Gap:**
- Each platform solves one problem — none combines all features in a single free, open system
- No existing free platform offers: booking + e-prescription + reminders + vault + AI chatbot + 2FA + RBAC
- MediScript-E fills this gap — unified, secure, role-based, and production-deployed

---

## SLIDE 5 — Problem Statement (SDLC Phase 1)
> ✅ No image — table + quote only

| Pain Point | Reality |
|---|---|
| Prescriptions | Lost, damaged, inaccessible |
| Appointments | Phone calls, physical visits |
| Medical Records | Scattered across hospitals |
| Medicine Schedule | No reminders, often forgotten |
| Data Security | No role-based access |

> *"Healthcare data is fragmented, insecure, and inaccessible when needed most."*

---

## SLIDE 6 — Proposed Solution (SDLC Phase 1)
> ✅ No image — table only

**One platform. Three roles. Complete workflow.**

| Role | Key Capability |
|---|---|
| 👤 Patient | Book appointments, view prescriptions, set reminders, upload records |
| 👨⚕️ Doctor | Manage appointments, issue digital prescriptions |
| 🛡️ Admin | Monitor platform, manage users |

25+ APIs · 9 DB Models · 3 Roles · Live on Vercel

---

## SLIDE 7 — Requirements Analysis (SDLC Phase 1)
> ✅ No image — two-column text only

**Functional Requirements**
- FR1: Register & login with email verification
- FR2: Book appointments with available doctors
- FR3: View & download prescriptions as PDF
- FR4: Set medicine reminders — automated email alerts
- FR5: Upload & manage medical records (cloud)
- FR6: Doctor manages appointments & prescriptions
- FR7: Admin monitors users & platform stats

**Non-Functional Requirements**

| NFR | Requirement |
|---|---|
| Security | 2FA, RBAC, bcrypt, JWT |
| Performance | Serverless, connection pooling |
| Scalability | Vercel + Supabase managed infra |
| Usability | Responsive, mobile-friendly UI |
| Reliability | Token expiry, cascade delete |
| Maintainability | TypeScript, Prisma ORM |

---

## SLIDE 8 — Use Cases & Actors (SDLC Phase 1)
> ✅ IMAGE: `Landing-page-2.png` — Bottom right

**Actors:** Patient · Doctor · Admin · Cron System · OAuth Provider

**Key Use Cases:**
- UC1: Register → Verify Email → Login
- UC2: Patient books appointment
- UC3: Doctor confirms & issues prescription
- UC4: Patient downloads prescription PDF
- UC5: Patient sets reminder → receives email
- UC6: Admin manages users & monitors platform

**Appointment Flow:** `PENDING → CONFIRMED → COMPLETED` or `CANCELLED`

---

## SLIDE 9 — System Architecture (SDLC Phase 2)
> ✅ IMAGE: `Landing-page-3.png` — Right side

**Three-Tier Architecture**
- Presentation Tier: Next.js App Router · React 19 · TypeScript
- Application Tier: Next.js Serverless API Routes · NextAuth · Prisma ORM
- Data Tier: PostgreSQL (Supabase) · Supabase Storage

**External Services:**
- Groq API — AI Chatbot (Llama 3.1)
- Nodemailer — Email (OTP, Verification, Reminders)
- OAuth — Google & GitHub
- GitHub Actions — Cron job (medicine reminders)

---

## SLIDE 10 — Database Design (SDLC Phase 2)
> ✅ IMAGE: `Landing-page-4.png` — Right side

**9 Models · 3 Roles · Cascade Delete**

```
User
 ├── DoctorProfile  → Appointment[ ] · Prescription[ ]
 └── PatientProfile → Appointment[ ] · Prescription[ ]
                      MedicalVault[ ] · MedicineReminder[ ]
ContactMessage  |  Testimonial
```

**Key Decisions:**
- Soft archive on prescriptions (`archivedByDoctor`)
- OTP stored temporarily — cleared after verification
- Cascade delete — no orphan records

---

## SLIDE 11 — Tech Stack (SDLC Phase 3)
> ✅ No image — full-width table only

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) | Full-stack web framework |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS 4 + Framer Motion | UI & animations |
| Auth | NextAuth.js 4 | JWT sessions + OAuth |
| ORM | Prisma 7 | Type-safe DB queries |
| Database | PostgreSQL via Supabase | Managed relational DB |
| Storage | Supabase Storage | Medical file uploads |
| Email | Nodemailer (Gmail SMTP) | Verification, OTP, reminders |
| AI | Groq SDK — Llama 3.1 8B | MediBot chatbot |
| Deployment | Vercel | Serverless hosting + CI/CD |

---

## SLIDE 12 — Authentication & Security (SDLC Phase 3)
> ✅ IMAGE (top): `2FA-OTP-screen.png`
> ✅ IMAGE (bottom): `Landing-page-05.png`

1. **Email Verification** — crypto token · 24h expiry
2. **Password Hashing** — bcryptjs · 10 salt rounds
3. **Two-Factor Auth (2FA)** — email OTP · 10 min expiry
4. **OAuth** — Google & GitHub · auto-verified
5. **JWT Sessions** — 30-day expiry · role in token
6. **RBAC** — every API route checks role + ownership

---

## SLIDE 13 — Patient Features (SDLC Phase 3)
> ✅ IMAGE (card 1): `Patient-Dashboard-overview-1.png`
> ✅ IMAGE (card 2): `Landing-page-6.png`
> ✅ IMAGE (card 3): `Landing-page-7.png`
> ✅ IMAGE (card 4): `Landing-page-8.png`

1. **Appointment Booking** — Select doctor → pick date & time → confirm
2. **E-Prescription** — View diagnosis + medications → download as PDF
3. **Medicine Reminders** — Set schedule → automated email alerts daily
4. **Medical Vault** — Upload reports → stored securely in cloud

---

## SLIDE 14 — Doctor & Admin Features (SDLC Phase 3)
> ✅ IMAGE (left): `Doctor-Dashboard-overview-1.png`
> ✅ IMAGE (right): `Admin-Dashboard-overview-1.png`

**Doctor**
- Confirm / cancel / complete appointments
- Issue prescriptions → appointment auto-completed
- Edit, archive, delete prescriptions

**Admin**
- Real-time platform statistics
- Delete users (cascade — all data removed)
- Monitor all appointments & contact messages

---

## SLIDE 15 — MediBot & Search (SDLC Phase 3)
> ✅ IMAGE: `MediBot.png` — Left bottom

**MediBot — AI Chatbot**
- Powered by Groq (Llama 3.1 8B Instant)
- Available globally on all pages
- Responds in Bangla if user writes in Bangla

**Global Search**
- Trigger: navbar icon or `Ctrl+K`
- Role-aware results · Debounced 300ms

---

## SLIDE 16 — Testing (SDLC Phase 4)
> ✅ No image — full-width table only

| Test Area | Result |
|---|---|
| Auth flows (register, login, 2FA, OAuth) | ✅ Pass |
| Appointment lifecycle | ✅ Pass |
| Prescription CRUD | ✅ Pass |
| Medicine reminder + email delivery | ✅ Pass |
| Medical vault upload/delete | ✅ Pass |
| Security & authorization checks | ✅ Pass |
| Edge cases (past date, duplicate email, expired OTP) | ✅ Pass |

---

## SLIDE 17 — Results & Evaluation (SDLC Phase 5)
> ✅ No image — full-width checklist only

| Feature | Status |
|---|---|
| Email Verification (24h token) | ✅ Delivered |
| Two-Factor Authentication (2FA) | ✅ Delivered |
| Google & GitHub OAuth | ✅ Delivered |
| Appointment Booking & Management | ✅ Delivered |
| Digital Prescriptions + PDF Download | ✅ Delivered |
| Automated Medicine Reminders (email) | ✅ Delivered |
| Medical Vault (cloud storage) | ✅ Delivered |
| AI Chatbot — MediBot (Groq) | ✅ Delivered |
| Global Search (role-aware) | ✅ Delivered |
| Admin Dashboard & User Management | ✅ Delivered |
| Responsive UI (mobile + desktop) | ✅ Delivered |
| Production Deployment — Live on Vercel | ✅ Delivered |

**All SDLC phases completed. All requirements met.**

---

## SLIDE 18 — Deployment (SDLC Phase 5)
> ✅ IMAGE: `Vercel-deployment-dashboard.png` — Right side

`Push to GitHub → Vercel auto-build → Live on Vercel`

- Database: Supabase PostgreSQL + PgBouncer pooling
- Cron: GitHub Actions — every 5 min → reminder emails
- Env vars: 10 variables configured on Vercel

🌐 https://mediscript-e.vercel.app

---

## SLIDE 19 — Challenges & Solutions (IEEE)
> ✅ No image — full-width table only

| Challenge | Solution |
|---|---|
| 2FA re-auth after OTP | Magic token + DB OTP null check |
| Supabase SSL on Vercel | `sslmode=no-verify` + PgBouncer URL |
| OAuth users — no password | Check empty password before update |
| Reminder time zone mismatch | Convert to UTC+6 (Bangladesh) server-side |
| Prisma connection in serverless | Singleton via `globalThis` |
| Cascade delete order | Manual delete in dependency order |
| Stale JWT after profile update | Force `window.location.reload()` |

---

## SLIDE 20 — Future Enhancements (IEEE)
> ✅ No image — three-column layout only

**Short Term** — Real-time notifications · Doctor availability calendar · Rating system

**Medium Term** — Video consultation (WebRTC) · Prescription QR code · Mobile app

**Long Term** — AI symptom checker · Payment gateway · HIPAA / GDPR compliance

---

## SLIDE 21 — Conclusion (IEEE)
> ✅ No image — text + quote only

**SDLC Phases Completed:**
Requirements → Design → Implementation → Testing → Deployment ✅

**Delivered:** Secure, production-ready healthcare platform
3 roles · 25+ APIs · 9 DB models · Live on Vercel

> *"Structured Software Engineering methodology turns ideas into maintainable, scalable, real-world applications."*

---

## SLIDE 22 — Q&A
> 🎬 [MANUAL: Insert demo video in PowerPoint]

**Thank You**
# MediScript-E — *"Your Health, Digitally Managed."*

Tushar Barua | CSE · USTC · Chittagong
📧 tusharcoder269@gmail.com | 🌐 mediscript-e.vercel.app
