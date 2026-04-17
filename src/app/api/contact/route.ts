import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
      },
    });

    // Send email notification (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact Message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json(
      { message: "Message sent successfully", data: contactMessage },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send message";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
