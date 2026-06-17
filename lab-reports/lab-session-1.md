# LAB SESSION 1
## Lab Name: Software Engineering Fundamentals & Project Initiation
## Project: MediScript-E — Digital Healthcare Platform

---

## Objectives
- Understand the scope and importance of software engineering
- Identify a real-world problem suitable for a software solution
- Define project vision, stakeholders, and system boundaries

---

## Theory

Software Engineering is the application of engineering principles to software development to ensure that systems are reliable, maintainable, scalable, and cost-effective.

Unlike small programs, large software systems involve:
- Multiple stakeholders with different needs
- Long-term maintenance and evolution
- High risk and complexity
- Critical documentation at every phase

This lab introduces:
- Software crisis and the need for engineering discipline
- Characteristics of good software (correctness, reliability, usability, maintainability)
- Difference between software engineering and ad-hoc programming
- Importance of documentation throughout the SDLC

---

## Task 1: Project Title & Problem Statement

### Project Title
**MediScript-E — A Secure Digital Healthcare Platform**

### Problem Statement
Traditional healthcare management in Bangladesh and similar developing regions suffers from critical inefficiencies:

- Patients carry **physical prescriptions** that are easily lost or damaged
- **No centralized system** exists to store and access medical records securely
- Appointment booking requires **phone calls or physical hospital visits**, causing delays
- Doctors lack a **digital tool** to manage patient appointments and issue prescriptions efficiently
- Medicine schedules are frequently **forgotten** with no automated reminder system
- Medical reports are **scattered across multiple hospitals and clinics**, making history tracking impossible
- There is **no role-based access control** to ensure sensitive health data is accessed only by authorized parties

These problems result in poor patient outcomes, inefficient doctor workflows, and insecure medical data management.

---

## Task 2: Stakeholder List

| Stakeholder | Role | Interest in System |
|-------------|------|--------------------|
| Patient | Primary User | Book appointments, view prescriptions, manage health records, receive medicine reminders |
| Doctor | Primary User | Manage appointments, issue digital prescriptions, view patient information |
| Administrator | Primary User | Monitor platform statistics, manage users, oversee all appointments |
| Developer (Tushar Barua) | System Developer | Design, implement, test, and deploy the system |
| University (USTC) | Academic Stakeholder | Evaluate the project as part of Software Engineering Lab |
| Email Service (Gmail SMTP) | External Service | Deliver verification emails, OTPs, and medicine reminders |
| OAuth Providers (Google, GitHub) | External Service | Provide third-party authentication |
| Supabase | Infrastructure Provider | Host PostgreSQL database and file storage |
| Vercel | Infrastructure Provider | Host and deploy the web application |
| Groq AI | External Service | Power the AI chatbot (MediBot) |

---

## Task 3: System Scope Definition

### In-Scope Features

| Feature | Description |
|---------|-------------|
| User Registration & Authentication | Email/password registration, email verification, OAuth login (Google, GitHub), 2FA |
| Appointment Management | Patients book appointments; doctors confirm, cancel, complete |
| Digital Prescriptions | Doctors issue prescriptions; patients view and download as PDF |
| Medicine Reminders | Patients set schedules; automated email alerts via cron job |
| Medical Vault | Patients upload and manage medical documents securely |
| Admin Dashboard | Real-time statistics, user management, appointment monitoring |
| AI Chatbot (MediBot) | Platform assistance powered by Groq Llama 3.1 |
| Global Search | Role-aware search across appointments, prescriptions, users |
| Settings | Profile update, password change, 2FA toggle |

### Out-of-Scope Features

| Feature | Reason |
|---------|--------|
| Video consultations | Requires WebRTC infrastructure — planned for future |
| Payment gateway / billing | Telemedicine payments — planned for future |
| Mobile application | React Native app — planned for future |
| HIPAA / GDPR compliance certification | Regulatory process — long-term goal |
| Automated test suite (Jest) | Manual testing used for this version |
| AI symptom checker | Requires medical training data — planned for future |
| Prescription QR code for pharmacy | Pharmacy integration — planned for future |

---

## Key Findings / Learning Outcomes
- Successfully identified a real-world healthcare problem with clear pain points
- Defined **10 stakeholders** spanning users, developers, and external services
- Established clear system boundaries — 9 in-scope features and 7 out-of-scope items
- Understood that proper project initiation prevents scope creep during development
- Recognized that healthcare software requires extra attention to security and privacy from the very beginning
