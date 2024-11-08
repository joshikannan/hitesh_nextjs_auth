// https://www.notion.so/Models-13820a1c0776800c928cd0c3d6619226

import mongoose from "mongoose"; // only it can talk to db

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide Username"],
  },
  email: {
    type: String,
    required: [true, "Please provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
  },
  isVerified: {
    type: Boolean,
    default: false, // initially verified is false
  },
  isAdmin: {
    // we also go with role
    type: Boolean,
    default: false, // initially admin is false
  },
  //no need for default value

  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model already exists before defining it
// to avoid OverwriteModelError
const User = mongoose.models.users || mongoose.model("users", userSchema);
// by using this User we can access the db methods like find ....

export default User;
