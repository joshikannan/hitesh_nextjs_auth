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

import { connectdb } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/app/helpers/mailer";

// This function call ensures that the database is connected, allowing queries to be run on the User collection.
connectdb();

export async function POST(NextRequest) {
  console.log("called");
  try {
    // getting red body from the client
    const reqBody = await NextRequest.json();
    console.log("signup reqBody", reqBody);

    const { username, email, password } = reqBody;

    // check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User Already Exist", status: 400 });
    }

    // if user is new, then hashpassword
    const salt = await bcryptjs.genSalt(10);
    console.log("salt", salt);

    const hashpassword = await bcryptjs.hash(password, salt);
    console.log("hashpassword", hashpassword);

    // now create new user in the daatbase

    const newUser = new User({
      username,
      email,
      password: hashpassword, // updated hashed password
    });

    const savedUser = await newUser.save(); // here newUser saved in the db
    // savedUser holds values of newuser in db
    console.log("savedUser", savedUser);

    // now a unverified user i created in db, lets erify it by email
    // send verification email

    // const sendEmailRes = await sendEmail({
    //   email,
    //   emailType: "VERIFY",
    //   userId: savedUser._id,
    // });
    // console.log("sendEmailRes", sendEmailRes);

    return NextResponse.json({
      message: "User Created Successfully",
      // emailstatus: sendEmailRes.success,
      // email: sendEmailRes.success
      //   ? "Verification token sent to email"
      //   : "Error on sent token to email",
      success: true,
      savedUser,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
