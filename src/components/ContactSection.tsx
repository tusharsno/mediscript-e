// "use client";

// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Clock } from "lucide-react";

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Phone",
//     detail: "+1 (234) 567-890",
//     link: "tel:+1234567890",
//     color: "bg-blue-50",
//     iconColor: "text-blue-600",
//     border: "border-blue-100",
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     detail: "support@mediscript.com",
//     link: "mailto:support@mediscript.com",
//     color: "bg-emerald-50",
//     iconColor: "text-emerald-600",
//     border: "border-emerald-100",
//   },
//   {
//     icon: MapPin,
//     title: "Address",
//     detail: "123 Healthcare Street, Medical District",
//     link: null,
//     color: "bg-purple-50",
//     iconColor: "text-purple-600",
//     border: "border-purple-100",
//   },
//   {
//     icon: Clock,
//     title: "Working Hours",
//     detail: "24/7 Available",
//     link: null,
//     color: "bg-orange-50",
//     iconColor: "text-orange-600",
//     border: "border-orange-100",
//   },
// ];

// export default function ContactSection() {
//   return (
//     <section id="contact" className="py-24 px-6 bg-white">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
//           >
//             Get in Touch
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-slate-500 text-lg max-w-2xl mx-auto"
//           >
//             Have questions? We're here to help you 24/7
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {contactInfo.map((item, i) => {
//             const Icon = item.icon;
//             const content = (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className={`p-8 ${item.color} rounded-3xl border ${item.border} hover:shadow-lg transition-shadow`}
//               >
//                 <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
//                   <Icon className={`h-6 w-6 ${item.iconColor}`} />
//                 </div>
//                 <h3 className="font-black text-lg text-slate-900 mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-slate-600 font-medium text-sm leading-relaxed">
//                   {item.detail}
//                 </p>
//               </motion.div>
//             );

//             return item.link ? (
//               <a key={item.title} href={item.link}>
//                 {content}
//               </a>
//             ) : (
//               content
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", company: "" });
        }
      })
      .catch(() => {
        setError("Failed to send message. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-16 px-6 font-sans bg-white"
    >
      {/* Center Container with Image Background */}
      <div className="relative max-w-6xl mx-auto">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: "url('/contactSecImg.webp')" }}
        />
        
        {/* Dark Overlay on Image */}
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]/80 rounded-2xl" />

        {/* Form Content */}
        <div className="relative z-20 py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 border border-[#287C9E] text-[#287C9E] bg-cyan-50 text-xs font-bold rounded-full mb-3">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-950 leading-tight">
                Let&apos;s Chat About Health
              </h2>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#287C9E] focus:bg-white border border-slate-200 hover:border-[#287C9E]/30 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#287C9E] focus:bg-white border border-slate-200 hover:border-[#287C9E]/30 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#287C9E] focus:bg-white border border-slate-200 hover:border-[#287C9E]/30 transition-all"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company / Organization"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#287C9E] focus:bg-white border border-slate-200 hover:border-[#287C9E]/30 transition-all"
                />
              </div>

              {/* Button Section */}
              <div className="flex justify-end mt-4">
                {error && (
                  <p className="text-red-500 text-sm mr-4 self-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-[#287C9E] text-white rounded-full font-bold transition duration-300 hover:bg-cyan-700 text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <span className="bg-white/10 rounded-full w-7 h-7 flex items-center justify-center border border-white/20">
                    <ArrowRight size={18} className="text-white" />
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Contact Cards Below Image */}
      <div className="max-w-6xl mx-auto mt-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200/50 hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <a
                  href="mailto:tusharcoder269@gmail.com"
                  className="text-sm text-slate-600 hover:text-[#1A6080] transition-colors font-medium block truncate"
                >
                  tusharcoder269@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Call Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200/50 hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Phone</h3>
                <a
                  href="tel:+8801987414889"
                  className="text-sm text-slate-600 hover:text-[#1A6080] transition-colors font-medium"
                >
                  +880 1987-414889
                </a>
              </div>
            </div>
          </motion.div>

          {/* Visit Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200/50 hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Location</h3>
                <a
                  href="https://maps.google.com/?q=Chittagong,Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-[#1A6080] transition-colors font-medium"
                >
                  Chittagong, Bangladesh
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
