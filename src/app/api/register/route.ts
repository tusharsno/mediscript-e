import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, role, bloodGroup, licenseNo, specialization } = body;

    // ১. সব ইনপুট আছে কি না চেক
    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Doctor role এর জন্য license number required
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
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
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

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });

  } catch (error: unknown) {
    console.error("REGISTRATION_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Internal Error", error: errorMessage }, { status: 500 });
  }
}
