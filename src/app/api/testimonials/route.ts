import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET - Fetch testimonials
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const featured = searchParams.get("featured");
    const verified = searchParams.get("verified");

    const where: any = {};
    
    if (featured === "true") {
      where.featured = true;
    }
    
    if (verified === "true") {
      where.verified = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
      take: 50,
    });

    return NextResponse.json({ testimonials }, { status: 200 });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST - Create testimonial
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, comment, designation } = body;

    if (!rating || !comment) {
      return NextResponse.json(
        { error: "Rating and comment are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user already submitted testimonial
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { userId: session.user.id },
    });

    if (existingTestimonial) {
      return NextResponse.json(
        { error: "You have already submitted a testimonial" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        userId: session.user.id,
        name: session.user.name || "Anonymous",
        role: session.user.role,
        designation: designation || (session.user.role === "PATIENT" ? "Patient" : "Doctor"),
        rating,
        comment,
        verified: false,
        featured: false,
      },
    });

    return NextResponse.json(
      { message: "Testimonial submitted successfully", testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
