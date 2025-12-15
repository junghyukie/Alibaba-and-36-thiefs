import { Request, Response } from "express";
import {
  loginService,
  registerService,
  forgotPasswordService,
  resetPasswordService,
  getUserInfoService
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
    res.status(200).json({success: true, message: result});
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


import { updateUserService } from "../services/authService";
import { AuthRequest } from "../types/auth";

export const updateUserController = async (req: AuthRequest, res: Response) => {
  console.log("Received update request:", req.body);
  try {
    const id_acc = req.user?.id_acc; // lấy id từ token
    if (!id_acc) return res.status(401).json({ message: "Thiếu ID người dùng" });

    const result = await updateUserService(id_acc, req.body);

    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getUserInfoController = async (req: Request, res: Response) => {
    // 1. ⚠️ TRÍCH XUẤT id_acc TỪ req.user ⚠️
    const userIdAcc = (req as any).user?.id_acc; 

    if (!userIdAcc) {
        // Nếu không có id_acc trong token payload (hoặc token không được đính kèm)
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: ID tài khoản không được tìm thấy trong token." 
        });
    }

    try {
        // 2. Gọi hàm Service bằng ID
        const userInfo = await getUserInfoService(userIdAcc);

        if (userInfo) {
            // 3. Trả về thông tin người dùng
            return res.status(200).json({
                success: true,
                data: userInfo, // userInfo hiện đã chứa email, ho_ten, v.v.
            });
        } else {
            // 4. Không tìm thấy người dùng
            return res.status(404).json({
                success: false,
                message: "Thông tin tài khoản không được tìm thấy."
            });
        }
    } catch (error) {
        console.error("Lỗi trong Controller:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi Server nội bộ khi lấy thông tin người dùng."
        });
    }
};