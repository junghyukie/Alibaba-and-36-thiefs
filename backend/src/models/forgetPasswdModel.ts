import { connection } from "../config/db";
import { OTPRecord } from "../types/account";

export const existing_email = async (email: string): Promise<{ email: string }[]> => {
  const sql = "SELECT email FROM account WHERE email = ?";
  const [rows] = await connection.promise().query(sql, [email]);
  return rows as { email: string }[];
};

export const updateOTP = async (ma_xac_thuc: string, token_expire: Date, email: string): Promise<void> => {
  const sql = `
    UPDATE account
    SET ma_xac_thuc = ?, token_expire = ?
    WHERE email = ?
  `;
  await connection.promise().query(sql, [ma_xac_thuc, token_expire, email]);
};

export const checkOTP = async (ma_xac_thuc: string, email: string): Promise<OTPRecord[]> => {
  const sql = `
    SELECT * FROM account
    WHERE ma_xac_thuc = ? AND email = ? AND token_expire > NOW()
  `;
  const [rows] = await connection.promise().query(sql, [ma_xac_thuc, email]);
  return rows as OTPRecord[];
};

export const resetPass = async (new_password: string, email: string): Promise<void> => {
  const sql = `
    UPDATE account
    SET password_hash = ?, ma_xac_thuc = NULL, token_expire = NULL
    WHERE email = ?
  `;
  await connection.promise().query(sql, [new_password, email]);
};
