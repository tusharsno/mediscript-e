"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, Key } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Military-grade AES-256 encryption protects your data at rest and in transit.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description: "Fully compliant with healthcare data protection regulations and standards.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: Eye,
    title: "Privacy First",
    description: "Your data is yours. We never share or sell your information to third parties.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: FileCheck,
    title: "Audit Logs",
    description: "Complete transparency with detailed access logs for all your medical records.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Hosted on AWS with automatic backups and 99.9% uptime guarantee.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    border: "border-teal-100",
  },
  {
    icon: Key,
    title: "Multi-Factor Auth",
    description: "Extra layer of security with 2FA to protect your account from unauthorized access.",
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
              Bank-Level Security
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
            We take security seriously. Your medical records are protected with
            industry-leading encryption and compliance standards.
          </motion.p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 ${feature.color} rounded-3xl border ${feature.border} hover:shadow-lg transition-shadow`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
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
            <span className="font-semibold">ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">GDPR Compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
