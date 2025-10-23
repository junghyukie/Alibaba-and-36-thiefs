export interface AccountData {
  email: string;
  mat_khau_hash: string;
  id_role: number;
  failed_attempts: number;
  locked_until: Date | null;
}

export interface OTPRecord {
  ma_xac_thuc: string;
  token_expire: Date;
  email: string;
}

export interface RegisterData {
  id_account: number;
  ho_ten: string;
  SDT: string;
  ngay_sinh: string;
  dia_chi: string;
}
