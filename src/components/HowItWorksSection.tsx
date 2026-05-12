"use client";

import { motion } from "framer-motion";
import { UserPlus, Calendar, FileText, FolderOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HowItWorksProps {
  isLoggedIn: boolean;
}

export default function HowItWorksSection({ isLoggedIn }: HowItWorksProps) {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free account in seconds. Choose your role as Patient or Doctor.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Browse verified doctors and book appointments at your convenience.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      icon: FileText,
      title: "Get Prescription",
      description: "Receive digital prescriptions from doctors. Download as PDF anytime.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: FolderOpen,
      title: "Track Records",
      description: "Store and access all your medical records securely in one place.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <ArrowRight className="h-4 w-4" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get started with MediScript in 4 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-emerald-200 via-purple-200 to-orange-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="relative card-3d"
                >
                  {/* Step Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-black text-lg shadow-xl`}>
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Card */}
                  <div className={`relative bg-white/80 backdrop-blur-md rounded-2xl p-6 pt-10 border-2 ${step.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group`}>
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`relative z-10 w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className={`h-8 w-8 ${step.iconColor}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="relative z-10 text-xl font-black text-slate-900 mb-3 text-center">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 text-sm text-slate-600 text-center leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 z-20">
                      <ArrowRight className="h-6 w-6 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            <p className="text-sm text-slate-400 mt-4 font-medium">
              No credit card required • Free forever
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
