import { NextRequest, NextResponse } from "next/server";



// Dummy function simulating user creation, replace with your DB logic
async function createPhotographer(data) {
  // Example: Check if user exists, hash password, save to DB
  console.log("Saving photographer to DB:", data);
  return { id: "some-user-id", ...data };
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.password || !data.agreeToTerms) {
      return NextResponse.json(
        { error: "Missing required fields or terms not accepted" },
        { status: 400 }
      );
    }

    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // TODO: Validate email format, password strength here as needed

    // Create user in DB (replace with actual logic)
    const newPhotographer = await createPhotographer(data);

    return NextResponse.json(
      { message: "Photographer registered successfully", user: newPhotographer },
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
