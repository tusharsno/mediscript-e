# 🏥 MediScript-E - Digital Healthcare Platform

A modern, secure digital healthcare platform built with Next.js 16, enabling seamless interaction between patients and doctors with features like appointment booking, e-prescriptions, and medical record management.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.7.0-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-green)

## 🌟 Features

### 👨‍⚕️ For Doctors
- **Appointment Management**: View, confirm, cancel, and complete patient appointments
- **Digital Prescriptions**: Issue prescriptions with diagnosis and medications
- **Patient Information**: Access patient details and appointment history
- **Doctor Profile**: Manage specialization and license information

### 👤 For Patients
- **Appointment Booking**: Book appointments with available doctors
- **Medical Vault**: Securely upload and store medical reports (Supabase Storage)
- **E-Prescriptions**: View and download prescriptions as PDF
- **Appointment Tracking**: Monitor appointment status (Pending/Confirmed/Completed)
- **Medical Records**: Access all uploaded documents in one place

### 🔐 Security & Authentication
- **NextAuth Integration**: Secure credential-based authentication
- **Role-Based Access Control**: PATIENT, DOCTOR, ADMIN roles
- **Password Encryption**: bcryptjs hashing
- **Session Management**: JWT-based sessions

### 🎨 User Interface
- **Modern Design**: Tailwind CSS with custom styling
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Framer Motion integration
- **Dashboard Sidebar**: Easy navigation with hash-based routing

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.2.3 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.38.0
- **Icons**: Lucide React 1.8.0
- **Forms**: React Hook Form 7.72.1

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth 4.24.13
- **Database ORM**: Prisma 7.7.0
- **Database**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **Email**: Nodemailer 6.9.16

### Development
- **Language**: TypeScript 5.x
- **Linting**: ESLint 9
- **Package Manager**: npm/pnpm

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Supabase account for storage

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/mediscript-e.git
cd mediscript-e
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Email (Optional - for contact form)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

4. **Database Setup**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (or use Supabase SQL Editor)
npx prisma migrate dev
```

**Alternative: Use Supabase SQL Editor**

Run the migration SQL files in `prisma/migrations/` directory via Supabase SQL Editor.

5. **Create Supabase Storage Bucket**

- Go to Supabase Dashboard → Storage
- Create a new bucket named `medical-reports`
- Set it to **Public** access

6. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mediscript-e/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── appointment/  # Appointment CRUD
│   │   │   ├── auth/         # NextAuth
│   │   │   ├── contact/      # Contact form
│   │   │   ├── doctors/      # Doctor list
│   │   │   ├── prescription/ # Prescription API
│   │   │   ├── register/     # User registration
│   │   │   ├── settings/     # Profile/password update
│   │   │   └── vault/        # Medical vault
│   │   ├── dashboard/        # Dashboard page
│   │   ├── login/            # Login page
│   │   ├── register/         # Register page
│   │   ├── settings/         # Settings page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── BookAppointment.tsx
│   │   ├── ContactSection.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DoctorAppointments.tsx
│   │   ├── DownloadPDF.tsx
│   │   ├── FileUpload.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MyAppointments.tsx
│   │   ├── Navbar.tsx
│   │   ├── PowerFeatures.tsx
│   │   ├── PrescriptionForm.tsx
│   │   ├── SecuritySection.tsx
│   │   └── SettingsForm.tsx
│   ├── hooks/
│   │   └── useScrollHash.ts  # Scroll-based hash navigation
│   └── lib/
│       ├── auth.ts           # NextAuth configuration
│       ├── db.ts             # Prisma client
│       └── supabase.ts       # Supabase client
├── .env                      # Environment variables
├── .env.example              # Example env file
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and profile
- **DoctorProfile**: Doctor-specific information
- **PatientProfile**: Patient-specific information
- **Appointment**: Booking system with status tracking
- **Prescription**: Digital prescriptions
- **MedicalVault**: Uploaded medical documents
- **ContactMessage**: Landing page contact form submissions

### Appointment Status Flow

```
PENDING → CONFIRMED → COMPLETED
   ↓
CANCELLED
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all `.env` variables are set in your deployment platform.

## 📝 Usage Guide

### For Patients

1. **Register** as a PATIENT
2. **Login** to dashboard
3. **Book Appointment**: Select doctor, date, and time
4. **Upload Medical Records**: Use Medical Vault
5. **View Prescriptions**: Download as PDF
6. **Manage Profile**: Update name and password in Settings

### For Doctors

1. **Register** as a DOCTOR (with license number)
2. **Login** to dashboard
3. **Manage Appointments**: Confirm/Cancel/Complete
4. **Issue Prescriptions**: Enter patient ID, diagnosis, medications
5. **View Patient Details**: Access appointment history

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/register` - User registration

### Appointments
- `GET /api/appointment` - Get user appointments
- `POST /api/appointment` - Create appointment
- `PATCH /api/appointment/[id]` - Update appointment status
- `DELETE /api/appointment/[id]` - Delete appointment

### Doctors
- `GET /api/doctors` - Get all doctors

### Prescriptions
- `POST /api/prescription` - Create prescription

### Medical Vault
- `POST /api/vault` - Upload medical record
- `DELETE /api/vault/[id]` - Delete record

### Settings
- `PATCH /api/settings/profile` - Update profile
- `PATCH /api/settings/password` - Change password

### Contact
- `POST /api/contact` - Submit contact form

## 🎨 Design System

### Colors
- **Primary**: `#1A6080` (Teal Blue)
- **Success**: Emerald shades
- **Warning**: Yellow shades
- **Danger**: Red shades
- **Neutral**: Slate shades

### Typography
- **Font**: Geist (Next.js default)
- **Headings**: font-black (900 weight)
- **Body**: font-medium (500 weight)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Tushar**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Supabase for database and storage
- Tailwind CSS for styling utilities

---

**Built with ❤️ using Next.js and TypeScript**
