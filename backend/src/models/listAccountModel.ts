import pool from "../config/db";
import { listAccount } from "../types/staffService";

// Lấy tổng số record + tổng page
export const totalRecord = async (pageSize: number): Promise<{ totalRecords: number; totalPages: number }> => {
  const sql = `SELECT COUNT(*) AS total_records FROM tai_khoan;`;
  const result = await pool.query(sql);
  const totalRecords = parseInt(result.rows[0].total_records, 10);
  return {
    totalRecords,
    totalPages: Math.ceil(totalRecords / pageSize),
  };
};

// Lấy danh sách tài khoản có phân trang
export const listAccountModel = async (
  page: number = 1,
  pageSize: number = 20
): Promise<listAccount[]> => {
  const offset = (page - 1) * pageSize;
  const sql = `
    SELECT id,email, ho_ten,ngay_sinh, dien_thoai,dia_chi,vai_tro, gioi_han_muon, trang_thai
    FROM tai_khoan
    ORDER BY id
    LIMIT $1 OFFSET $2;
  `;
  const results = await pool.query(sql, [pageSize, offset]);
  return results.rows as listAccount[];
};
