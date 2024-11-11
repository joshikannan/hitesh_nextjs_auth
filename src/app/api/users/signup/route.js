// Typical Workflow
// During Signup:

// Step 1: After a user signs up, an unverified account is created in the database.
// Step 2: The application generates a verifyToken and a verifyTokenExpiry timestamp.
// Step 3: This token is sent to the user via an email, including a link that points to the verification endpoint (like this POST route).
// During Email Verification:

// When the user clicks the verification link, they are directed to this POST endpoint with the token in the request body.
// The server validates the token and, if valid, marks the user as verified.
// During Login:

// When the user attempts to log in, check if their isVerified status is true.
// If not, you can either prevent them from logging in or provide an option to resend the verification email.
// This approach encourages users to verify their email before gaining full access to the platform.
// This approach ensures that the user confirms ownership of their email before they can fully use their account, helping maintain a secure and trustworthy application.

import { connectdb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await connectdb(); // Ensure a fresh connection for each request

  try {
    const reqBody = await request.json();
    console.log("signup reqBody", reqBody);

    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User Already Exists", status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
      status: 201,
    });
  } catch (error) {
    console.error("Signup error", error); // Log error to Vercel logs
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
