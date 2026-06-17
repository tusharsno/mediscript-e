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

Testing improves confidence, not perfection. For MediScript-E, testing covers authentication, appointment management, prescription handling, medical vault, AI chatbot, search, and admin operations.

---

## Task 1: Test Plan

### 1.1 Test Scope
The following modules are covered:
- Authentication (Registration, Login, Email Verification, OAuth, 2FA)
- Patient Module (Appointments, Prescriptions, Medicine Reminders, Medical Vault)
- Doctor Module (Appointment Management, Prescription Issuance, Archive/Edit/Delete)
- Admin Module (Dashboard, User Management, Appointment Overview)
- AI Chatbot Module (MediBot)
- Search Module (Global Search)
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
| Database | Supabase PostgreSQL |
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
| TC-01 | Register with valid credentials (Patient) | Valid name, email, password, role=PATIENT, bloodGroup=O+ | Account created, verification email sent | High | Pass |
| TC-02 | Register with valid credentials (Doctor) | Valid name, email, password, role=DOCTOR, licenseNo, specialization | Account created, verification email sent | High | Pass |
| TC-03 | Register with existing email | Already registered email | Error: "Email already registered" | High | Pass |
| TC-04 | Register with invalid email format | `notanemail` | Validation error shown | High | Pass |
| TC-05 | Register with short password | Password < 6 characters | Error shown | High | Pass |
| TC-06 | Verify email with valid token | Valid token from email | `emailVerified: true`, redirect to login | High | Pass |
| TC-07 | Verify email with expired token | Token older than 24 hours | Error: "Verification link expired" | High | Pass |
| TC-08 | Login with valid credentials | Verified email + correct password | JWT session created, redirect to `/dashboard` | High | Pass |
| TC-09 | Login with wrong password | Valid email + wrong password | Error: "Invalid Email or Password" | High | Pass |
| TC-10 | Login with unverified email | Unverified account credentials | Error: "Please verify your email" | High | Pass |
| TC-11 | Login with Google OAuth | Valid Google account | Account created (if new), profile picture in session, redirect to `/dashboard` | Medium | Pass |
| TC-12 | Login with GitHub OAuth | Valid GitHub account | Account created (if new), profile picture in session, redirect to `/dashboard` | Medium | Pass |
| TC-13 | Profile picture displayed after OAuth login | Google/GitHub OAuth login | Profile picture shown in navbar and sidebar | Medium | Pass |
| TC-14 | Enable 2FA from settings | Toggle 2FA on | `twoFactorEnabled: true` saved | High | Pass |
| TC-15 | Login with 2FA enabled | Valid credentials + 2FA enabled | OTP sent to email, redirect to `/verify-2fa` | High | Pass |
| TC-16 | Verify OTP with correct code | Valid 6-digit OTP | Session created, redirect to `/dashboard` | High | Pass |
| TC-17 | Verify OTP with wrong code | Invalid OTP | Error: "Invalid OTP" | High | Pass |
| TC-18 | Verify OTP after expiry | OTP older than 10 minutes | Error: "OTP has expired" | High | Pass |
| TC-19 | Resend OTP | Click resend after 60 seconds | New OTP sent, countdown resets | Medium | Pass |
| TC-20 | Direct 2FA bypass attempt | POST signIn with `__2fa_verified__` without OTP | Error: "Invalid credentials" | High | Pass |

---

### Module 2: Patient — Appointments

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-21 | Navigate to /appointments page | Logged in as patient | Appointments page loads with booking form and list | High | Pass |
| TC-22 | Book appointment with valid data | Doctor, date, time, reason | Appointment created with status `PENDING` | High | Pass |
| TC-23 | Book appointment without selecting doctor | No doctor selected | Validation error | High | Pass |
| TC-24 | View all appointments with filter | Filter by PENDING | Only pending appointments shown | High | Pass |
| TC-25 | Cancel pending appointment | Appointment with status `PENDING` | Status updated to `CANCELLED` | Medium | Pass |

---

### Module 3: Doctor — Appointments & Prescriptions

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-26 | Navigate to /appointments page | Logged in as doctor | Doctor appointments page loads with filter tabs | High | Pass |
| TC-27 | Default filter shows PENDING | Page load | PENDING tab selected by default | Medium | Pass |
| TC-28 | Confirm pending appointment | Appointment with status `PENDING` | Status updated to `CONFIRMED` | High | Pass |
| TC-29 | Cancel appointment with confirmation | Any active appointment | Confirmation dialog shown, then status updated to `CANCELLED` | High | Pass |
| TC-30 | Complete confirmed appointment with confirmation | Appointment with status `CONFIRMED` | Confirmation dialog shown, then status updated to `COMPLETED` | High | Pass |
| TC-31 | Navigate to /prescriptions page | Logged in as doctor | Prescription form and list shown | High | Pass |
| TC-32 | Issue prescription with valid data | Valid patient, diagnosis, medications | Prescription created, appointment auto-completed | High | Pass |
| TC-33 | Issue prescription auto-completes appointment | Issue prescription for confirmed appointment | Related appointment status → COMPLETED | High | Pass |
| TC-34 | Issue prescription with missing fields | Empty diagnosis or medications | Validation error | High | Pass |
| TC-35 | Archive prescription | Active prescription | Prescription moves to Archived tab | Medium | Pass |
| TC-36 | Unarchive prescription | Archived prescription | Prescription moves back to Active tab | Medium | Pass |
| TC-37 | Edit prescription | Active prescription | Inline edit form shown, changes saved | Medium | Pass |
| TC-38 | Delete prescription with confirmation | Any prescription | Confirmation dialog shown, then prescription deleted | Medium | Pass |

---

### Module 4: Patient — Prescriptions & Medical Vault

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-39 | Navigate to /prescriptions page | Logged in as patient | All prescriptions displayed | High | Pass |
| TC-40 | Download prescription as PDF | Click download on prescription | PDF generated and downloaded | High | Pass |
| TC-41 | Navigate to /vault page | Logged in as patient | Medical vault page loads | Medium | Pass |
| TC-42 | Upload medical document | Valid file | File uploaded to Supabase Storage, record saved | Medium | Pass |
| TC-43 | Delete medical document | Existing document | Document deleted from storage and database | Low | Pass |

---

### Module 5: Medicine Reminders

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-44 | Navigate to /reminders page | Logged in as patient | Reminders page loads | Medium | Pass |
| TC-45 | Add medicine reminder with valid data | Medicine name, dosage, frequency, time, dates | Reminder created and displayed | Medium | Pass |
| TC-46 | Mark medicine as taken | Active reminder | `taken: true`, `takenAt` timestamp saved | Medium | Pass |
| TC-47 | Undo taken medicine | Taken reminder | `taken: false`, `takenAt` cleared | Medium | Pass |
| TC-48 | Delete medicine reminder | Existing reminder | Reminder removed from list | Medium | Pass |
| TC-49 | Automated email reminder | Cron job trigger | Email sent to patient for due reminders | Medium | Pass |

---

### Module 6: AI Chatbot (MediBot)

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-50 | Open chatbot | Click floating chat button | Chat window opens with greeting | Medium | Pass |
| TC-51 | Ask platform-related question | "What is MediScript-E?" | Accurate platform description in English | Medium | Pass |
| TC-52 | Ask about features | "What can patients do?" | List of patient features in plain text | Medium | Pass |
| TC-53 | Ask unrelated question | "What is the capital of France?" | Redirected to platform topics | Medium | Pass |
| TC-54 | Ask for medical advice | "What medicine should I take for fever?" | Recommends consulting a real doctor | Medium | Pass |
| TC-55 | Ask in Bengali | "MediScript-E কী?" | Response in Bangla (chatbot responds in user's language) | Medium | Pass |
| TC-56 | Conversation history maintained | Multiple messages | Context maintained across messages | Low | Pass |

---

### Module 7: Global Search

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-57 | Search as patient | Type doctor name | Matching appointments shown | Medium | Pass |
| TC-58 | Search as doctor | Type patient name | Matching patients and appointments shown | Medium | Pass |
| TC-59 | Search as admin | Type user email | Matching users shown | Medium | Pass |
| TC-60 | Empty search | Clear search input | Dropdown closes | Low | Pass |
| TC-61 | No results | Random string | "No results found." shown | Low | Pass |
| TC-62 | Click search result | Click appointment result | Scrolls to appointments section | Low | Pass |

---

### Module 8: Admin

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-63 | View admin dashboard | Logged in as admin | Real-time stats displayed (users, patients, doctors, appointments, prescriptions, contacts) | High | Pass |
| TC-64 | Navigate to /users page | Logged in as admin | All users listed with profiles and roles | High | Pass |
| TC-65 | Delete another user | Valid user ID (not self) | User deleted from database | High | Pass |
| TC-66 | Delete own admin account | Admin's own user ID | Error: Cannot delete own account | High | Pass |
| TC-67 | Navigate to /appointments page | Logged in as admin | All appointments with filter | Medium | Pass |
| TC-68 | Navigate to /contacts page | Logged in as admin | All contact form submissions displayed | Low | Pass |

---

### Module 9: Settings

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-69 | Update profile name | New valid name | Name updated in database and session | Medium | Pass |
| TC-70 | Change password with correct current password | Valid current + new password | Password updated successfully | Medium | Pass |
| TC-71 | Change password with wrong current password | Invalid current password | Error: "Current password is incorrect" | Medium | Pass |
| TC-72 | Change password with mismatched new passwords | New ≠ confirm password | Error: "Passwords do not match" | Medium | Pass |
| TC-73 | Toggle 2FA on | 2FA currently disabled | `twoFactorEnabled: true` saved | Medium | Pass |
| TC-74 | Toggle 2FA off | 2FA currently enabled | `twoFactorEnabled: false` saved | Medium | Pass |

---

### Module 10: Security Testing

| TC ID | Test Case | Input | Expected Output | Priority | Status |
|-------|-----------|-------|-----------------|----------|--------|
| TC-75 | Access protected API without session | GET `/api/appointment` without auth | 401 Unauthorized | High | Pass |
| TC-76 | Access admin API as patient | GET `/api/admin/stats` as patient | 403 Forbidden | High | Pass |
| TC-77 | Access admin API as doctor | DELETE `/api/admin/users/[id]` as doctor | 403 Forbidden | High | Pass |
| TC-78 | SQL injection attempt | `' OR 1=1 --` in login email field | Prisma rejects, no data exposed | High | Pass |
| TC-79 | Access another patient's data | Patient A accessing Patient B's appointments | Only own data returned | High | Pass |
| TC-80 | Search cross-user data | Patient searching for another patient's records | Only own data returned | High | Pass |
| TC-81 | Access patient-only page as doctor | Doctor navigating to `/reminders` | Redirect to `/dashboard` | High | Pass |
| TC-82 | Access admin-only page as patient | Patient navigating to `/users` | Redirect to `/dashboard` | High | Pass |

---

## Task 3: Requirement Traceability Matrix (RTM)

| FR ID | Requirement | Test Case(s) | Status |
|-------|-------------|-------------|--------|
| FR-01 | User Registration | TC-01, TC-02, TC-03, TC-04, TC-05 | Pass |
| FR-02 | Email Verification | TC-06, TC-07 | Pass |
| FR-03 | Credential Login | TC-08, TC-09, TC-10 | Pass |
| FR-04 | OAuth Login with Profile Picture | TC-11, TC-12, TC-13 | Pass |
| FR-05 | 2FA via Email OTP | TC-14, TC-15, TC-16, TC-17, TC-18, TC-19, TC-20 | Pass |
| FR-06 | Book Appointment | TC-21, TC-22, TC-23 | Pass |
| FR-07 | Manage Appointments | TC-26, TC-27, TC-28, TC-29, TC-30 | Pass |
| FR-08 | Issue Prescription | TC-31, TC-32, TC-33, TC-34 | Pass |
| FR-09 | View/Download Prescription | TC-39, TC-40 | Pass |
| FR-10 | Medicine Reminders | TC-44, TC-45, TC-46, TC-47, TC-48 | Pass |
| FR-11 | Medical Vault Upload | TC-41, TC-42 | Pass |
| FR-12 | Delete Medical Report | TC-43 | Pass |
| FR-13 | Profile/Password Update | TC-69, TC-70, TC-71, TC-72 | Pass |
| FR-14 | 2FA Toggle in Settings | TC-73, TC-74 | Pass |
| FR-15 | Admin Dashboard Stats | TC-63 | Pass |
| FR-16 | Admin User Management | TC-64, TC-65, TC-66 | Pass |
| FR-17 | Admin Appointment Monitor | TC-67 | Pass |
| FR-18 | Admin Contact Messages | TC-68 | Pass |
| FR-20 | Automated Reminders (Cron) | TC-49 | Pass |
| FR-21 | Prescription Archive | TC-35, TC-36 | Pass |
| FR-22 | Prescription Edit/Delete | TC-37, TC-38 | Pass |
| FR-23 | AI Chatbot (MediBot) | TC-50, TC-51, TC-52, TC-53, TC-54, TC-55, TC-56 | Pass |
| FR-19 | Contact Form | TC-57-public | Pass |
| FR-24 | Global Search | TC-57, TC-58, TC-59, TC-60, TC-61, TC-62 | Pass |
| FR-25 | OAuth Profile Pictures | TC-13 | Pass |
| FR-26 | Dedicated Feature Pages | TC-21, TC-26, TC-31, TC-41, TC-44, TC-64, TC-67, TC-68 | Pass |
| NFR-08 | RBAC on APIs | TC-75, TC-76, TC-77, TC-81, TC-82 | Pass |
| NFR-13 | Input Validation | TC-78 | Pass |
| NFR-15 | Role-based search | TC-79, TC-80 | Pass |

---

## Key Findings / Learning Outcomes
- Designed **82 test cases** covering all 10 modules of MediScript-E
- New modules tested: AI Chatbot (TC-50 to TC-56), Global Search (TC-57 to TC-62), Security for new routes (TC-81, TC-82)
- Understood the difference between **verification** (correct implementation) and **validation** (correct system)
- Learned that AI chatbot requires specific test cases for content safety and language enforcement
- RTM ensures every functional requirement has at least one corresponding test case
- Recognized that dedicated routes require additional security tests to prevent unauthorized access
- Testing revealed that prescription auto-complete on issuance is a critical integration test
