import pool from "../config/db";
import { OTPRecord } from "../types/auth";

export const existing_email = async (email: string): Promise<{ email: string }[]> => {
  const sql = "SELECT email FROM account WHERE email = $1";
  const results = await pool.query(sql, [email]);
  return results.rows as { email: string }[];
};

export const updateOTP = async (ma_xac_thuc: string, token_expire: Date, email: string): Promise<void> => {
  const sql = `
    UPDATE tai_khoan
    SET ma_xac_thuc = $1, token_expire = $2
    WHERE email = $3
  `;
  await pool.query(sql, [ma_xac_thuc, token_expire, email]);
};

export const checkOTP = async (ma_xac_thuc: string, email: string): Promise<OTPRecord[]> => {
  const sql = `
    SELECT * FROM tai_khoan
    WHERE ma_xac_thuc = $1 AND email = $2 AND token_expire > NOW()
  `;
  const results = await pool.query(sql, [ma_xac_thuc, email]);
  return results.rows as OTPRecord[];
};

export const resetPass = async (new_password: string, email: string): Promise<void> => {
  const sql = `
    UPDATE tai_khoan
    SET mat_khau_hash = $1, ma_xac_thuc = NULL, token_expire = NULL
    WHERE email = $2
  `;
  await pool.query(sql, [new_password, email]);
};
