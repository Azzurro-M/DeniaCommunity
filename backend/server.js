const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const cors = require("cors");

const nodemailer = require("nodemailer");
const User = require("./model/userModel.js");

const {
  errorHandler,
  invalidPathHandler,
} = require("./middleware/errorMiddleware.js");
const colors = require("colors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);
app.use(invalidPathHandler);

app.use("/api/event", require("./routes/eventRoutes.js"));
app.use("/api/user", require("./routes/userRoutes.js"));

app.post("/api/user/resetpassword", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate new password
    const newPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    // Send email with new password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "azzurromarianna@gmail.com",
      to: email,
      subject: "Your new password",
      text: `Your new password is ${newPassword}. Please use it to login and change your password.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
