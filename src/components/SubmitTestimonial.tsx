"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";

export default function SubmitTestimonial() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (rating === 0) {
      setError("Please select a rating");
      setLoading(false);
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          designation: designation.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit testimonial");
      }

      setSuccess(true);
      setRating(0);
      setComment("");
      setDesignation("");

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-5 border-b border-orange-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Share Your Experience</h2>
            <p className="text-xs text-slate-500 font-medium">Help others by sharing your feedback</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-600 font-medium">
              Your testimonial has been submitted successfully.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              It will appear on our website after admin approval.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Rate Your Experience *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-semibold text-slate-600">
                    {rating === 5
                      ? "Excellent!"
                      : rating === 4
                      ? "Great!"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Fair"
                      : "Poor"}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Your Feedback *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with MediScript..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-medium text-slate-700"
                maxLength={500}
              />
              <p className="text-xs text-slate-400 mt-1">
                {comment.length}/500 characters
              </p>
            </div>

            {/* Designation (Optional) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Your Title/Designation (Optional)
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g., Cardiologist, Patient, etc."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-slate-700"
                maxLength={50}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Testimonial
                </>
              )}
            </motion.button>

            <p className="text-xs text-slate-400 text-center">
              Your testimonial will be reviewed by our team before being published.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
