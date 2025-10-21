import { connection } from "../config/db";
import { AccountData } from "../types/account";

export const Account = async (email: string): Promise<AccountData[]> => {
  const sql = `
    SELECT username, password_hash, id_role, failed_attempts, locked_until
    FROM account
    WHERE username = ?
  `;
  const [rows] = await connection.promise().query(sql, [email]);
  return rows as AccountData[];
};

export const Lock = async (fail: number, lock_until: Date | null, email: string): Promise<any> => {
  const sql = `
    UPDATE account
    SET failed_attempts = ?, locked_until = ?
    WHERE username = ?
  `;
  const [rows] = await connection.promise().query(sql, [fail, lock_until, email]);
  return rows;
};
