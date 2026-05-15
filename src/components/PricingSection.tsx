"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PricingSection() {
  const { data: session } = useSession();

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Everything you need to manage your healthcare digitally.",
      features: [
        "Book appointments with doctors",
        "View & download digital prescriptions (PDF)",
        "Secure medical vault (unlimited uploads)",
        "Medicine reminders with email alerts",
        "Appointment status tracking",
        "Two-Factor Authentication (2FA)",
        "Google & GitHub OAuth login",
        "Role-based access (Patient / Doctor / Admin)",
      ],
      notIncluded: [
        "Video consultations",
        "Priority booking",
        "Advanced health analytics",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "9.99",
      description: "Advanced features for comprehensive healthcare management.",
      features: [
        "Book appointments with doctors",
        "View & download digital prescriptions (PDF)",
        "Secure medical vault (unlimited uploads)",
        "Medicine reminders with email alerts",
        "Appointment status tracking",
        "Two-Factor Authentication (2FA)",
        "Google & GitHub OAuth login",
        "Role-based access (Patient / Doctor / Admin)",
        "Video consultations with doctors",
        "Priority appointment booking",
        "Advanced health analytics",
        "Dedicated support",
      ],
      notIncluded: [],
      popular: true,
    },
  ];

  const getButtonConfig = (plan: typeof plans[0]) => {
    if (plan.popular) {
      // Premium plan - always coming soon
      return {
        text: "Coming Soon",
        href: "#",
        disabled: true,
        className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl cursor-not-allowed opacity-70",
      };
    }

    // Free plan
    if (session) {
      // User is logged in - go to dashboard
      return {
        text: "Go to Dashboard",
        href: "/dashboard",
        disabled: false,
        className: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl",
      };
    } else {
      // User not logged in - register
      return {
        text: "Get Started Free",
        href: "/register",
        disabled: false,
        className: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl",
      };
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Zap className="h-4 w-4" />
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start free and upgrade when you need advanced features
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const buttonConfig = getButtonConfig(plan);
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 overflow-hidden ${
                  plan.popular
                    ? "border-blue-500 shadow-2xl shadow-blue-100/50 scale-105"
                    : "border-slate-200 shadow-xl hover:shadow-2xl hover:border-slate-300"
                }`}
              >
                {/* Coming Soon Corner Ribbon */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-3xl">
                    <div className="absolute top-5 -right-7 w-36 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 text-white text-[10px] font-black tracking-[0.15em] uppercase py-1.5 text-center shadow-lg"
                      style={{ transform: "rotate(45deg)" }}
                    >
                      Coming Soon
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-slate-900">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600 font-medium">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 opacity-40">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                        <X className="h-3 w-3 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-500 font-medium line-through">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={buttonConfig.href}
                  className={`block w-full text-center px-6 py-4 rounded-full font-bold text-sm transition-all ${buttonConfig.className}`}
                  onClick={(e) => buttonConfig.disabled && e.preventDefault()}
                >
                  {buttonConfig.text}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 font-medium mb-2">
            All plans include SSL encryption and secure authentication.
          </p>
          <p className="text-sm text-slate-500">
            Need a custom plan for your organization?{" "}
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-bold">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
