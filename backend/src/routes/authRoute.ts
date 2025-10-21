import { Router } from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

const router = Router();

// Đăng nhập
router.post("/login", login);

// Đăng ký
router.post("/register", register);

// Quên mật khẩu (gửi OTP)
router.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu (xác minh OTP)
router.post("/reset-password", resetPassword);

export default router;
