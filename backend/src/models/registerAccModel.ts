import pool from "../config/db";
import { RegisterData } from "../types/auth";

export const Check_email = async (email: string): Promise<{ email: string }[]> => {
  const sql = "SELECT email FROM account WHERE email = $1";
  const results = await pool.query(sql, [email]);
  return results.rows as { email: string }[];
};

export const Register = async (
  username: string,
  email: string,
  password: string,
): Promise<number> => {
  const sql = `
    INSERT INTO account (ho_ten,email, mat_khau_hash)
    VALUES ($1, $2 , $3)
    RETURNING id_account
  `;
  const result = await pool.query(sql, [username,email, password]);
  return result.rows[0].id_account as number;
};


export const UpdateDoc_gia = async (
  id_acc: number,
  ho_ten: string,
  SDT: string,
  ngay_sinh: string,
  dia_chi: string
): Promise<void> => {
  const sql = `
    INSERT INTO doc_gia (id_account, ho_ten, SDT, ngay_sinh, dia_chi)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await pool.query(sql, [id_acc, ho_ten, SDT, ngay_sinh, dia_chi]);
};
