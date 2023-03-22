const asyncHandler = require("express-async-handler");
const axios = require("axios");
const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

dotenv.config({ path: "./env" });

// TOKEN SET-UP
const generateToken = (id, time) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//SIGNUP
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //IF FORM NOT COMPLETED
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // CHECK IF EMAIL ALREADY EXSISTS
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  //IF USER NEEDS TO BE CREATED
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//LOGIN
const loginUser = asyncHandler(async (req, res) => {
  //LOGIN FORM
  const { email, password } = req.body;
  //FIND USER
  const user = await User.findOne({ email });
  //IF NOT A USER OR EMAIL / PSW NOT MACTH
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  //IF MACTH
  const token = generateToken(user.id);
  user.password = undefined;
  res.status(200).json({ user, token });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const logOut = asyncHandler(async (req, res) => {
  const logoutToken = generateToken(id, "1s");
});

//FORGOT PASSWORD FUNCTIONALITY

const forgotPassword = asyncHandler(async (req, res) => {
  //EMAIL FIELD TO REQUEST
  const { email } = req.body;
  //FIND USER WITH EMAIL
  const user = await User.findOne({ email });
  //IF EMAIL NOT FOUND
  if (!user) {
    res.status(404);
    throw new Error(
      "Email not found, please make sure you have used correct email amd spelling. If you are new to motivate App please register your account."
    );
  }

  //IF USER FOUND
  //GENERATE RESET PSW TOKEN
  const resetToken = user.getResetPasswordToken();
  await user.save();

  //RESET LINK PLUS MESSAGE
  const resetUrl = `${process.env.HOST}/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Clic on this link to reset your password: \n\n ${resetUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Reset password",
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid reset token");
  }

  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ success: true, data: "Password updated" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
};
