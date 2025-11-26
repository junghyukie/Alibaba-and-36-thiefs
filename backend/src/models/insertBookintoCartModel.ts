import pool from "../config/db";
import { cartItems, insertBook } from "../types/userService";
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

export const checkCart = async (id_acc : number) : Promise<any> => {
    const sql =
    `SELECT * FROM gio_hang_chi_tiet
    Where id_account = $1;
    `
    const results = await pool.query(sql,[id_acc]);
    return results.rowCount ;
}

export const checkBook_Cart = async (id_acc: number,data : insertBook) : Promise<any> =>{
    const sql =
    `SELECT * FROM gio_hang_chi_tiet
    Where id_account = $1 and id_sach = $2;
    `
    const results = await pool.query(sql,[id_acc , data.id_sach]);
    return results.rowCount ;
}

export const inforBookinCart = async (id_acc: number) : Promise<cartItems[]> => {
    const sql = 
    `SELECT S.id_sach as id_sach , S.tieu_de as title , Tg.ten as author
    From gio_hang_chi_tiet g
    Join sach S on S.id_sach = g.id_sach
    Join tac_gia Tg on Tg.id_tac_gia = S.id_tac_gia
    where g.id_account = $1;
    `
    const results = await pool.query(sql,[id_acc]);
    return results.rows || [];
   
}