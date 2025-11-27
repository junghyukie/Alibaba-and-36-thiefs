
import pool from "../config/db";
import { LateRecord } from "../types/staffService";

export const LateModel = async (): Promise<LateRecord[]> => {
  const sql = `
    SELECT 
      tk.ho_ten AS ten_doc_gia,
      s.tieu_de,
      pm.ngay_het_han::TEXT,
      (CURRENT_DATE - pm.ngay_het_han) AS so_ngay_tre
    FROM phieu_muon pm
    JOIN tai_khoan tk ON tk.id = pm.doc_gia_id
    JOIN ban_sao bs ON bs.id = pm.ban_sao_id
    JOIN sach s ON s.id = bs.sach_id
    WHERE pm.tinh_trang = 'CHUA_TRA'
      AND CURRENT_DATE > pm.ngay_het_han
    ORDER BY so_ngay_tre DESC;
  `;
  const results = await pool.query(sql);
  return results.rows as LateRecord[];
};
