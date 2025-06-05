// app/api/auth/signup/route.js
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Photographer from "@/models/photographer";
import bcrypt from "bcryptjs";

export async function POST(req) {

  console.log(req)
  try {
    const data = await req.json();
    const { fullName, business, email, password, confirmPassword, agreeToTerms } = data;

    // Basic validations
    if (!fullName || !email || !password || !confirmPassword || !agreeToTerms) {
      return NextResponse.json(
        { error: "Missing required fields or terms not accepted" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectToDatabase();

    // Check if user already exists
    const existing = await Photographer.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newPhotographer = await Photographer.create({
      fullName,
      business,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Photographer registered successfully",
        user: {
          id: newPhotographer._id,
          fullName: newPhotographer.fullName,
          email: newPhotographer.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
