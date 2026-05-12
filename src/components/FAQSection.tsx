"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "Simply sign up as a patient, browse our list of verified doctors, select your preferred doctor and time slot, and confirm your booking. You'll receive instant confirmation.",
    },
    {
      question: "Is my medical data secure?",
      answer: "Absolutely! We use end-to-end encryption, secure HTTPS connections, and follow HIPAA compliance standards. Your data is stored securely and never shared without your consent.",
    },
    {
      question: "Can I download my prescriptions?",
      answer: "Yes! All digital prescriptions can be downloaded as PDF files. You can access them anytime from your dashboard and share them with pharmacies or other healthcare providers.",
    },
    {
      question: "How do medicine reminders work?",
      answer: "Set up medication schedules with dosage and frequency. You'll receive email notifications at the specified times. Mark medications as taken to track your adherence.",
    },
    {
      question: "Is MediScript free to use?",
      answer: "Yes! MediScript is completely free for both patients and doctors. Book appointments, manage prescriptions, and store medical records at no cost.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about MediScript
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className={`relative bg-white/80 backdrop-blur-md rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "border-purple-200 shadow-xl shadow-purple-100/50"
                    : "border-slate-100 hover:border-purple-100 shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity duration-300 ${
                  openIndex === index ? "opacity-100" : ""
                }`} />
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="relative z-10 w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`h-6 w-6 transition-colors ${
                        openIndex === index ? "text-purple-600" : "text-slate-400"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-slate-600 leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 font-medium mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold transition-colors"
          >
            Contact our support team
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
