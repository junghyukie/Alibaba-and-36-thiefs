import pool from "../config/db";
import { TopBook } from "../types/topBook";

export const topBookModel = async() : Promise<TopBook[]> =>{
    const sql = 
            `   SELECT 
                s.tieu_de,
                tg.ten as tac_gia,
                COUNT(pm.id) AS so_luot_dang_muon
                FROM phieu_muon pm
                JOIN ban_sao bs ON bs.id = pm.ban_sao_id
                JOIN sach s ON s.id = bs.sach_id
                JOIN tac_gia tg ON tg.id = s.tacgia_id
                GROUP BY s.tieu_de, tg.ten
                ORDER BY so_luot_dang_muon DESC
                LIMIT 10;    `
    const results = await pool.query(sql,[]);
    return results.rows as TopBook[];

}