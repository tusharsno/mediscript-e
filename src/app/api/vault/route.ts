import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, fileUrl } = body;

    // ১. ডাটাবেস থেকে পেশেন্টের প্রোফাইল আইডি খুঁজে বের করা
    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient profile not found" },
        { status: 404 },
      );
    }

    // ২. মেডিকেল ভল্টে নতুন ফাইল এন্ট্রি করা
    const record = await db.medicalVault.create({
      data: {
        fileName,
        fileUrl,
        patientId: patient.id,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error: unknown) {
    console.error("VAULT_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Internal Error", error: errorMessage },
      { status: 500 },
    );
  }
}
