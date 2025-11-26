// import pool from "../config/db";
// import { Ban_sao, borrowBook } from "../types/userService";

// export const borrowBookModel = async(data : borrowBook) : Promise<any> => {
//     const sql =
//     `SELECT * FROM ban_sao
//     Where sach_id = $1 and trang_thai = 'AVAILABLE';
//     `
//     const results = await pool.query(sql,[data.id_sach]);
//     return results.rows[0] ;
// }



// export const insertPhieuMuonModel = async(id_acc : number , data: borrowBook , ban_sao_id : number) : Promise<any> => {
//     const sql = 
//     `Insert into phieu_muon (doc_gia_id, ban_sao_id, ngay_muon, ngay_het_han)
//     values
//     ($1, $2, $3, $4)
//     returning *;
//     `
//     const results = await pool.query(sql, [id_acc, ban_sao_id, data.ngay_muon, data.ngay_het_han]);
//     if (results.rows.length === 0) return null;
//     return results.rows;
// }

// export const updateBanSao = async(id : number) : Promise<any> =>{
//     const sql =
//     `UPDATE ban_sao
//     SET trang_thai = 'DAMAGED'
//     WHERE id = $1
//     returning *;
//     `
//     const result = await pool.query(sql, [id]);
//     return result.rows;
// }

// export const checkSoLuongDaMuon = async (id_acc : number) : Promise<any> => {
//     const sql =
//     `SELECT * 
//     FROM phieu_muon
//     Where doc_gia_id = $1;
//     `
//     const result = await pool.query(sql, [id_acc]);
//     return result.rowCount;
    
// }


// export const checkBook_Cart2 = async (id_acc: number,data : borrowBook) : Promise<any> =>{
//     const sql =
//     `SELECT * FROM gio_hang_chi_tiet
//     Where id_account = $1 and id_sach = $2;
//     `
//     const results = await pool.query(sql,[id_acc , data.id_sach]);
//     return results.rowCount ;
// }


import pool from "../config/db";
import { borrowBook } from "../types/userService";

// Lấy 1 bản sao AVAILABLE để mượn
export const borrowBookModel = async (data: borrowBook): Promise<any> => {
  const sql = `
    SELECT * FROM ban_sao
    WHERE sach_id = $1 AND trang_thai = 'AVAILABLE'
    LIMIT 1;
  `;
  const result = await pool.query(sql, [data.id_sach]);
  return result.rows[0] || null; // trả về 1 bản sao duy nhất
};

// Tạo phiếu mượn
export const insertPhieuMuonModel = async (
  id_acc: number,
  data: borrowBook,
  ban_sao_id: number
): Promise<any> => {
  const sql = `
    INSERT INTO phieu_muon (doc_gia_id, ban_sao_id, ngay_muon, ngay_het_han)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(sql, [id_acc, ban_sao_id, data.ngay_muon, data.ngay_het_han]);
  return result.rows.length ? result.rows[0] : null;
};

// Cập nhật trạng thái bản sao (ví dụ hỏng hoặc trả)
export const updateBanSao = async (id: number, status: string = 'DAMAGED'): Promise<any> => {
  const sql = `
    UPDATE ban_sao
    SET trang_thai = $2
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(sql, [id, status]);
  return result.rows;
};

// Kiểm tra số sách đã mượn
export const checkSoLuongDaMuon = async (id_acc: number): Promise<any> => {
  const sql = `
    SELECT * FROM phieu_muon
    WHERE doc_gia_id = $1 AND tinh_trang = 'CHUA_TRA';
  `;
  const result = await pool.query(sql, [id_acc]);
  return result.rowCount;
};

// Kiểm tra sách đã có trong giỏ
export const checkBook_Cart2 = async (id_acc: number, data: borrowBook): Promise<any> => {
  const sql = `
    SELECT * FROM gio_hang_chi_tiet
    WHERE id_account = $1 AND id_sach = $2;
  `;
  const result = await pool.query(sql, [id_acc, data.id_sach]);
  return result.rowCount;
};
