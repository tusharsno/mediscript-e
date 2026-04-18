"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, Key } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "NextAuth Authentication",
    description: "Secure credential-based authentication with JWT session management and protected routes.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Lock,
    title: "Password Encryption",
    description: "All passwords are hashed using bcryptjs with salt rounds for maximum security.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: Eye,
    title: "Role-Based Access Control",
    description: "PATIENT, DOCTOR, and ADMIN roles with strict authorization checks on all endpoints.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: FileCheck,
    title: "Secure File Storage",
    description: "Medical documents stored on Supabase with access control and secure URLs.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
  {
    icon: Server,
    title: "PostgreSQL Database",
    description: "Production-grade database with SSL connections and data encryption at rest.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    border: "border-teal-100",
  },
  {
    icon: Key,
    title: "API Security",
    description: "Protected API routes with Bearer token authentication and session validation.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-slate-600 text-sm font-semibold">
              Production-Grade Security
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
          >
            Your Health Data is Safe with Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            We implement industry-standard security practices. Your medical data is
            protected with modern encryption and authentication technologies.
          </motion.p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 delay-100`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-black text-xl text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-[15px]">
                    {feature.description}
                  </p>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${feature.color} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100`} />
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold">NextAuth Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">bcrypt Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">SSL Protected</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
