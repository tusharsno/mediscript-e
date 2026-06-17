import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, role, bloodGroup, licenseNo, specialization } = body;

    // ১. সব ইনপুট আছে কি না চেক
    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // ২. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // ৩. Password strength validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    // ৪. Role validation (শুধুমাত্র PATIENT এবং DOCTOR allowed)
    if (role !== "PATIENT" && role !== "DOCTOR") {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // ৫. Doctor role এর জন্য license number required
    if (role === "DOCTOR" && !licenseNo) {
      return NextResponse.json({ message: "License number is required for doctors" }, { status: 400 });
    }

    // ২. ইউজার আগে থেকেই আছে কি না চেক
    const userExists = await db.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // ৩. পাসওয়ার্ড হাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৪. ইউজার এবং তার প্রোফাইল একসাথে তৈরি (Transaction logic)
    // Verification token generate করা (24 hours validity)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        emailVerified: role === "DOCTOR" ? true : false,
        verificationToken,
        verificationExpires,
        // রোলের উপর ভিত্তি করে প্রোফাইল তৈরি
        ...(role === "DOCTOR" ? {
          doctorProfile: {
            create: {
              specialization: specialization || "General",
              licenseNo: licenseNo
            }
          }
        } : {
          patientProfile: {
            create: {
              dob: new Date(),
              bloodGroup: bloodGroup || "O+"
            }
          }
        })
      }
    });

    // Verification email পাঠানো
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error("EMAIL_SEND_ERROR", emailError);
      // Email না পাঠালেও registration complete হবে
    }

    return NextResponse.json({ 
      message: role === "DOCTOR"
        ? "Registration successful! Please verify your email. Your account will be activated after admin approval."
        : "Registration successful! Please check your email to verify your account.",
      user: { id: user.id, email: user.email, role: user.role } 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error("REGISTRATION_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";
    return NextResponse.json({ 
      message: "Registration failed", 
      error: errorMessage,
      details: errorStack,
      hint: "Check Vercel logs for details"
    }, { status: 500 });
  }
}
