import pool from "../config/db";
import { logResults } from "../types/userService";
// cho user hay staff
//Cho user
export const LogModel = async (id_acc : number): Promise<logResults[]> => {
    const sql =
        `
        SELECT s.id AS sach_id, s.tieu_de, pm.ngay_muon, pm.ngay_het_han, pm.ngay_tra
        FROM phieu_muon pm
        JOIN ban_sao bs ON bs.id = pm.ban_sao_id
        JOIN sach s ON s.id = bs.sach_id
        WHERE pm.doc_gia_id = $1
        ORDER BY pm.ngay_muon DESC;
        `
    const results = await pool.query(sql,[id_acc]);
    return results.rows as logResults[];
}

export const LogModelforStaff = async (): Promise<logResults[]> => {
    const sql =
        `
        SELECT s.id AS sach_id, s.tieu_de, pm.ngay_muon, pm.ngay_het_han, pm.ngay_tra
        FROM phieu_muon pm
        JOIN ban_sao bs ON bs.id = pm.ban_sao_id
        JOIN sach s ON s.id = bs.sach_id
        ORDER BY pm.ngay_muon DESC;
        `
    const results = await pool.query(sql,[]);
    return results.rows as logResults[];
}