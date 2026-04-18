"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, LucideIcon } from "lucide-react";
import { useEffect } from "react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureModal({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  steps,
  imageSrc,
  imageAlt,
}: FeatureModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-[#f0f4f8] rounded-3xl shadow-2xl my-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative blur elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors z-50 shadow-md backdrop-blur-sm cursor-pointer"
              >
                <X className="h-5 w-5 text-slate-700" />
              </button>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 max-h-[85vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: Content */}
                  <div>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                      <Icon className={`h-8 w-8 ${iconColor}`} />
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                      {title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                      {description}
                    </p>

                    {/* Steps */}
                    <div className="space-y-6">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          {/* Step Number */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                            {step.number}
                          </div>

                          {/* Step Content */}
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                              {step.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Image */}
                  <div className="flex items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 w-full">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={600}
                        height={500}
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
