export interface LoginResult {
  status: number;
  message: string;
  success?: boolean;
  vai_tro?: string;
  token? : string;
}

export interface RegisterData {
  username: string;
  email: string;
  // username: string;
  password: string;
//  SDT: string;
 // ngay_sinh: string;
  //dia_chi: string;
}

export interface AccountData {
  id : number;
  email: string;
  mat_khau_hash: string;
  vai_tro: string;
  failed_attempt: number;
  locked_until: Date | null;
  trang_thai : string;
}

export interface OTPRecord {
  ma_xac_thuc: string;
  token_expire: Date;
  email: string;
}

export interface UserInformation{
    ho_ten : string;
    ngay_sinh : Date;
    dien_thoai: string;
    dia_chi : string;
    gioi_tinh : string;
}

import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id_acc: number;
    vai_tro : string;
  };
}
