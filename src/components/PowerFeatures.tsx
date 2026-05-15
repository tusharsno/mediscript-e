"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Hourglass, ShieldCheck, Calendar, Lock, Users } from "lucide-react";
import FeatureModal from "@/components/FeatureModal";

interface PowerFeaturesProps {
  isLoggedIn: boolean;
}

export default function PowerFeatures({ isLoggedIn }: PowerFeaturesProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const features = [
    {
      id: "appointment-booking",
      icon: Calendar,
      title: "Appointment Booking",
      description: "Patients can browse available doctors and book appointments with real-time status tracking.",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      steps: [
        { number: "1", title: "Browse Doctors", description: "View all registered doctors with their specialization." },
        { number: "2", title: "Book a Slot", description: "Select a date, time, and reason for your visit." },
        { number: "3", title: "Track Status", description: "Monitor your appointment — Pending, Confirmed, Completed, or Cancelled." },
      ],
      imageSrc: "/Book_Appointment.png",
      imageAlt: "Appointment Booking",
      fullDescription: "Patients can easily find and book appointments with available doctors. Real-time status updates keep both parties informed throughout the process.",
    },
    {
      id: "digital-prescriptions",
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Doctors issue digital prescriptions instantly. Patients can view and download them as PDF.",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50",
      steps: [
        { number: "1", title: "Doctor Issues Prescription", description: "Enter diagnosis and medication details for the patient." },
        { number: "2", title: "Instant Patient Access", description: "Patient receives the prescription immediately in their dashboard." },
        { number: "3", title: "Download as PDF", description: "Download a professionally formatted prescription anytime." },
      ],
      imageSrc: "/Prescription.png",
      imageAlt: "Digital Prescription",
      fullDescription: "Doctors can create and issue digital prescriptions with complete diagnosis and medication details. Patients receive instant access and can download as PDF.",
    },
    {
      id: "medicine-reminders",
      icon: Hourglass,
      title: "Medicine Reminders",
      description: "Set medication schedules and receive automated daily email alerts so you never miss a dose.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      steps: [
        { number: "1", title: "Set Reminder Schedule", description: "Add medicine name, dosage, frequency, and reminder time." },
        { number: "2", title: "Automated Email Alerts", description: "Receive email notifications at scheduled times daily." },
        { number: "3", title: "Track Medication", description: "Mark medicines as taken and manage your active reminders." },
      ],
      imageSrc: "/MedicineReminder.png",
      imageAlt: "Medicine Reminder",
      fullDescription: "Never miss a dose with automated email reminders. Set your medication schedule and receive timely notifications every day.",
    },
    {
      id: "medical-vault",
      icon: ShieldCheck,
      title: "Secure Medical Vault",
      description: "Upload and store lab reports, old prescriptions, and medical documents in one secure place.",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      steps: [
        { number: "1", title: "Upload Documents", description: "Securely upload medical reports and lab results to cloud storage." },
        { number: "2", title: "Organized Storage", description: "All documents are organized with upload date and file details." },
        { number: "3", title: "Access Anywhere", description: "View and download your documents anytime from any device." },
      ],
      imageSrc: "/MedicalVault.png",
      imageAlt: "Medical Vault",
      fullDescription: "Store all your medical reports, lab results, and prescriptions in one secure place. Access your complete medical history anytime, anywhere.",
    },
    {
      id: "two-factor-auth",
      icon: Lock,
      title: "Two-Factor Authentication",
      description: "Optional 2FA via email OTP adds an extra layer of security to your account.",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      steps: [
        { number: "1", title: "Enable in Settings", description: "Toggle 2FA on from your account settings anytime." },
        { number: "2", title: "Receive OTP", description: "A 6-digit code is sent to your email on every login." },
        { number: "3", title: "Secure Access", description: "OTP expires in 10 minutes — keeping your account protected." },
      ],
      imageSrc: "/2FA-system.png",
      imageAlt: "Two-Factor Authentication",
      fullDescription: "Protect your account with email-based two-factor authentication. Enable it in settings and get a 6-digit OTP on every login attempt.",
    },
    {
      id: "role-based-access",
      icon: Users,
      title: "Role-Based Access",
      description: "Separate dashboards and permissions for Patients, Doctors, and Administrators.",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      steps: [
        { number: "1", title: "Choose Your Role", description: "Register as a Patient, Doctor, or Admin with tailored access." },
        { number: "2", title: "Role-Specific Dashboard", description: "Each role gets a dedicated dashboard with relevant features only." },
        { number: "3", title: "Secure Boundaries", description: "API-level authorization ensures no role can access another's data." },
      ],
      imageSrc: "/Role-based-access.png",
      imageAlt: "Role Based Access",
      fullDescription: "MediScript-E enforces strict role-based access control. Patients, Doctors, and Admins each have their own dashboard and permissions, secured at the API level.",
    },
  ];

  const [showMore, setShowMore] = useState(false);
  const primaryFeatures = features.slice(0, 3);
  const moreFeatures = features.slice(3);

  return (
    <>
      <section id="features" className="relative min-h-[600px] w-full px-6 md:px-16 py-24 my-2 font-sans overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: "url('/power-features-bg.jpg')" }}
        />
        <div className="absolute inset-0 z-10 bg-black/80 backdrop-static" />

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col gap-16 text-white">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Power Features
            </h2>
            <p className="text-slate-400 mt-3 text-lg font-medium max-w-xl mx-auto">
              Everything you need to manage healthcare — in one platform.
            </p>
          </div>

          {/* Primary 3 features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
                    <Icon className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight leading-tight">{feature.title}</h3>
                  <div className="w-full h-px bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent mb-4" />
                  <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-[280px] mb-6">{feature.description}</p>
                  <button
                    onClick={() => setOpenModal(feature.id)}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Learn More
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* More Features expandable */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {moreFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.id} className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                      <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
                        <Icon className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 tracking-tight leading-tight">{feature.title}</h3>
                      <div className="w-full h-px bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent mb-4" />
                      <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-[280px] mb-6">{feature.description}</p>
                      <button
                        onClick={() => setOpenModal(feature.id)}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors cursor-pointer"
                      >
                        Learn More
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button - right aligned */}
          <div className="flex justify-end -mt-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-cyan-400/50 text-white/70 hover:text-cyan-400 rounded-full text-sm font-bold transition-all"
            >
              {showMore ? "Show Less" : "More Features"}
              <motion.svg
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          </div>
        </div>
      </section>

      {features.map((feature) => (
        <FeatureModal
          key={feature.id}
          isOpen={openModal === feature.id}
          onClose={() => setOpenModal(null)}
          title={feature.title}
          description={feature.fullDescription}
          icon={feature.icon}
          iconColor={feature.iconColor}
          iconBg={feature.iconBg}
          steps={feature.steps}
          imageSrc={feature.imageSrc}
          imageAlt={feature.imageAlt}
        />
      ))}
    </>
  );
}
