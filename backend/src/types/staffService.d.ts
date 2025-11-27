export interface listAccount{
    email : string;
    ho_ten : string;
    vai_tro : string;
    gioi_han_muon : number;
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
  ten_doc_gia: string;
  tieu_de: string;
  ngay_het_han: string;
  so_ngay_tre: number;
}


export interface LateServiceResult {
  success: boolean;
  data?: LateRecord[];
  message?: string;
}
