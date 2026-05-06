import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const checks = {
      timestamp: new Date().toISOString(),
      env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
        DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
        EMAIL_USER: process.env.EMAIL_USER ? "SET" : "NOT SET",
        EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "NOT SET",
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET",
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? "SET" : "NOT SET",
      },
      database: {
        connected: false,
        userCount: 0,
        error: null as string | null,
      },
    };

    // Test database connection
    try {
      const userCount = await db.user.count();
      checks.database.connected = true;
      checks.database.userCount = userCount;
    } catch (dbError) {
      checks.database.error = dbError instanceof Error ? dbError.message : String(dbError);
    }

    return NextResponse.json(checks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: "Debug check failed", 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
