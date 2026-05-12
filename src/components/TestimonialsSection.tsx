"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  designation: string;
  rating: number;
  comment: string;
  avatar?: string;
  verified: boolean;
  featured: boolean;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials?verified=true");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Star className="h-4 w-4 fill-blue-700" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
              Trusted by thousands of patients and doctors across the country
            </p>

            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-12 border border-white/50">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Be the First to Share!
              </h3>
              <p className="text-slate-600 font-medium mb-6">
                We're just getting started! Login to your account and be the first to share your experience with MediScript.
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Login to Share Feedback
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
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
            <Star className="h-4 w-4 fill-blue-700" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by thousands of patients and doctors across the country
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-white/50 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-50" />
                    
                    {/* Quote icon */}
                    <div className="absolute top-8 left-8 opacity-10">
                      <Quote className="h-16 w-16 text-blue-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mb-6">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>

                      {/* Comment */}
                      <p className="text-xl md:text-2xl text-slate-700 text-center font-medium leading-relaxed mb-8">
                        "{testimonials[currentIndex].comment}"
                      </p>

                      {/* User info */}
                      <div className="flex items-center justify-center gap-4">
                        {/* Avatar */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="relative"
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl ${
                              testimonials[currentIndex].role === "DOCTOR"
                                ? "bg-gradient-to-br from-blue-500 to-blue-700"
                                : "bg-gradient-to-br from-emerald-500 to-teal-600"
                            }`}
                          >
                            {testimonials[currentIndex].name.charAt(0).toUpperCase()}
                          </div>
                          {testimonials[currentIndex].verified && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg">
                              <CheckCircle className="h-5 w-5 text-blue-500 fill-blue-500" />
                            </div>
                          )}
                        </motion.div>

                        {/* Name & Role */}
                        <div className="text-left">
                          <h4 className="text-lg font-black text-slate-900">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {testimonials[currentIndex].designation}
                            {testimonials[currentIndex].verified && (
                              <span className="ml-2 text-blue-600 font-semibold">• Verified</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {testimonials.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 p-3 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 p-3 rounded-full shadow-lg transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all ${
                  index === currentIndex
                    ? "w-8 h-2 bg-blue-600"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                } rounded-full`}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {testimonials.length}+
            </div>
            <div className="text-sm font-semibold text-slate-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {(
                testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
              ).toFixed(1)}
            </div>
            <div className="text-sm font-semibold text-slate-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {testimonials.filter((t) => t.rating === 5).length}
            </div>
            <div className="text-sm font-semibold text-slate-600">5-Star Reviews</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
