// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Đăng nhập
router.post("/login", AuthController.login);

// Đăng ký
router.post("/register", AuthController.register);

// Quên mật khẩu (gửi OTP)
router.post("/forgot-password", AuthController.forgotPassword);

// Đặt lại mật khẩu (xác minh OTP)
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
