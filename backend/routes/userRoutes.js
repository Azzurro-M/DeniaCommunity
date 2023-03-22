const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.get("/me", authMiddleware.protect, getUser);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
