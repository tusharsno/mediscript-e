"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, XCircle, Trash2, Award } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  designation: string;
  rating: number;
  comment: string;
  verified: boolean;
  featured: boolean;
  createdAt: string;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, verified: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified }),
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, verified } : t))
        );
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
  };

  const handleFeature = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured }),
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, featured } : t))
        );
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">
          Testimonials Management
        </h2>
        <div className="text-sm text-slate-500">
          Total: {testimonials.length} | Verified: {testimonials.filter((t) => t.verified).length}
        </div>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl">
          <p className="text-slate-500 font-medium">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left side - Content */}
                <div className="flex-1">
                  {/* User info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black ${
                        testimonial.role === "DOCTOR"
                          ? "bg-gradient-to-br from-blue-500 to-blue-700"
                          : "bg-gradient-to-br from-emerald-500 to-teal-600"
                      }`}
                    >
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 mb-3">"{testimonial.comment}"</p>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {testimonial.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                    {testimonial.featured && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        <Award className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleVerify(testimonial.id, !testimonial.verified)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      testimonial.verified
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {testimonial.verified ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Verified
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        Verify
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleFeature(testimonial.id, !testimonial.featured)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      testimonial.featured
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Award className="h-4 w-4" />
                    {testimonial.featured ? "Featured" : "Feature"}
                  </button>

                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
