import { connection } from "../config/db";
import { RegisterData } from "../types/account";

export const Check_email = async (email: string): Promise<{ email: string }[]> => {
  const sql = "SELECT email FROM account WHERE email = ?";
  const [rows] = await connection.promise().query(sql, [email]);
  return rows as { email: string }[];
};

export const Register = async (username: string, password: string, email: string): Promise<number> => {
  const sql = `
    INSERT INTO account (username, password_hash, email, trang_thai, id_role)
    VALUES (?, ?, ?, 'ACTIVE', 1)
  `;
  const [result]: any = await connection.promise().query(sql, [username, password, email]);
  return result.insertId as number;
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
    VALUES (?, ?, ?, ?, ?)
  `;
  await connection.promise().query(sql, [id_acc, ho_ten, SDT, ngay_sinh, dia_chi]);
};
