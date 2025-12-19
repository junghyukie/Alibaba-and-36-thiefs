import pool from "../config/db";
import { Fine } from "../types/fine";

export const getFineById = async (id: number) : Promise<Fine | null> => {
  const result = await pool.query(
    ` SELECT * FROM phat WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}

export const getFineByTicketId = async (ticketId: number) : Promise<Fine[]> => {
  const result = await pool.query(
    ` SELECT * FROM phat WHERE phieu_muon_id = $1; `,
    [ticketId]
  );
  return result.rows;
}

export const getFineByUserId = async (userId: number) : Promise<Fine[]> => {
  const result = await pool.query(
    ` SELECT * FROM phat WHERE doc_gia_id = $1; `,
    [userId]
  );
  return result.rows;
}

export const markFineAsPaid = async (fineId: number): Promise<boolean> => {
  const res = await pool.query(
    `UPDATE phat
     SET da_thanh_toan = true
     WHERE id = $1 AND da_thanh_toan = false
     RETURNING id`,
    [fineId]
  );

  return (res.rowCount ?? 0) > 0;
}
