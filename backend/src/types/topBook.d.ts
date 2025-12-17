// types/topBook.ts
export interface TopBook {
  tieu_de: string;
  tac_gia: string;
  so_luot_dang_muon: number;
}

export interface TopBookResponse {
  success: boolean;
  data: TopBook[] | null;
  message?: string;
}