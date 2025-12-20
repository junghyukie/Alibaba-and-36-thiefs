export interface Borrow {
  id: number;
  doc_gia_id: number;
  nhan_vien_id?: number;
  ban_sao_id: number;
  ngay_muon: string;
  ngay_het_han: string;
  ngay_tra?: string;
  tinh_trang: string;
}