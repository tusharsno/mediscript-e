import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password, role } = body;

    // ১. সব ইনপুট আছে কি না চেক
    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // ২. ইউজার আগে থেকেই আছে কি না চেক
    const userExists = await db.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // ৩. পাসওয়ার্ড হাশ করা
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
              specialization: "General",
              licenseNo: `LIC-${Date.now()}` // Temporary random license
            }
          }
        } : {
          patientProfile: {
            create: {
              dob: new Date(),
              bloodGroup: "O+"
            }
          }
        })
      }
    });

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });

  } catch (error: any) {
    console.error("REGISTRATION_ERROR", error);
    return NextResponse.json({ message: "Internal Error", error: error.message }, { status: 500 });
  }
}