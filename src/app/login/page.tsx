"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const { register, handleSubmit } = useForm<LoginFormData>();

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "DOCTOR_PENDING_APPROVAL") {
      setError("Your doctor account is pending admin approval. You will be notified once approved.");
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    setError("");
    setShowResend(false);

    // Pre-check doctor approval status before NextAuth
    const statusRes = await fetch("/api/auth/check-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });
    const statusData = await statusRes.json();
    if (statusData.status === "DOCTOR_PENDING_APPROVAL") {
      setError("Your doctor account is pending admin approval. You will be notified once approved.");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      if (res.error.includes("2FA_REQUIRED:")) {
        const email = res.error.split("2FA_REQUIRED:")[1];
        await fetch("/api/auth/2fa/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        router.push(`/verify-2fa?email=${encodeURIComponent(email)}`);
        return;
      } else if (res.error.includes("verify your email")) {
        setError(res.error);
        setShowResend(true);
        setResendEmail(data.email);
      } else {
        setError("Invalid Email or Password");
      }
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendMessage("");

    try {
      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      });

      const data = await res.json();
      setResendMessage(data.message);
    } catch (error) {
      setResendMessage("Failed to send verification email");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="MediScript" width={48} height={32} className="rounded-full" />
            <h1 className="text-3xl font-black text-slate-900">MediScript</h1>
          </div>
          <p className="text-slate-600 font-medium">Welcome back to your healthcare platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium">
              {error}
              {showResend && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <button
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="text-red-700 underline hover:text-red-800 font-semibold disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "Resend Verification Email"}
                  </button>
                  {resendMessage && (
                    <p className="mt-2 text-sm">{resendMessage}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-slate-900 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-slate-900 placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1A6080] to-[#156070] text-white py-2.5 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="font-bold text-teal-600 hover:text-teal-700 transition">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
