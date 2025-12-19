import pool from "../config/db";

export const extendBookModel = async(id_acc : number , id_sach : number)
    : Promise<{ success: boolean; message: string }> => {
    const sql = `
            UPDATE phieu_muon pm
            SET ngay_het_han = pm.ngay_het_han + INTERVAL '2 week'
            FROM ban_sao bs
            WHERE pm.ban_sao_id = bs.id
            AND bs.sach_id = $2  
            AND pm.doc_gia_id = $1
            RETURNING *;
    `;
    const result = await pool.query(sql, [id_acc,id_sach]);
    if(result.rows.length > 0) return {success : true, message : "Gia hạn sách thành công!"};
    else return {success : false, message : "Gia hạn sách thất bại!"};
}

export const checkBook = async(id_acc : number , id_sach : number)
: Promise<{ success: boolean }> => {
    const sql = `
            SELECT *
            FROM phieu_muon pm
            JOIN ban_sao bs ON bs.id = pm.ban_sao_id
            WHERE pm.doc_gia_id = $1
            AND bs.sach_id = $2
            AND pm.ngay_het_han >= NOW();

    `;
    const result = await pool.query(sql, [id_acc,id_sach]);
    if(result.rows.length > 0) return {success : true};
    else return {success : false};
}