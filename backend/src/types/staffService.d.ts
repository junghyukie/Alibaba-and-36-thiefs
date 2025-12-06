export interface listAccount{
  id: number;
  email: string;
  ho_ten: string;
  ngay_sinh: string;
  dien_thoai: string;
  dia_chi: string;
  vai_tro: string;
  gioi_han_muon: number;
}

export interface ListAccountResult {
  success: boolean;
  data?: listAccount[];
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
  message?: string;
}

export interface LateRecord {
  id: number;
  ten_doc_gia: string;
  ngay_sinh: string;
  ngay_muon: string;
  ngay_het_han: string;
  tieu_de: string;
  so_ngay_tre: number;
}


export interface LateServiceResult {
  success: boolean;
  data?: LateRecord[];
  message?: string;
}
