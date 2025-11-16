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

// export interface RegisterData {
//   id_account: number;
//   ho_ten: string;
//   SDT: string;
//   ngay_sinh: string;
//   dia_chi: string;
// }
export interface BorrowedCard{
  id_muon:string
   id_doc_gia: number;

   ngay_muon: Date;
   ngay_het_han: Date;
   han_tra:Date;
   id_muon:string
   ngay_tra_thuc_te: string;
   trang_thai:string;
   id_sach: string;
}
