import pool from "../config/db";
import { Copy } from "../types/copy";

export const getCopyById = async (id: number) : Promise<Copy | null> => {
  const result = await pool.query(
    ` SELECT * FROM ban_sao WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}

export const getCopyByBookId = async (bookId: number) : Promise<Copy[]> => {
  const result = await pool.query(
    ` SELECT * FROM ban_sao WHERE sach_id = $1; `,
    [bookId]
  );
  return result.rows;
}