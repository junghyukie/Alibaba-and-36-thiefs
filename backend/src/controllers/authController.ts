import { Request, Response } from "express";
import {
  loginService,
  registerService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/authService";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerService(req.body);
    res.status(200).json({ message: result });
  } catch (error: any) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ message: error.message || "Lỗi server" });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    await forgotPasswordService(email);
    res.status(200).json({ message: "Đã gửi mã OTP đến email" });
  } catch (error: any) {
    console.error("Lỗi gửi email:", error);
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, ma_xac_thuc, new_password } = req.body;
    await resetPasswordService(email, ma_xac_thuc, new_password);
    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
