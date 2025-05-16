import mongoose from "mongoose";
import env from "dotenv";
import { isMobilePhone } from "validator";
import bcrypt from "bcryptjs";

env.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!isMobilePhone(this.phone, "any")) {
    const error = new Error("Invalid phone number");
    error.statusCode = 400;
    return next(error);
  }
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
