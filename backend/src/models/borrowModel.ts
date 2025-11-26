import pool from "../config/db";
import { Borrow } from "../types/borrow";

export const getBorrowByNotReturnedCopy = async (ban_sao_id: number) : Promise<Borrow | null> => {
  const result = await pool.query(
    ` SELECT * FROM phieu_muon 
      WHERE ban_sao_id = $1 AND tinh_trang = 'CHUA_TRA'; `,
    [ban_sao_id]
  );
  return result.rows[0] || null;
}

export const getBorrowById = async (id: number) : Promise<Borrow | null> => {
  const result = await pool.query(
    ` SELECT * FROM phieu_muon WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}

export const getBorrowByUserId = async (userId: number) : Promise<Borrow[]> => {
  const result = await pool.query(
    ` SELECT * FROM phieu_muon WHERE doc_gia_id = $1; `,
    [userId]
  );
  return result.rows;
}

export const returnUpdate = async (
  id: number,
  tinh_trang: string,
  ngay_tra: string
) : Promise<Borrow | null> => {
  const result = await pool.query(
    ` UPDATE phieu_muon
      SET ngay_tra = $1, tinh_trang = $2
      WHERE id = $3
      RETURNING * `,
    [ngay_tra, tinh_trang, id]
  );
  return result.rows[0] || null;
}