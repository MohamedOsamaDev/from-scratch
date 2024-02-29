import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    OTP: Number,
    isresetPassword: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false },
    lastRestPassword: Date,
  },
  { timestamps: true }
);
schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this.password = bcrypt.hashSync(this._update.password, 8);
});
export const UserModel = mongoose.model("user", schema);
