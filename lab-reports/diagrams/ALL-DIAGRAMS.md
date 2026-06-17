# MediScript-E — All Diagrams
# For use in Project Report Word Document
# Total: 10 Diagrams | Organized by Lab Session

---

## DIAGRAM 1 — SDLC Process Diagram
**Used in:** Lab Session 2 (Software Process Models)
**Type:** Flowchart — Incremental Development Model

```mermaid
flowchart TD
    S([Project Start])
    R["Requirements & Design\nStakeholders · FR · NFR · Architecture · DB Schema"]

    subgraph I1["Increment 1 — Core Authentication"]
        A1["Plan → Code → Test"]
        B1["Registration · Email Verify · Login\nOAuth Google/GitHub · 2FA OTP · JWT"]
    end

    subgraph I2["Increment 2 — Healthcare Workflow"]
        A2["Plan → Code → Test"]
        B2["Appointments · Prescriptions · PDF\nMedicine Reminders · Medical Vault"]
    end

    subgraph I3["Increment 3 — Advanced Features"]
        A3["Plan → Code → Test"]
        B3["Admin Dashboard · MediBot AI\nGlobal Search · Settings · UI Polish"]
    end

    D["Integration & System Testing"]
    E(["Deployment — Vercel\nhttps://mediscript-e.vercel.app"])
    M["Maintenance & Ethics Review"]

    S --> R
    R --> I1
    I1 --> I2
    I2 --> I3
    I3 --> D
    D --> E
    E --> M

    style S fill:#d5e8d4,stroke:#82b366
    style R fill:#dae8fc,stroke:#6c8ebf
    style I1 fill:#d5e8d4,stroke:#82b366
    style I2 fill:#fff2cc,stroke:#d6b656
    style I3 fill:#f8cecc,stroke:#b85450
    style D fill:#e1d5e7,stroke:#9673a6
    style E fill:#d5e8d4,stroke:#82b366
    style M fill:#dae8fc,stroke:#6c8ebf
```

---

## DIAGRAM 2 — Use Case Diagram
**Used in:** Lab Session 5 (Use Case Modeling)
**Type:** Flowchart — Actor-Use Case relationships

```mermaid
flowchart LR
    Patient([Patient])
    Doctor([Doctor])
    Admin([Admin])
    Public([Public User])
    Cron([System Cron])

    subgraph Auth["Authentication"]
        UC1[Register Account]
        UC2[Verify Email]
        UC3[Login - Credentials]
        UC4[Login - OAuth]
        UC5[Two-Factor Auth 2FA]
        UC6[Update Profile / Password / 2FA]
    end

    subgraph PatientUC["Patient Features"]
        UC7[Book Appointment]
        UC8[View & Cancel Appointments]
        UC9[View & Download Prescription PDF]
        UC10[Set Medicine Reminder]
        UC11[Mark Medicine Taken]
        UC12[Upload to Medical Vault]
        UC13[Delete Medical Document]
    end

    subgraph DoctorUC["Doctor Features"]
        UC14[Manage Appointments\nConfirm / Cancel / Complete]
        UC15[Issue Prescription]
        UC16[Archive / Edit / Delete Prescription]
    end

    subgraph AdminUC["Admin Features"]
        UC17[View Dashboard Statistics]
        UC18[Manage Users - View / Delete]
        UC19[View All Appointments]
        UC20[View Contact Messages]
    end

    subgraph AllUsers["All Users"]
        UC21[Use AI Chatbot - MediBot]
        UC22[Global Search]
        UC23[Submit Contact Form]
    end

    Patient --> UC1 & UC3 & UC4 & UC5 & UC6
    Patient --> UC7 & UC8 & UC9 & UC10 & UC11 & UC12 & UC13
    Patient --> UC21 & UC22

    Doctor --> UC3 & UC4 & UC5 & UC6
    Doctor --> UC14 & UC15 & UC16
    Doctor --> UC21 & UC22

    Admin --> UC3 & UC17 & UC18 & UC19 & UC20 & UC22

    Public --> UC1 & UC2 & UC23 & UC21

    Cron --> UC24[Send Medicine Reminder Emails]

    UC3 -.->|include| UC5
```

---

## DIAGRAM 3 — Appointment Status Flow
**Used in:** Lab Session 5 (Use Case Modeling)
**Type:** State Diagram

```mermaid
stateDiagram-v2
    [*] --> PENDING : Patient books appointment

    PENDING --> CONFIRMED : Doctor confirms
    PENDING --> CANCELLED : Doctor or Patient cancels

    CONFIRMED --> COMPLETED : Doctor issues prescription or marks complete
    CONFIRMED --> CANCELLED : Doctor or Patient cancels

    COMPLETED --> [*]
    CANCELLED --> [*]
```

---

## DIAGRAM 4 — System Architecture
**Used in:** Lab Session 6 (System Design & UML)
**Type:** Flowchart — 3-Tier Architecture

```mermaid
flowchart TD
    Browser([User Browser])

    subgraph Presentation["Presentation Tier — Next.js App Router"]
        UI["React 19 + TypeScript\nTailwind CSS 4 + Framer Motion\nServer Components + Client Components\nDedicated Routes per Feature"]
    end

    subgraph Business["Business Logic Tier — Serverless API Routes"]
        API["Next.js API Routes\n/api/appointment  /api/prescription\n/api/medicine-reminder  /api/vault\n/api/admin  /api/search  /api/chatbot"]
        Auth["NextAuth.js 4\nCredentials + Google + GitHub OAuth\nJWT Sessions + 2FA OTP"]
        ORM["Prisma ORM 7\nType-safe DB Queries"]
        Email["Nodemailer\nGmail SMTP"]
        AI["Groq SDK\nLlama 3.1 8B — MediBot"]
    end

    subgraph Data["Data Tier"]
        DB[("PostgreSQL\nSupabase + PgBouncer")]
        Storage[("Supabase Storage\nBucket: medical-reports")]
    end

    subgraph External["External Services"]
        OAuthProviders["Google / GitHub OAuth"]
        Vercel["Vercel — CI/CD + Hosting"]
        GHActions["GitHub Actions\nCron Every 5 min"]
    end

    Browser -->|HTTPS| Presentation
    Presentation -->|API Calls| Business
    Business -->|Prisma Queries| Data
    Auth -->|OAuth Flow| OAuthProviders
    Email -->|Triggered by| GHActions
    Vercel -->|Deploys| Presentation
    Vercel -->|Deploys| Business

    style Presentation fill:#dae8fc,stroke:#6c8ebf
    style Business fill:#d5e8d4,stroke:#82b366
    style Data fill:#fff2cc,stroke:#d6b656
    style External fill:#f8cecc,stroke:#b85450
```

---

## DIAGRAM 5 — Entity Relationship Diagram (ERD)
**Used in:** Lab Session 6 (System Design & UML)
**Type:** ER Diagram

```mermaid
erDiagram
    User {
        string id PK
        string name
        string email
        string password
        enum role
        boolean emailVerified
        string verificationToken
        datetime verificationExpires
        boolean twoFactorEnabled
        string twoFactorCode
        datetime twoFactorExpires
        datetime createdAt
        datetime updatedAt
    }
    DoctorProfile {
        string id PK
        string specialization
        string licenseNo
        string userId FK
    }
    PatientProfile {
        string id PK
        datetime dob
        string bloodGroup
        string userId FK
    }
    Appointment {
        string id PK
        datetime date
        string time
        string reason
        string status
        string doctorId FK
        string patientId FK
        datetime createdAt
        datetime updatedAt
    }
    Prescription {
        string id PK
        string diagnosis
        string medications
        boolean archivedByDoctor
        string doctorId FK
        string patientId FK
        datetime createdAt
    }
    MedicineReminder {
        string id PK
        string medicineName
        string dosage
        string frequency
        string time
        datetime startDate
        datetime endDate
        boolean taken
        datetime takenAt
        string patientId FK
        datetime createdAt
        datetime updatedAt
    }
    MedicalVault {
        string id PK
        string fileName
        string fileUrl
        string patientId FK
        datetime createdAt
    }
    ContactMessage {
        string id PK
        string name
        string email
        string phone
        string company
        datetime createdAt
    }

    User ||--o| DoctorProfile : "has one"
    User ||--o| PatientProfile : "has one"
    DoctorProfile ||--o{ Appointment : "has many"
    PatientProfile ||--o{ Appointment : "has many"
    DoctorProfile ||--o{ Prescription : "has many"
    PatientProfile ||--o{ Prescription : "has many"
    PatientProfile ||--o{ MedicineReminder : "has many"
    PatientProfile ||--o{ MedicalVault : "has many"
```

---

## DIAGRAM 6 — Class Diagram
**Used in:** Lab Session 6 (System Design & UML)
**Type:** UML Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String password
        +Role role
        +Boolean emailVerified
        +String verificationToken
        +DateTime verificationExpires
        +Boolean twoFactorEnabled
        +String twoFactorCode
        +DateTime twoFactorExpires
        +DateTime createdAt
        +DateTime updatedAt
    }
    class DoctorProfile {
        +String id
        +String specialization
        +String licenseNo
        +String userId
    }
    class PatientProfile {
        +String id
        +DateTime dob
        +String bloodGroup
        +String userId
    }
    class Appointment {
        +String id
        +DateTime date
        +String time
        +String reason
        +String status
        +String doctorId
        +String patientId
        +DateTime createdAt
        +DateTime updatedAt
    }
    class Prescription {
        +String id
        +String diagnosis
        +String medications
        +Boolean archivedByDoctor
        +String doctorId
        +String patientId
        +DateTime createdAt
    }
    class MedicineReminder {
        +String id
        +String medicineName
        +String dosage
        +String frequency
        +String time
        +DateTime startDate
        +DateTime endDate
        +Boolean taken
        +DateTime takenAt
        +String patientId
    }
    class MedicalVault {
        +String id
        +String fileName
        +String fileUrl
        +String patientId
        +DateTime createdAt
    }
    class Role {
        <<enumeration>>
        PATIENT
        DOCTOR
        ADMIN
    }

    User "1" --> "0..1" DoctorProfile : has one
    User "1" --> "0..1" PatientProfile : has one
    User --> Role : has
    DoctorProfile "1" --> "0..*" Appointment : has many
    PatientProfile "1" --> "0..*" Appointment : has many
    DoctorProfile "1" --> "0..*" Prescription : has many
    PatientProfile "1" --> "0..*" Prescription : has many
    PatientProfile "1" --> "0..*" MedicineReminder : has many
    PatientProfile "1" --> "0..*" MedicalVault : has many
```

---

## DIAGRAM 7 — Sequence Diagram: Login with 2FA
**Used in:** Lab Session 6 (System Design & UML)
**Type:** UML Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant NextAuth
    participant Database
    participant EmailService

    User->>Browser: Enter email & password
    Browser->>NextAuth: POST /api/auth/callback/credentials
    NextAuth->>Database: findUnique(email)
    Database-->>NextAuth: user data
    NextAuth->>NextAuth: bcrypt.compare(password, hash)
    NextAuth->>Database: check emailVerified & twoFactorEnabled

    alt 2FA not enabled
        NextAuth->>NextAuth: create JWT session
        NextAuth-->>Browser: redirect /dashboard
        Browser-->>User: Dashboard loaded
    else 2FA enabled
        NextAuth-->>Browser: error 2FA_REQUIRED
        Browser->>NextAuth: POST /api/auth/2fa/send
        NextAuth->>Database: update twoFactorCode + twoFactorExpires
        NextAuth->>EmailService: sendMail OTP 10min expiry
        EmailService-->>User: Email with 6-digit OTP
        NextAuth-->>Browser: redirect /verify-2fa

        User->>Browser: Enter 6-digit OTP
        Browser->>NextAuth: POST /api/auth/2fa/verify
        NextAuth->>Database: validate OTP & check expiry

        alt OTP valid
            NextAuth->>Database: clear twoFactorCode
            Browser->>NextAuth: POST signIn twoFactorVerified true
            NextAuth->>Database: verify twoFactorCode is null
            NextAuth->>NextAuth: create JWT session
            NextAuth-->>Browser: redirect /dashboard
            Browser-->>User: Dashboard loaded
        else OTP invalid or expired
            NextAuth-->>Browser: error Invalid OTP or expired
            Browser-->>User: Error message shown
        end
    end
```

---

## DIAGRAM 8 — Sequence Diagram: Issue Prescription
**Used in:** Lab Session 6 (System Design & UML)
**Type:** UML Sequence Diagram

```mermaid
sequenceDiagram
    actor Doctor
    participant Browser
    participant API
    participant Database

    Doctor->>Browser: Navigate to /prescriptions
    Browser->>API: GET /api/appointment CONFIRMED/PENDING
    API->>Database: findMany doctorId status IN CONFIRMED PENDING
    Database-->>API: appointments with patient data
    API-->>Browser: patient list for dropdown

    Doctor->>Browser: Select patient, enter diagnosis & medications
    Doctor->>Browser: Click Issue Prescription
    Browser->>API: POST /api/prescription
    API->>API: getServerSession verify DOCTOR role
    API->>Database: findUnique doctorProfile
    Database-->>API: doctorProfile
    API->>Database: findUnique patientId
    Database-->>API: patientProfile

    alt Patient found
        API->>Database: create Prescription
        Database-->>API: prescription created
        API->>Database: update Appointment status COMPLETED
        Database-->>API: appointment updated
        API-->>Browser: 201 Created
        Browser-->>Doctor: Success message shown
    else Patient not found
        API-->>Browser: 404 Patient not found
        Browser-->>Doctor: Error message shown
    end
```

---

## DIAGRAM 9 — Sequence Diagram: MediBot AI Chatbot
**Used in:** Lab Session 6 (System Design & UML)
**Type:** UML Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant API
    participant GroqAPI

    User->>Browser: Click floating MediBot button
    Browser-->>User: Chat window opens with greeting

    User->>Browser: Type message and press Enter
    Browser->>API: POST /api/chatbot messages array
    API->>API: Validate messages array

    API->>GroqAPI: chat.completions.create llama-3.1-8b-instant systemPrompt + messages

    alt Groq API responds
        GroqAPI-->>API: AI response text
        API->>API: Strip markdown formatting
        API-->>Browser: reply plain text
        Browser-->>User: Display response in chat
    else Groq API error
        GroqAPI-->>API: Error
        API-->>Browser: 500 Failed to get response
        Browser-->>User: Something went wrong. Please try again.
    end
```

---

## DIAGRAM 10 — Security Architecture
**Used in:** Lab Session 7 (Security Engineering)
**Type:** Layered Security Diagram

```mermaid
flowchart TD
    User([User / Browser])

    subgraph L1["Layer 1: Network Security"]
        HTTPS[HTTPS enforced via Vercel]
        SSL[SSL/TLS Database Connection]
        SecureURL[Supabase Secure Storage URLs]
    end

    subgraph L2["Layer 2: Authentication Security"]
        Bcrypt[bcryptjs Password Hashing\n10 Salt Rounds]
        EmailVerify[Email Verification\n24-hour Token Expiry]
        JWT[JWT Session\n30-day Expiry]
        OAuth[Google & GitHub OAuth\nAuto-verified + Profile Picture]
        TwoFA[2FA Email OTP\n10-minute Expiry, Single Use]
    end

    subgraph L3["Layer 3: Authorization Security"]
        RBAC[Role-Based Access Control\nPATIENT / DOCTOR / ADMIN]
        Session[getServerSession on\nAll Protected API Routes]
        Ownership[Ownership Check\nBefore PATCH / DELETE]
        AdminSelf[Admin Cannot\nDelete Own Account]
    end

    subgraph L4["Layer 4: Input Security"]
        Prisma[Prisma ORM\nPrevents SQL Injection]
        Validation[Input Validation\nAll API Routes]
        FileValidation[File Type & Size\nValidation for Uploads]
        AIPrompt[AI System Prompt\nRestricts Harmful Responses]
    end

    subgraph L5["Layer 5: Data Security"]
        NoPlaintext[Passwords Never\nStored in Plaintext]
        OTPClear[OTP Cleared After Use]
        TokenClear[Verification Tokens\nCleared After Use]
        EnvVars[All Secrets in .env\nNever in Source Code]
    end

    User --> L1 --> L2 --> L3 --> L4 --> L5

    style L1 fill:#dae8fc,stroke:#6c8ebf
    style L2 fill:#d5e8d4,stroke:#82b366
    style L3 fill:#fff2cc,stroke:#d6b656
    style L4 fill:#f8cecc,stroke:#b85450
    style L5 fill:#e1d5e7,stroke:#9673a6
```

---

## HOW TO USE IN WORD DOCUMENT

1. Go to https://mermaid.live
2. Paste each diagram code
3. Export as PNG (high resolution)
4. Insert into Word at the appropriate Lab Session section

## DIAGRAM PLACEMENT GUIDE

| Diagram | Insert After |
|---|---|
| 1. SDLC Process | Lab 2 — Selected Model section |
| 2. Use Case Diagram | Lab 5 — Task 2 |
| 3. Appointment Status Flow | Lab 5 — after Use Case Diagram |
| 4. System Architecture | Lab 6 — Task 1 |
| 5. ER Diagram | Lab 6 — Task 2 |
| 6. Class Diagram | Lab 6 — Task 4.1 |
| 7. Sequence: Login 2FA | Lab 6 — Task 4.2 |
| 8. Sequence: Issue Prescription | Lab 6 — Task 4.3 |
| 9. Sequence: MediBot | Lab 6 — Task 4.4 |
| 10. Security Architecture | Lab 7 — Security Design |
