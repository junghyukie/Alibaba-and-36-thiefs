import { Router } from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  getUserInfoController
} from "../controllers/authController";
import { updateUserController } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router();

// Đăng nhập
router.post("/login", login);

// Đăng ký
router.post("/register", register);

// Quên mật khẩu (gửi OTP)
router.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu (xác minh OTP)
router.post("/reset-password", resetPassword);

// Lấy thông tin người dùng
router.get("/user-info", verifyToken, getUserInfoController);

router.post("/update-user", verifyToken, updateUserController); 
export default router;
