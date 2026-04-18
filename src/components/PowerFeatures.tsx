"use client";

import React, { useState } from "react";
import { FileText, Hourglass, ShieldCheck } from "lucide-react";
import FeatureModal from "@/components/FeatureModal";

interface PowerFeaturesProps {
  isLoggedIn: boolean;
}

export default function PowerFeatures({ isLoggedIn }: PowerFeaturesProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const features = [
    {
      id: "digital-prescriptions",
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Easy prescription creation and digital signature facility for doctors.",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      steps: [
        {
          number: "1",
          title: "Doctor Creates Prescription",
          description: "Enter patient ID, diagnosis, and medication details with dosage instructions.",
        },
        {
          number: "2",
          title: "Instant Patient Access",
          description: "Patient receives the prescription immediately in their dashboard.",
        },
        {
          number: "3",
          title: "Download as PDF",
          description: "Download professionally formatted prescription with doctor's information.",
        },
      ],
      imageSrc: "/Prescription.png",
      imageAlt: "Digital Prescription Demo",
      fullDescription: "Doctors can create and issue digital prescriptions with complete patient information, diagnosis, and medication details. Patients receive instant access and can download as PDF.",
    },
    {
      id: "medicine-reminders",
      icon: Hourglass,
      title: "Medicine Reminders",
      description: "An automatic alert or reminder system for patients to take their medicines regularly.",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      steps: [
        {
          number: "1",
          title: "Set Reminder Schedule",
          description: "Add medicine name, dosage, and set daily reminder time.",
        },
        {
          number: "2",
          title: "Automated Email Alerts",
          description: "Receive email notifications at scheduled times with medicine details.",
        },
        {
          number: "3",
          title: "Track Medication",
          description: "Mark medicines as taken and view your medication history.",
        },
      ],
      imageSrc: "/MedicineReminder.png",
      imageAlt: "Medicine Reminder Demo",
      fullDescription: "Never miss a dose with automated email reminders. Set your medication schedule and receive timely notifications to take your medicines regularly.",
    },
    {
      id: "medical-vault",
      icon: ShieldCheck,
      title: "Secure Medical Vault",
      description: "An online vault to securely store your lab reports and old prescriptions.",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      steps: [
        {
          number: "1",
          title: "Upload Documents",
          description: "Securely upload medical reports, lab results, and prescriptions to Supabase storage.",
        },
        {
          number: "2",
          title: "Organized Storage",
          description: "All documents are organized with upload date and file information.",
        },
        {
          number: "3",
          title: "Easy Access",
          description: "View and download your documents anytime from any device.",
        },
      ],
      imageSrc: "/MedicalVault.png",
      imageAlt: "Medical Vault Demo",
      fullDescription: "Store all your medical reports, lab results, and prescriptions in one secure place. Access your complete medical history anytime, anywhere.",
    },
  ];

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
                    <Icon className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight leading-tight">
                    {feature.title}
                  </h3>
                  <div className="w-full h-px bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent mb-4" />
                  <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-[280px] mb-6">
                    {feature.description}
                  </p>
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
