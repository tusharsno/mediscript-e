# LAB SESSION 2
## Lab Name: Software Process Models & Development Strategy
## Project: MediScript-E — Digital Healthcare Platform

---

## Objectives
- Understand different SDLC models and their characteristics
- Select an appropriate process model for MediScript-E
- Justify the process model selection based on project characteristics

---

## Theory

The Software Development Life Cycle (SDLC) defines the structured process followed to develop a software system. Different SDLC models are suited to different project types.

### Common SDLC Models

| Model | Approach | Best For | Weakness |
|-------|----------|----------|----------|
| Waterfall | Sequential, phase-by-phase | Fixed requirements, clear scope | Inflexible, no feedback until late |
| Agile | Iterative, sprint-based | Evolving requirements, team collaboration | Requires constant client involvement |
| Incremental | Build in increments, each adds functionality | Medium complexity, growing features | Integration challenges across increments |
| Spiral | Risk-driven, iterative with risk analysis | High-risk projects | Complex, expensive |
| V-Model | Testing parallel to development phases | Safety-critical systems | Rigid, no flexibility |
| RAD | Rapid prototyping | UI-heavy, short timeline | Not suitable for complex systems |

---

## Task 1: SDLC Model Selection

### Selected Model: **Incremental Development Model**

MediScript-E was developed using the **Incremental Development Model**, where the system was built and delivered in increments. Each increment added a complete, functional module to the system.

### Development Increments for MediScript-E

| Increment | Features Added | Status |
|-----------|---------------|--------|
| Increment 1 | User registration, email verification, credential login | ✅ Complete |
| Increment 2 | OAuth login (Google, GitHub), 2FA via email OTP | ✅ Complete |
| Increment 3 | Appointment booking and management (Patient + Doctor) | ✅ Complete |
| Increment 4 | Digital prescriptions — issue, view, PDF download | ✅ Complete |
| Increment 5 | Medicine reminders with automated email alerts (cron) | ✅ Complete |
| Increment 6 | Medical vault — file upload and management | ✅ Complete |
| Increment 7 | Admin dashboard — statistics, user and appointment management | ✅ Complete |
| Increment 8 | AI chatbot (MediBot) powered by Groq Llama 3.1 | ✅ Complete |
| Increment 9 | Global search, notifications, settings, OAuth profile pictures | ✅ Complete |
| Increment 10 | UI polish — page transitions, responsive design, dedicated routes | ✅ Complete |

---

## Task 2: Justification for Model Selection

| Criterion | Justification |
|-----------|---------------|
| **Evolving requirements** | New features (AI chatbot, global search, profile pictures) were identified during development — Incremental model accommodates this naturally |
| **Single developer** | Incremental model is well-suited for individual developers who build and test one module at a time |
| **Early working software** | Each increment produced working, testable software — authentication worked before prescription was built |
| **Risk management** | High-risk features (2FA, OAuth, AI integration) were built as separate increments, isolating failure impact |
| **Continuous deployment** | Each increment was deployed to Vercel independently — users could access the live system throughout development |
| **Clear module boundaries** | MediScript-E has well-defined modules (Auth, Appointments, Prescriptions, etc.) — each maps naturally to an increment |

---

## Task 3: Comparison with Alternative Models

### Why Not Waterfall?
Waterfall requires all requirements to be defined upfront and does not allow revisiting earlier phases. MediScript-E requirements evolved during development — new features like AI chatbot and global search were added after the initial plan. Waterfall would have required restarting design phases.

### Why Not Pure Agile?
Agile requires sprint planning, daily standups, and constant stakeholder feedback in a team environment. As a single-developer project, formal Agile ceremonies are impractical. However, Agile **principles** (iterative delivery, continuous improvement) are followed through the Incremental model.

### Why Not Spiral?
Spiral model is designed for large-scale, high-risk commercial projects requiring formal risk analysis at every cycle. MediScript-E is a medium-scale academic project — Spiral's complexity and overhead are unnecessary.

---

## Task 4: Development Strategy

### Technology Selection Rationale

| Decision | Rationale |
|----------|-----------|
| **Next.js 16** | Full-stack framework — combines frontend and API in one codebase, simplifying deployment |
| **TypeScript** | Static typing prevents runtime errors, improves maintainability |
| **PostgreSQL (Supabase)** | Managed relational database — reliable, scalable, free tier available |
| **Prisma ORM** | Type-safe database queries, automatic migration management |
| **NextAuth.js** | Battle-tested authentication library — supports credentials, OAuth, JWT out of the box |
| **Vercel** | Zero-configuration deployment for Next.js — CI/CD from GitHub push |
| **Groq SDK** | Fast, free-tier AI inference for LLM chatbot integration |
| **Nodemailer** | Gmail SMTP integration for email verification, OTP, and reminders |

### Development Environment

| Tool | Purpose |
|------|---------|
| VS Code | Primary code editor |
| pnpm | Fast, efficient package manager |
| Git + GitHub | Version control and repository hosting |
| Vercel CLI | Manual production deployments |
| Prisma Studio | Database browsing and management |
| Postman / Browser | API testing |

### Version Control Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production branch — deployed to Vercel |
| Local development | Feature development before pushing to `main` |

All commits pushed directly to `main` with meaningful commit messages. Each increment corresponds to a set of related commits.

---

## Key Findings / Learning Outcomes
- Understood that **no single SDLC model fits all projects** — model selection depends on project size, team, and requirements stability
- Learned that the **Incremental model** is most appropriate for MediScript-E because it supports evolving requirements, single-developer workflow, and continuous deployment
- Justified technology stack choices based on project requirements, not just popularity
- Recognized that Agile principles can be applied informally even without formal Agile ceremonies
- Understood that **early working software** is a key advantage of Incremental development — each module was functional before the next was started
