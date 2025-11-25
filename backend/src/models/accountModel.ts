import pool from "../config/db";
import { AccountData } from "../types/auth";

export const Account = async (email: string): Promise<AccountData[]> => {
  const sql = `
    SELECT id, email, mat_khau_hash, vai_tro, failed_attempt, locked_until
    FROM tai_khoan
    WHERE email = $1
  `;
  const results = await pool.query(sql, [email]);
  return results.rows as AccountData[];
};

export const Lock = async (fail: number, lock_until: Date | null, email: string): Promise<any> => {
  const sql = `
    UPDATE tai_khoan
    SET failed_attempt = $1, locked_until = $2
    WHERE email = $3
  `;
  const results = await pool.query(sql, [fail, lock_until, email]);
  return results.rows;
};
