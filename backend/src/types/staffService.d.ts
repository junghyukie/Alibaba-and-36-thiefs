export interface listAccount {
  id: number;
  email: string;
  ho_ten: string;
  ngay_sinh: string;
  dien_thoai: string;
  dia_chi: string;
  vai_tro: string;
  gioi_han_muon: number;
  trang_thai: string;
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



//Quản lý bản sao
export interface copiesInfor {
  id: number;
  tieu_de: string;
  trang_thai: string;
  ngay_mua: Date;
  gia_tri: number;
  ke_sach: string;
}

export interface copiesInforService {
  success: boolean;
  data?: copiesInfor[];
  message?: string;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
}

export interface borrowForm {
  doc_gia_id: number;
  ma_vach: string;
  ngay_muon: string;
  ngay_het_han: string;
}