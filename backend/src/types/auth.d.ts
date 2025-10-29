export interface LoginResult {
  status: number;
  message: string;
  success?: boolean;
  id_role?: number;
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
