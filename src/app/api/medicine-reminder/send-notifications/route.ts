import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // Security: Check for API key
    const authHeader = req.headers.get("authorization");
    const apiKey = process.env.CRON_API_KEY || "mediscript-cron-secret";
    
    if (authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    // Find active reminders for today
    const reminders = await db.medicineReminder.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now },
        taken: false,
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    // Filter reminders that match current time (±5 minutes)
    const dueReminders = reminders.filter((reminder) => {
      const reminderTime = reminder.time.slice(0, 5);
      const [reminderHour, reminderMin] = reminderTime.split(":").map(Number);
      const [currentHour, currentMin] = currentTime.split(":").map(Number);
      
      const reminderMinutes = reminderHour * 60 + reminderMin;
      const currentMinutes = currentHour * 60 + currentMin;
      
      return Math.abs(currentMinutes - reminderMinutes) <= 5;
    });

    if (dueReminders.length === 0) {
      return NextResponse.json({
        message: "No reminders due at this time",
        count: 0,
      });
    }

    // Send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let sentCount = 0;
    const errors: string[] = [];

    for (const reminder of dueReminders) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: reminder.patient.user.email,
          subject: `🔔 Medicine Reminder: ${reminder.medicineName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1A6080;">Medicine Reminder</h2>
              <p>Hello <strong>${reminder.patient.user.name}</strong>,</p>
              <p>This is a reminder to take your medicine:</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Medicine:</strong> ${reminder.medicineName}</p>
                <p style="margin: 5px 0;"><strong>Dosage:</strong> ${reminder.dosage}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${reminder.time}</p>
                <p style="margin: 5px 0;"><strong>Frequency:</strong> ${reminder.frequency}</p>
              </div>
              
              <p>Please take your medicine as prescribed.</p>
              <p>You can mark it as taken in your <a href="${process.env.NEXTAUTH_URL}/dashboard#reminders" style="color: #1A6080;">dashboard</a>.</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px;">
                This is an automated reminder from MediScript-E.<br>
                If you have already taken this medicine, please ignore this email.
              </p>
            </div>
          `,
        });
        sentCount++;
      } catch (error) {
        console.error(`Failed to send email to ${reminder.patient.user.email}:`, error);
        errors.push(`${reminder.patient.user.email}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    return NextResponse.json({
      message: "Notification process completed",
      total: dueReminders.length,
      sent: sentCount,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Send notifications error:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to send notifications",
      },
      { status: 500 }
    );
  }
}
