export interface Patron {
  id: number;
  email: string;
  ho_ten: string;
  ngay_sinh: string;
  dien_thoai: string;
  dia_chi: string;
  gioi_tinh: string;
  vai_tro: string;
  gioi_han_muon: number;
  trang_thai: string;
}

export interface LatePatron {
  id: number;
  ten_doc_gia: string;
  ngay_sinh: string;
  ngay_muon: string;
  ngay_het_han: string;
  tieu_de: string;
  so_ngay_tre: number;
}

export interface ListPatronResult {
  success: boolean;
  data?: Patron[];
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
  message?: string;
}

export interface LatePatronResult {
  success: boolean;
  data?: LatePatron[];
  message?: string;
}
