import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const record = await db.medicalVault.findUnique({ where: { id } });
    if (!record) return NextResponse.json({ message: "Record not found" }, { status: 404 });

    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient || record.patientId !== patient.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.medicalVault.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { fileName } = await req.json();

    if (!fileName?.trim()) {
      return NextResponse.json({ message: "File name is required" }, { status: 400 });
    }

    const record = await db.medicalVault.findUnique({ where: { id } });
    if (!record) return NextResponse.json({ message: "Record not found" }, { status: 404 });

    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient || record.patientId !== patient.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await db.medicalVault.update({
      where: { id },
      data: { fileName: fileName.trim() },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
