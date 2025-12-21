import pool from "../config/db";
import { borrowBook } from "../types/userService";

export const borrowBookModel = async(data : borrowBook) : Promise<any> => {
    const sql =
    `SELECT * FROM ban_sao
    Where sach_id = $1 and trang_thai = 'AVAILABLE';
    `
    const results = await pool.query(sql,[data.id_sach]);
    return results.rows[0] ;
}

export const insertPhieuMuonModel = async(id_acc : number , data: borrowBook , id_ban_sao : number) : Promise<any> => {
    const sql = 
    `Insert into phieu_muon (doc_gia_id, ban_sao_id, ngay_muon, ngay_het_han)
    values
    ($1, $2, $3, $4)
    returning *;
    `
    const results = await pool.query(sql, [id_acc, id_ban_sao, data.ngay_muon, data.ngay_het_han]);
    if (results.rows.length === 0) return null;
    return results.rows;
}

export const updateBanSao = async(id_ban_sao : number, trang_thai : string) : Promise<any> =>{
    const sql =
    `UPDATE ban_sao
    SET trang_thai = $1
    WHERE id = $2
    returning *;
    `
    const result = await pool.query(sql, [trang_thai, id_ban_sao]);
    return result.rows;
}

export const checkSoLuongDaMuon = async (id_acc : number) : Promise<any> => {
    const sql =
    `SELECT * 
    FROM phieu_muon
    Where doc_gia_id = $1
    AND tinh_trang = 'CHUA_TRA';
    `
    const result = await pool.query(sql, [id_acc]);
    return result.rowCount;
    
}

// Kiểm tra  đã mượn sách này 
export const checkBorrowedBook = async (id_acc: number, data: borrowBook): Promise<any> => {
  const sql = `
    SELECT * 
    FROM phieu_muon pm
    JOIN ban_sao bs ON bs.id = pm.ban_sao_id
    JOIN sach s on s.id = bs.sach_id
    WHERE doc_gia_id = $1 AND s.id = $2;
  `;
  const result = await pool.query(sql, [id_acc, data.id_sach]);
  return result.rowCount;
};


//Số lượng mượn tối đa
export const MaxBorrowedBook = async (id_acc: number): Promise<number> => {
  const sql = `
    SELECT gioi_han_muon
    FROM tai_khoan
    WHERE id = $1;
  `;
  const result = await pool.query(sql, [id_acc]);
  return result.rows[0];
};
