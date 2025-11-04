export interface Book {
  id: number;
  tacgia_id?: number;
  nxb_id?: number;
  tieu_de: string;
  tom_tat?: string;
  isbn13: string;
  ngon_ngu: string;
  nam_xb: number;
}

export interface BookQuery {
  page?: number;
  limit?: number;
  search?: string;
  filters?: {ngon_ngu?: string; theloai_id?: number[]};
}
