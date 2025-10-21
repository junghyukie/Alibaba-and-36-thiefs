export interface LoginResult {
  status: number;
  message: string;
  success?: boolean;
  id_role?: number;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  ho_ten: string;
  SDT: string;
  ngay_sinh: string;
  dia_chi: string;
}
