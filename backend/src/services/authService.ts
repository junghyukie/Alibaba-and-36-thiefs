import nodemailer from "nodemailer";
import { Account, Lock, getUserInfo } from "../models/accountModel";
import { existing_email, updateOTP, checkOTP, resetPass } from "../models/forgetPasswdModel";
import { Check_email, Register } from "../models/registerAccModel";
import { LoginResult, RegisterData } from "../types/auth";

import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string): Promise<LoginResult> => {
  if (!email || !password) {
    return { status: 400, message: "Thiếu thông tin" };
  }

  const accData = await Account(email);
  if (accData.length === 0) {
    return { status: 400, message: "Sai tài khoản hoặc mật khẩu" };
  }

  const acc = accData[0];

  if (acc.locked_until && new Date() < new Date(acc.locked_until)) {
    return { status: 403, message: "Tài khoản đang bị khóa, vui lòng thử lại sau." };
  }

  if (acc.mat_khau_hash !== password) {
    const fail = acc.failed_attempt + 1;

    if (fail >= 5) {
      const lock_until = new Date(Date.now() + 30 * 1000); // 30 giây
      await Lock(fail, lock_until, email);
    } else {
      await Lock(fail, null, email);
    }

    return { status: 400, message: "Sai tài khoản hoặc mật khẩu" };
  }

  await Lock(0, null, email);
  
  const secret = process.env.JWT_SECRET || "super_secret_key";
  const payload = { id_acc: acc.id , vai_tro : acc.vai_tro};
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return {
    status: 200,
    message: "Đăng nhập thành công",
    success: true,
    vai_tro: acc.vai_tro,
    token, // trả token về cho frontend
  };
  //return { status: 200, message: "Đăng nhập thành công", success: true, id_role: acc.id_role };
};

export const registerService = async (data: RegisterData): Promise<string> => {
  const {username, email, password  } = data;

  if (!email || !password || !username) {
    throw new Error("Thiếu thông tin");
  }

  const existing = await Check_email(email);
  if (existing.length > 0) {
    throw new Error("Email đã tồn tại");
  }

  const id_acc = await Register(username,email, password);
  
  return "Đăng ký thành công";
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  const existing = await existing_email(email);
  if (existing.length === 0) {
    throw new Error("Email không tồn tại");
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expireTime = new Date(Date.now() + 5 * 60 * 1000);

  await updateOTP(code, expireTime, email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pvviet2005@gmail.com",
      pass: "neujuggavnpkpsnr",
    },
  });

  try {
    await transporter.sendMail({
      from: "pvviet2005@gmail.com",
      to: email,
      subject: "Mã xác thực đổi mật khẩu",
      text: `Mã xác thực của bạn là: ${code}. Mã có hiệu lực trong 5 phút.`,
    });
  } catch (err) {
    throw new Error("Không thể gửi email");
  }
};

export const resetPasswordService = async (email: string, ma_xac_thuc: string, new_password: string): Promise<void> => {
  const otp = await checkOTP(ma_xac_thuc, email);
  if (otp.length === 0) {
    throw new Error("OTP không chính xác hoặc đã hết hạn");
  }
  await resetPass(new_password, email);
};


import { updateUser } from "../models/updateUserModel";
import { UserInformation } from "../types/auth";

export const updateUserService = async (
  id_acc: number,
  data_user: UserInformation
): Promise<{ success: boolean; message: string }> => {
  try {
    const update = await updateUser(id_acc, data_user);

    if (!update || update.length === 0) {
      return { success: false, message: "Cập nhật không thành công" };
    }

    return { success: true, message: "Cập nhật thành công" };
  } catch (err) {
    console.error("Lỗi khi cập nhật:", err);
    return { success: false, message: "Lỗi server khi cập nhật" };
  }
};

export const getUserInfoService = async (id_acc: number): Promise<UserInformation | null> => {
    try {
        // 1. Gọi hàm Model (truy vấn DB) bằng id_acc
        const userInfo = await getUserInfo(id_acc);
        
        // 2. Xử lý dữ liệu (nếu có, ví dụ: format ngày tháng)
        // ...

        return userInfo;

    } catch (error) {
        console.error("Lỗi trong Service:", error);
        throw new Error("Service failed to fetch user info.");
    }
};