# MediScript-E — Project Presentation
### 3-Minute Optimized Slide Content

---

## Slide 1 — Title `(~15 sec)`

**MediScript-E**
Digital Healthcare Platform

- Live at: **mediscript-e.vercel.app**
- Stack: Next.js 16 · TypeScript · PostgreSQL · Groq AI
- Roles: Patient · Doctor · Admin

---

## Slide 2 — Project Goal & Objectives `(~20 sec)`

**The Problem:**
Paper appointments, lost prescriptions, missed medicines, scattered medical records.

**The Goal:**
One unified platform connecting patients & doctors digitally.

**Core Objectives:**
- Online appointment booking & management
- Digital prescriptions with PDF download
- Automated medicine reminder emails (cron)
- Secure medical document storage
- AI assistant (MediBot) for platform help
- Multi-layer security: 2FA + RBAC + OAuth

---

## Slide 3 — Feasibility Analysis `(~20 sec)`

| Type | Result |
|---|---|
| **Technical** | ✅ Next.js + Supabase + Vercel — proven, production-grade stack |
| **Operational** | ✅ Role-based access, automated cron, admin oversight |
| **Economic** | ✅ 100% free tier — Supabase, Vercel, Groq, Gmail SMTP |
| **Schedule** | ✅ All features delivered following SDLC phases |

---

## Slide 4 — Models & Diagrams `(~25 sec)`

**3-Tier Architecture:**
```
Presentation   →  Next.js 16 + React 19 + Tailwind CSS
      ↓
Business Logic →  API Routes + NextAuth + Prisma + Groq AI
      ↓
Data Tier      →  PostgreSQL (Supabase) + Supabase Storage
```

**ERD — Key Relationships:**
User `1:1` DoctorProfile / PatientProfile → `1:Many` Appointments, Prescriptions, Reminders, Vault

**Appointment Status Flow:**
```
PENDING → CONFIRMED → COMPLETED
    ↓
CANCELLED
```

**5-Layer Security:**
```
Network → Authentication → Authorization (RBAC) → Input Validation → Data Protection
```

---

## Slide 5 — Requirements `(~25 sec)`

**Top Functional Requirements (59 total):**

| Actor | Requirement |
|---|---|
| Patient | Book appointments, view/download prescription PDF, set medicine reminders, upload to vault |
| Doctor | Confirm/cancel/complete appointments, issue/edit/archive prescriptions |
| Admin | Real-time dashboard stats, manage users, monitor all appointments |
| All | Login (Credentials/OAuth/2FA), MediBot chatbot, global search |

**Key Non-Functional Requirements:**
- Pages load within 3 seconds · 99.9% uptime
- bcryptjs hashing · SSL/TLS · RBAC on every API route
- Fully responsive · TypeScript strict typing

---

## Slide 6 — Project Screenshots `(~20 sec)`

| Screenshot | What to Highlight |
|---|---|
| `Landing_page_1.png` | Clean landing page |
| `Patient-Dashboard-overview-1.png` | Patient's full dashboard |
| `Doctor-Dashboard-overview-1.png` | Doctor appointment & prescription management |
| `Admin-Dashboard-overview-1.png` | Real-time admin stats |
| `2FA-OTP-screen.png` | Security — 2FA in action |
| `MediBot.png` | AI chatbot floating on page |

> Screenshots located at: `public/MediScript-E_SS/`

---

## Slide 7 — UI/UX Features `(~20 sec)`

**Design System:** Teal Blue `#1A6080` · Geist Font · Tailwind CSS 4 · Framer Motion

**Key UX Decisions:**
- Role-based dashboard — each role sees only their features
- Smooth page transitions + navigation progress bar
- Floating MediBot accessible on every page
- Confirmation dialogs for all irreversible actions
- Active sidebar route highlighting
- 350ms debounced global search with role-filtered results
- OAuth profile picture in navbar & sidebar
- One-click PDF prescription download

---

## Slide 8 — Conclusion `(~15 sec)`

**What Was Delivered:**
- ✅ 59 functional requirements · 25 non-functional requirements — all met
- ✅ 3 roles · 9 database models · 25+ API routes
- ✅ Live on Vercel: **mediscript-e.vercel.app**

**Future Scope:** Real-time notifications → Video consultation → Mobile app

> "MediScript-E proves that a complete, secure, AI-powered healthcare platform can be built and deployed solo — by following a disciplined SDLC process."

**Thank you — Questions?**

---

## ⏱️ Time Breakdown

| Slide | Topic | Time |
|---|---|---|
| 1 | Title | 15s |
| 2 | Goal & Objectives | 20s |
| 3 | Feasibility Analysis | 20s |
| 4 | Models & Diagrams | 25s |
| 5 | Requirements | 25s |
| 6 | Screenshots | 20s |
| 7 | UI/UX Features | 20s |
| 8 | Conclusion | 15s |
| **Total** | | **~3 min 00 sec ✅** |
