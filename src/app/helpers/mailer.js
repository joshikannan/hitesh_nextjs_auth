//type 1 => /
// this apporach is better for server componenet
// domain.com/verifytoken/dbcjdsbcjsdcbjsbdcjsdbcj
//type 2 => ?
// this apporach is better for client componenet
// domain.com/verifytoken?token=dbcjdsbcjsdcbjsbdcjsdbcj

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //create hash token user userid of the user
    const hashedtoken = await bcryptjs.hash(userId.toString(), 10);

    // find user by userId and update verifytoken and date and update in db
    // verify user
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedtoken,
        verifyTokenExpiry: Date.now() + 3600000, // 60 * 60 * 1000 // 1hr
      });
    }
    // find user by userId and update forgetPasswordToken and date  and update in db
    // reset password
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedtoken,
        forgetPasswordTokenExpiry: Date.now() + 3600000, // 60 * 60 * 1000 // 1hr
      });
    }
    //  mailttrap
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      // use process.env
      auth: {
        user: "c04a5ac277a324",
        pass: "c704698f97e010",
      },
    });

    const mailOptions = {
      from: "jkn5689@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedtoken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email." : "Reset your password."
      } or copy and paste the below url in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedtoken} </p> `,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("mailResponse", mailResponse);
    return { mailResponse, success: true };
  } catch (error) {
    console.log("mailResponse", error.message);
    return { error: error.message, success: false };
  }
};
