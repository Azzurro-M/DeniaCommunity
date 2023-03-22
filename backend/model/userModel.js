const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "please insert a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: 8,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto

    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // expires in 10 minutes

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
