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
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model already exists before defining it
const User = mongoose.models.users || mongoose.model("users", userSchema);
// by using this User wecan access the db methods like find ....

export default User;
