import pool from "../config/db";
import { copiesInfor } from "../types/staffService";

// Lấy tổng số record + tổng page
export const totalRecordCopies = async (pageSize: number): Promise<{ totalRecords: number; totalPages: number }> => {
  const sql = `SELECT COUNT(*) AS total_records FROM ban_sao;`;
  const result = await pool.query(sql);
  const totalRecords = parseInt(result.rows[0].total_records, 10);
  return {
    totalRecords,
    totalPages: Math.ceil(totalRecords / pageSize),
  };
};

// Lấy danh sách tài khoản có phân trang
export const listCopies = async (
  page: number = 1,
  pageSize: number = 20
): Promise<copiesInfor[]> => {
  const offset = (page - 1) * pageSize;
  const sql = `
    SELECT  bs.id,
            s.tieu_de,
            bs.trang_thai,
            bs.ngay_mua,
            bs.gia_tri,
            bs.ke_sach 
    FROM ban_sao bs
    JOIN sach s ON s.id = bs.sach_id
    ORDER BY id
    LIMIT $1 OFFSET $2;
  `;
  const results = await pool.query(sql, [pageSize, offset]);
  return results.rows as copiesInfor[];
};
