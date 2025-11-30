import pool from "../config/db";
import { AccountData } from "../types/auth";
import { UserInformation } from "../types/auth";

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

export const getUserInfo = async (id_acc: number): Promise<UserInformation | null> => {
    // ⚠️ CHÚ Ý: Thêm email vào SELECT để Frontend có thể hiển thị
    const sql = `
      SELECT 
        email, 
        ho_ten, 
        ngay_sinh, 
        dien_thoai, 
        dia_chi, 
        gioi_tinh
      FROM 
        tai_khoan 
      WHERE 
        id = $1; 
    `;
    
    // Giả định pool.query là của PostgreSQL, nên dùng $1
    const results = await pool.query(sql, [id_acc]); 
    
    if (results.rows.length === 0) {
      return null; // Không tìm thấy người dùng
    }
    
    // Ép kiểu (cast) và trả về
    return results.rows[0] as UserInformation;
};