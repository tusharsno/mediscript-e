# LAB SESSION 8
## Lab Name: Verification, Validation & Software Testing
## Project: MediScript-E — Digital Healthcare Platform

---

## Objectives
- Ensure correctness of MediScript-E through systematic testing
- Design comprehensive test cases for all major modules
- Create a Requirement Traceability Matrix (RTM)

---

## Theory
- **Verification:** Building the system right — ensuring implementation matches design and specifications
- **Validation:** Building the right system — ensuring the system meets actual user needs

Testing improves confidence, not perfection. For MediScript-E, testing covers authentication, appointment management, prescription handling, medical vault, and admin operations.

---

## Task 1: Test Plan

### 1.1 Test Scope
The following modules are covered:
- Authentication (Registration, Login, Email Verification, OAuth, 2FA)
- Patient Module (Appointments, Prescriptions, Medicine Reminders, Medical Vault)
- Doctor Module (Appointment Management, Prescription Issuance)
- Admin Module (Dashboard, User Management, Appointment Overview)
- Settings Module (Profile Update, Password Change, 2FA Toggle)

### 1.2 Test Types

| Test Type | Description | Tool/Method |
|-----------|-------------|-------------|
| Unit Testing | Test individual API routes and functions | Manual / Jest |
| Integration Testing | Test interaction between modules | Manual API testing |
| Functional Testing | Test against functional requirements | Browser-based manual testing |
| Security Testing | Test authentication and authorization | Manual penetration testing |
| UI Testing | Test responsiveness and user interactions | Browser DevTools |

### 1.3 Test Environment

| Environment | Details |
|-------------|---------|
| Local | `http://localhost:3000` with `.env` configuration |
| Production | `https://mediscript-e.vercel.app` |
| Database | Supabase PostgreSQL (same DB for both) |
| Browser | Chrome, Firefox, Safari |

### 1.4 Entry and Exit Criteria

| Criteria | Details |
|----------|---------|
| Entry | All features implemented, build successful (`pnpm run build`) |
| Exit | All High priority test cases pass, no critical bugs |

---

## Task 2: Test Cases

---

### Module 1: Authentication

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-01 | Register with valid credentials (Patient) | Valid name, email, password, role=PATIENT, bloodGroup=O+ | Account created, verification email sent, success message shown | High | Pass |
| TC-02 | Register with valid credentials (Doctor) | Valid name, email, password, role=DOCTOR, licenseNo, specialization | Account created, verification email sent | High | Pass |
| TC-03 | Register with existing email | Already registered email | Error: "Email already registered" | High | Pass |
| TC-04 | Register with invalid email format | `notanemail` | Validation error shown | High | Pass |
| TC-05 | Register with short password | Password < 6 characters | Error: "Password must be at least 6 characters" | High | Pass |
| TC-06 | Verify email with valid token | Valid token from email | `emailVerified: true`, redirect to login | High | Pass |
| TC-07 | Verify email with expired token | Token older than 24 hours | Error: "Verification link expired" | High | Pass |
| TC-08 | Login with valid credentials | Verified email + correct password | JWT session created, redirect to `/dashboard` | High | Pass |
| TC-09 | Login with wrong password | Valid email + wrong password | Error: "Invalid Email or Password" | High | Pass |
| TC-10 | Login with unverified email | Unverified account credentials | Error: "Please verify your email" + resend option | High | Pass |
| TC-11 | Login with Google OAuth | Valid Google account | Account created (if new), redirect to `/dashboard` | Medium | Pass |
| TC-12 | Login with GitHub OAuth | Valid GitHub account | Account created (if new), redirect to `/dashboard` | Medium | Pass |
| TC-13 | Enable 2FA from settings | Toggle 2FA on | `twoFactorEnabled: true` saved in database | High | Pass |
| TC-14 | Login with 2FA enabled | Valid credentials + 2FA enabled | OTP sent to email, redirect to `/verify-2fa` | High | Pass |
| TC-15 | Verify OTP with correct code | Valid 6-digit OTP | Session created, redirect to `/dashboard` | High | Pass |
| TC-16 | Verify OTP with wrong code | Invalid OTP | Error: "Invalid OTP" | High | Pass |
| TC-17 | Verify OTP after expiry | OTP older than 10 minutes | Error: "OTP has expired" | High | Pass |
| TC-18 | Resend OTP | Click resend after 60 seconds | New OTP sent, countdown resets | Medium | Pass |
| TC-19 | Direct 2FA bypass attempt | POST signIn with `__2fa_verified__` without OTP | Error: "Invalid credentials" | High | Pass |

---

### Module 2: Patient — Appointments

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-20 | Book appointment with valid data | Doctor, date, time, reason | Appointment created with status `PENDING` | High | Pass |
| TC-21 | Book appointment without selecting doctor | No doctor selected | Validation error | High | Pass |
| TC-22 | View all appointments | Logged in as patient | All patient appointments displayed with status | High | Pass |
| TC-23 | Cancel pending appointment | Appointment with status `PENDING` | Status updated to `CANCELLED` | Medium | Pass |

---

### Module 3: Doctor — Appointments & Prescriptions

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-24 | View assigned appointments | Logged in as doctor | All doctor appointments displayed | High | Pass |
| TC-25 | Confirm pending appointment | Appointment with status `PENDING` | Status updated to `CONFIRMED` | High | Pass |
| TC-26 | Cancel appointment | Any active appointment | Status updated to `CANCELLED` | High | Pass |
| TC-27 | Complete confirmed appointment | Appointment with status `CONFIRMED` | Status updated to `COMPLETED` | High | Pass |
| TC-28 | Issue prescription with valid data | Valid patientId, diagnosis, medications | Prescription created, visible to patient | High | Pass |
| TC-29 | Issue prescription with invalid patient ID | Non-existent patientId | Error: "Patient not found" | High | Pass |
| TC-30 | Issue prescription with missing fields | Empty diagnosis or medications | Validation error | High | Pass |

---

### Module 4: Patient — Prescriptions & Medical Vault

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-31 | View prescriptions | Logged in as patient | All prescriptions displayed with doctor name, diagnosis, medications | High | Pass |
| TC-32 | Download prescription as PDF | Click download on prescription | PDF generated and downloaded | High | Pass |
| TC-33 | Upload medical document | Valid file | File uploaded to Supabase Storage, record saved | Medium | Pass |
| TC-34 | Delete medical document | Existing document | Document deleted from storage and database | Low | Pass |

---

### Module 5: Medicine Reminders

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-35 | Add medicine reminder with valid data | Medicine name, dosage, frequency, time, dates | Reminder created and displayed | Medium | Pass |
| TC-36 | Mark medicine as taken | Active reminder | `taken: true`, `takenAt` timestamp saved | Medium | Pass |
| TC-37 | Undo taken medicine | Taken reminder | `taken: false`, `takenAt` cleared | Medium | Pass |
| TC-38 | Delete medicine reminder | Existing reminder | Reminder removed from list | Medium | Pass |
| TC-39 | Automated email reminder | Cron job trigger | Email sent to patient for due reminders | Medium | Pass |

---

### Module 6: Admin

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-40 | View admin dashboard | Logged in as admin | Real-time stats displayed (users, patients, doctors, appointments, prescriptions, contacts) | High | Pass |
| TC-41 | View all users | Logged in as admin | All users listed with profiles and roles | High | Pass |
| TC-42 | Delete another user | Valid user ID (not self) | User deleted from database | High | Pass |
| TC-43 | Delete own admin account | Admin's own user ID | Error: Cannot delete own account | High | Pass |
| TC-44 | Filter appointments by status | Status = CONFIRMED | Only confirmed appointments displayed | Medium | Pass |
| TC-45 | View contact messages | Logged in as admin | All contact form submissions displayed | Low | Pass |

---

### Module 7: Settings

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-46 | Update profile name | New valid name | Name updated in database and session | Medium | Pass |
| TC-47 | Change password with correct current password | Valid current + new password | Password updated successfully | Medium | Pass |
| TC-48 | Change password with wrong current password | Invalid current password | Error: "Current password is incorrect" | Medium | Pass |
| TC-49 | Change password with mismatched new passwords | New ≠ confirm password | Error: "Passwords do not match" | Medium | Pass |
| TC-50 | Toggle 2FA on | 2FA currently disabled | `twoFactorEnabled: true` saved | Medium | Pass |
| TC-51 | Toggle 2FA off | 2FA currently enabled | `twoFactorEnabled: false` saved | Medium | Pass |

---

### Module 8: Security Testing

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-52 | Access protected API without session | GET `/api/appointment` without auth | 401 Unauthorized | High | Pass |
| TC-53 | Access admin API as patient | GET `/api/admin/stats` as patient | 403 Forbidden | High | Pass |
| TC-54 | Access admin API as doctor | DELETE `/api/admin/users/[id]` as doctor | 403 Forbidden | High | Pass |
| TC-55 | SQL injection attempt | `' OR 1=1 --` in login email field | Prisma rejects, no data exposed | High | Pass |
| TC-56 | Access another patient's data | Patient A accessing Patient B's appointments | Only own data returned | High | Pass |

---

## Task 3: Requirement Traceability Matrix (RTM)

| FR ID | Requirement | Test Case(s) | Status |
|-------|-------------|-------------|--------|
| FR-01 | User Registration | TC-01, TC-02, TC-03, TC-04, TC-05 | Pass |
| FR-02 | Email Verification | TC-06, TC-07 | Pass |
| FR-03 | Credential Login | TC-08, TC-09, TC-10 | Pass |
| FR-04 | OAuth Login | TC-11, TC-12 | Pass |
| FR-05 | 2FA via Email OTP | TC-13, TC-14, TC-15, TC-16, TC-17, TC-18, TC-19 | Pass |
| FR-06 | Book Appointment | TC-20, TC-21 | Pass |
| FR-07 | Manage Appointments | TC-24, TC-25, TC-26, TC-27 | Pass |
| FR-08 | Issue Prescription | TC-28, TC-29, TC-30 | Pass |
| FR-09 | View/Download Prescription | TC-31, TC-32 | Pass |
| FR-10 | Medicine Reminders | TC-35, TC-36, TC-37, TC-38 | Pass |
| FR-11 | Medical Vault Upload | TC-33 | Pass |
| FR-12 | Delete Medical Report | TC-34 | Pass |
| FR-13 | Profile/Password Update | TC-46, TC-47, TC-48, TC-49 | Pass |
| FR-14 | 2FA Toggle in Settings | TC-50, TC-51 | Pass |
| FR-15 | Admin Dashboard Stats | TC-40 | Pass |
| FR-16 | Admin User Management | TC-41, TC-42, TC-43 | Pass |
| FR-17 | Admin Appointment Monitor | TC-44 | Pass |
| FR-18 | Admin Contact Messages | TC-45 | Pass |
| FR-20 | Automated Reminders (Cron) | TC-39 | Pass |
| NFR-08 | RBAC on APIs | TC-52, TC-53, TC-54 | Pass |
| NFR-13 | Input Validation | TC-55 | Pass |

---

## Key Findings / Learning Outcomes
- Designed **56 test cases** covering all 8 modules of MediScript-E
- Understood the difference between **verification** (correct implementation) and **validation** (correct system)
- Learned that security test cases are as important as functional test cases in healthcare applications
- RTM ensures every functional requirement has at least one corresponding test case — no requirement is untested
- Recognized that **edge cases** (expired tokens, wrong OTP, self-deletion prevention) are critical to test
- Testing revealed that **Prisma ORM** effectively prevents SQL injection without additional configuration
