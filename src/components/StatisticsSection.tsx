"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, UserCheck, Calendar, Star } from "lucide-react";

interface Stats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  averageRating: number;
}

export default function StatisticsSection() {
  const [stats, setStats] = useState<Stats>({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/public/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      // Fallback to default values
      setStats({
        totalPatients: 10000,
        totalDoctors: 500,
        totalAppointments: 50000,
        averageRating: 4.9,
      });
    } finally {
      setLoading(false);
    }
  };

  const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return <span>{count.toLocaleString()}</span>;
  };

  const statCards = [
    {
      icon: Users,
      value: stats.totalPatients,
      label: "Happy Patients",
      suffix: "+",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: UserCheck,
      value: stats.totalDoctors,
      suffix: "+",
      label: "Verified Doctors",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Calendar,
      value: stats.totalAppointments,
      suffix: "+",
      label: "Appointments Booked",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Star,
      value: stats.averageRating,
      suffix: "/5",
      label: "Average Rating",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      isDecimal: true,
    },
  ];

  return (
    <section ref={ref} id="statistics" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
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
            <Star className="h-4 w-4 fill-blue-700" />
            Trusted Nationwide
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Numbers That Speak
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust MediScript for their healthcare needs
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, rotateX: 5 }}
                className="relative group card-3d"
              >
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`relative z-10 w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className={`h-7 w-7 ${stat.iconColor}`} />
                  </motion.div>

                  {/* Value */}
                  <div className="relative z-10 mb-2">
                    <span className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}>
                      {loading ? (
                        <span className="text-slate-300">...</span>
                      ) : stat.isDecimal ? (
                        <span>{stat.value.toFixed(1)}</span>
                      ) : (
                        <AnimatedCounter end={stat.value} />
                      )}
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="relative z-10 text-sm font-bold text-slate-600">{stat.label}</p>

                  {/* Decorative line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 font-medium">
            🎉 Trusted by healthcare professionals and patients across the country
          </p>
        </motion.div>
      </div>
    </section>
  );
}
