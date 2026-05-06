"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("PATIENT");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
    bloodGroup: "O+",
    licenseNo: "",
    specialization: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Doctor license validation
    if (selectedRole === "DOCTOR" && !formData.licenseNo.trim()) {
      newErrors.licenseNo = "License number is required for doctors";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(selectedRole === "PATIENT" && { bloodGroup: formData.bloodGroup }),
        ...(selectedRole === "DOCTOR" && { 
          licenseNo: formData.licenseNo,
          specialization: formData.specialization 
        })
      };

      const response = await axios.post("/api/register", submitData);
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : "Something went wrong!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {success ? (
        <div className="p-8 border bg-white rounded-xl shadow-lg w-full max-w-md text-center">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent a verification email to <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please check your inbox and click the verification link to activate your account.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      ) : (
      <div className="p-8 border bg-white rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          MediScript
        </h1>
        <p className="text-gray-500 text-center mb-8">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => {
                handleChange(e);
                setSelectedRole(e.target.value);
              }}
              className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-black"
            >
              <option value="PATIENT">I am a Patient</option>
              <option value="DOCTOR">I am a Doctor</option>
            </select>
          </div>

          {/* Blood Group - Only for Patients */}
          {selectedRole === "PATIENT" && (
            <div>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-black"
              >
                <option value="">Select Blood Group (Optional)</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          )}

          {/* License & Specialization - Only for Doctors */}
          {selectedRole === "DOCTOR" && (
            <>
              <div>
                <input
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                  placeholder="Medical License Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                />
                {errors.licenseNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.licenseNo}</p>
                )}
              </div>
              <div>
                <input
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Specialization (e.g., Cardiologist)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </a>
        </p>
      </div>
      )}
    </div>
  );
}
