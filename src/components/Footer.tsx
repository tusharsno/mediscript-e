"use client";

import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Stethoscope,
  Shield,
  FileText,
  Clock
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black text-white">MediScript</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted digital healthcare platform for secure medical records management and e-prescriptions.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/tusharsno" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-600 flex items-center justify-center transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="mailto:tusharcoder269@gmail.com" aria-label="Email" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Digital Prescriptions</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Secure Medical Vault</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Medicine Reminders</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Stethoscope className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Appointment Booking</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <a href="tel:+8801987414889" className="hover:text-white transition-colors">
                  +880 1987-414889
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:tusharcoder269@gmail.com" className="hover:text-white transition-colors">
                  tusharcoder269@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-400">
              © {currentYear} MediScript. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a href="https://github.com/tusharsno/mediscript-e" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="mailto:tusharcoder269@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              <Shield className="inline h-3 w-3 mr-1" />
              SSL Protected • bcrypt Encrypted • 2FA Secured
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
