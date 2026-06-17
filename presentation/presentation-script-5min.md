# MediScript-E — Presentation Script
# 5-Minute Version
# Every line is exactly what to say out loud

---

## SLIDE 1 — Title (~10 sec)

"Good morning.
I am Tushar Barua from CSE, USTC.
My project is MediScript-E — a live digital healthcare platform
running at mediscript-e.vercel.app."

---

## SLIDE 2 — Abstract (~15 sec)

"MediScript-E connects Patients, Doctors, and Administrators
in one unified digital platform.
The goal — digitize healthcare, secure medical data, and automate medicine reminders.
Built with Next.js, TypeScript, and PostgreSQL, following the complete SDLC."

---

## SLIDE 3 — Outline (~10 sec)

"I have structured this presentation following IEEE format —
Related Work first, then each SDLC phase,
and finishing with Challenges and Conclusion."

---

## SLIDE 4 — Related Work (~20 sec)

"Platforms like Practo, Zocdoc, and HealthTap each solve one part of the problem.
Practo handles bookings, Zocdoc does scheduling, HealthTap has an AI chatbot.
But none of them combines all features — booking, prescriptions, reminders,
vault, AI chatbot, and role-based security — in one free, open platform.
That is the gap MediScript-E fills."

---

## SLIDE 5 — Problem Statement (~15 sec)

"Prescriptions get lost, appointments need phone calls,
medical records are scattered, patients forget medicine schedules,
and there is no secure role-based access to health data.
Healthcare is fragmented — and this project solves that."

---

## SLIDE 6 — Proposed Solution (~15 sec)

"The solution is one platform with three roles.
Patients book appointments, view prescriptions, set reminders, upload records.
Doctors manage appointments and issue digital prescriptions.
Admins monitor the entire platform.
25 plus APIs, 9 database models, 3 roles — live on Vercel."

---

## SLIDE 7 — Requirements Analysis (~15 sec)

"In Phase 1, I defined functional and non-functional requirements.
Functionally — booking, PDF prescriptions, reminders, cloud storage, role-based dashboards.
Non-functionally — security with 2FA and RBAC,
performance with serverless APIs, and scalability with Vercel and Supabase."

---

## SLIDE 8 — Use Cases & Actors (~10 sec)

"The system has 5 actors — Patient, Doctor, Admin, Cron System, and OAuth Providers.
Use cases cover the full lifecycle from registration to admin management.
Appointment flow — PENDING, CONFIRMED, COMPLETED, or CANCELLED."

---

## SLIDE 9 — System Architecture (~15 sec)

"I used a Three-Tier Architecture.
Presentation Tier — Next.js with React and TypeScript.
Application Tier — serverless API routes with NextAuth and Prisma.
Data Tier — PostgreSQL on Supabase with file storage.
External services include Groq, Nodemailer, OAuth, and GitHub Actions."

---

## SLIDE 10 — Database Design (~10 sec)

"9 models, 3 roles, cascade delete.
A User has either a DoctorProfile or PatientProfile.
Key decisions — soft archive on prescriptions,
OTPs cleared after verification, cascade delete throughout."

---

## SLIDE 11 — Tech Stack (~10 sec)

"Next.js 16, TypeScript, Tailwind CSS, NextAuth, Prisma,
PostgreSQL, Supabase Storage, Nodemailer, Groq SDK — deployed on Vercel."

---

## SLIDE 12 — Authentication & Security (~25 sec)

"Security has 6 layers.
Email verification with a 24-hour crypto token.
bcryptjs password hashing with 10 salt rounds.
On the right you can see the actual 2FA screen —
a 6-digit OTP sent to email, expires in 10 minutes, optional per user.
Google and GitHub OAuth — auto-verified on first login.
JWT sessions with 30-day expiry.
And every API route checks role and ownership — full RBAC."

---

## SLIDE 13 — Patient Features (~15 sec)

"Patients have 4 core features.
First, Appointment Booking — select doctor, date, and time.
Next, E-Prescription — view and download as PDF.
Then, Medicine Reminders — automated daily email alerts.
And finally, Medical Vault — upload reports to secure cloud storage."

---

## SLIDE 14 — Doctor & Admin Features (~10 sec)

"On the left, the Doctor dashboard —
doctors confirm appointments and issue prescriptions, which auto-complete the appointment.
On the right, the Admin dashboard —
real-time stats, user management with cascade delete, and appointment monitoring."

---

## SLIDE 15 — MediBot & Search (~10 sec)

"MediBot is an AI chatbot powered by Groq Llama 3.1 — available on every page.
Global Search opens with Ctrl+K and shows role-aware results."

---

## SLIDE 16 — Testing (~10 sec)

"I tested all 7 areas — auth flows, appointments, prescriptions,
reminders, vault, security, and edge cases.
Everything passed."

---

## SLIDE 17 — Results & Evaluation (~10 sec)

"Every requirement from Phase 1 was delivered —
all 12 features live on Vercel.
All SDLC phases completed. All requirements met."

---

## SLIDE 18 — Deployment (~10 sec)

"Fully automated on Vercel —
push to GitHub, Vercel builds and deploys instantly.
Supabase with PgBouncer pooling, GitHub Actions cron every 5 minutes."

---

## SLIDE 19 — Challenges & Solutions (~15 sec)

"Four key challenges —
2FA re-auth solved with a magic token and DB null check.
Supabase SSL fixed with sslmode=no-verify and PgBouncer URL.
Prisma connection exhaustion resolved with a globalThis singleton.
Cascade delete errors fixed by deleting in the correct dependency order."

---

## SLIDE 20 — Future Enhancements (~5 sec)

"Short term — real-time notifications and doctor calendar.
Medium term — video consultation and mobile app.
Long term — AI symptom checker and HIPAA compliance."

---

## SLIDE 21 — Conclusion (~10 sec)

"MediScript-E follows the complete SDLC —
from requirements to live deployment.
A structured approach helps build something
that is maintainable, scalable, and secure."

---

## SLIDE 22 — Q&A (~5 sec)

"Thank you.
The platform is live at mediscript-e.vercel.app.
I am happy to take any questions."

---

## ⏱️ Time Breakdown

| Slide | Topic | Time |
|---|---|---|
| 1 | Title | 10s |
| 2 | Abstract | 15s |
| 3 | Outline | 10s |
| 4 | Related Work | 20s |
| 5 | Problem Statement | 15s |
| 6 | Proposed Solution | 15s |
| 7 | Requirements | 15s |
| 8 | Use Cases | 10s |
| 9 | Architecture | 15s |
| 10 | Database | 10s |
| 11 | Tech Stack | 10s |
| 12 | Auth & Security | 25s |
| 13 | Patient Features | 15s |
| 14 | Doctor & Admin | 10s |
| 15 | MediBot & Search | 10s |
| 16 | Testing | 10s |
| 17 | Results | 10s |
| 18 | Deployment | 10s |
| 19 | Challenges | 15s |
| 20 | Future | 5s |
| 21 | Conclusion | 10s |
| 22 | Q&A | 5s |
| **Total** | | **~4 min 55 sec** |

---

## 🎯 Likely Questions & Short Answers

**Q: Why Next.js instead of separate frontend and backend?**
A: One codebase for both frontend and API. Simpler deployment on Vercel, easier to maintain.

**Q: How is MediScript-E different from Practo or Zocdoc?**
A: Those platforms each solve one problem. MediScript-E combines booking, prescriptions, reminders, vault, AI chatbot, and 2FA — all in one free, open platform.

**Q: How secure is the 2FA?**
A: OTP generated server-side, expires in 10 minutes, cleared from DB after use. Session only created after confirming OTP is null — no bypass possible.

**Q: How does the cron job work?**
A: GitHub Actions fires every 5 minutes, calls the API with a Bearer key, matches Bangladesh time within plus or minus 5 minutes, sends email via Nodemailer.

**Q: Why JWT over database sessions?**
A: Stateless — no DB lookup per request. Ideal for serverless. Role stored in token for instant RBAC checks.

**Q: Why Supabase?**
A: Managed PostgreSQL with PgBouncer, built-in storage, free tier — removes infrastructure overhead completely.

**Q: Is the platform HIPAA compliant?**
A: Not yet — long-term goal. But encryption, RBAC, and secure storage already align with HIPAA principles.
