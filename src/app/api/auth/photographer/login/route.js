import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Photographer from "@/models/photographer";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, password } = data;

    // Basic validations
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectToDatabase();

    // Check if user exists
    const existingUser = await Photographer.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Email is not registered" },
        { status: 404 }
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        message: "Photographer logged in successfully",
        user: {
          fullName: existingUser.fullName,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
