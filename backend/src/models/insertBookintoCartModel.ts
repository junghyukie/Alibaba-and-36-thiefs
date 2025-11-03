import pool from "../config/db";
import { insertBook } from "../types/userService";
export const insertBookModel = async(id_acc : number,data : insertBook) : Promise<any> =>{
    const sql = `
        INSERT INTO gio_hang_chi_tiet(id_account, id_sach , so_luong)
        VALUES
        ($1,$2,$3)
        RETURNING *;
    `;
    const result = await pool.query(sql,[id_acc,data.id_sach,data.so_luong]);
    return result.rows;

}