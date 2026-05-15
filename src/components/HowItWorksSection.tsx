"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Calendar, Bell, FileText, CheckCircle, ClipboardList, Archive, ArrowRight, User, Stethoscope } from "lucide-react";
import Link from "next/link";

interface HowItWorksProps {
  isLoggedIn: boolean;
}

const PATIENT_STEPS = [
  {
    icon: UserPlus,
    title: "Register & Verify",
    description: "Sign up as a Patient, verify your email, and optionally enable 2FA for extra security.",
    color: "from-[#1A6080] to-[#0d4a63]",
    bg: "bg-blue-50",
    iconColor: "text-[#1A6080]",
    border: "border-blue-200",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Browse available doctors, pick a time slot, and book your appointment instantly.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-200",
  },
  {
    icon: Bell,
    title: "Set Medicine Reminders",
    description: "Add your medications with dosage and schedule. Get automated email alerts daily.",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-200",
  },
  {
    icon: FileText,
    title: "Download Prescription",
    description: "Once your doctor issues a prescription, view and download it as a PDF anytime.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-200",
  },
];

const DOCTOR_STEPS = [
  {
    icon: UserPlus,
    title: "Register as Doctor",
    description: "Sign up with your license number and specialization. Verify your email to activate.",
    color: "from-blue-600 to-blue-700",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-200",
  },
  {
    icon: CheckCircle,
    title: "Manage Appointments",
    description: "View incoming appointment requests. Confirm, cancel, or mark them as completed.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-200",
  },
  {
    icon: ClipboardList,
    title: "Issue Prescription",
    description: "Select a patient, write diagnosis and medications. The appointment auto-completes.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    border: "border-teal-200",
  },
  {
    icon: Archive,
    title: "Archive & Manage",
    description: "Edit or archive old prescriptions. Archived ones stay hidden but are never deleted.",
    color: "from-slate-500 to-slate-600",
    bg: "bg-slate-50",
    iconColor: "text-slate-600",
    border: "border-slate-200",
  },
];

export default function HowItWorksSection({ isLoggedIn }: HowItWorksProps) {
  const [tab, setTab] = useState<"patient" | "doctor">("patient");
  const steps = tab === "patient" ? PATIENT_STEPS : DOCTOR_STEPS;

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#1A6080]/10 text-[#1A6080] px-4 py-2 rounded-full text-sm font-bold mb-4">
            <ArrowRight className="h-4 w-4" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
            Get started in 4 simple steps — whether you're a patient or a doctor.
          </p>
        </motion.div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm gap-1">
            <button
              onClick={() => setTab("patient")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "patient"
                  ? "bg-[#1A6080] text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User className="h-4 w-4" />
              For Patients
            </button>
            <button
              onClick={() => setTab("doctor")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "doctor"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              For Doctors
            </button>
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex items-stretch gap-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex-1"
                    >
                      {/* Card */}
                      <div className={`bg-white rounded-2xl p-5 border ${step.border} shadow-sm hover:shadow-md transition-all h-full`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`h-6 w-6 ${step.iconColor}`} />
                          </div>
                        </div>
                        <h3 className="font-black text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>

                    {/* Arrow between cards */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center w-6 flex-shrink-0 -mx-0">
                        <ArrowRight className="h-4 w-4 text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1A6080] to-[#0d4a63] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm text-slate-400 mt-3 font-medium">Free to use • No credit card required</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
