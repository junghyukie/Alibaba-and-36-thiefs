import nodemailer from "nodemailer";
import { Account, Lock } from "../models/accountModel";
import { existing_email, updateOTP, checkOTP, resetPass } from "../models/forgetPasswdModel";
import { Check_email, Register, UpdateDoc_gia } from "../models/registerAccModel";
import { LoginResult, RegisterData } from "../types/auth";

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
    const fail = acc.failed_attempts + 1;

    if (fail >= 5) {
      const lock_until = new Date(Date.now() + 30 * 1000); // 30 giây
      await Lock(fail, lock_until, email);
    } else {
      await Lock(fail, null, email);
    }

    return { status: 400, message: "Sai tài khoản hoặc mật khẩu" };
  }

  await Lock(0, null, email);
  return { status: 200, message: "Đăng nhập thành công", success: true, id_role: acc.id_role };
};

export const registerService = async (data: RegisterData): Promise<string> => {
  const { email, password, ho_ten, SDT, ngay_sinh, dia_chi } = data;

  if (!email || !password || !ho_ten || !SDT || !ngay_sinh || !dia_chi) {
    throw new Error("Thiếu thông tin");
  }

  const existing = await Check_email(email);
  if (existing.length > 0) {
    throw new Error("Email đã tồn tại");
  }

  const id_acc = await Register(email, password);
  //await UpdateDoc_gia(id_acc, ho_ten, SDT, ngay_sinh, dia_chi);
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
