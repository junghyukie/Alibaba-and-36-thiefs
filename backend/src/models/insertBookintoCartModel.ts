import pool from "../config/db";
import { cartItems, insertBook } from "../types/userService";
import { Pool, QueryResult } from "pg";
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

export const deleteBookFromCartModel = async (id_acc: number, id_sach: number): Promise<any> => {
    // SQL statement using DELETE.
    // The WHERE clause is crucial: it targets only the row matching the account ID AND the book ID.
    const sql = `
        DELETE FROM gio_hang_chi_tiet
        WHERE id_account = $1 AND id_sach = $2
        RETURNING *; -- RETURNING * allows us to see what was deleted
    `;

    try {
        // Execute the query with the account ID and book ID as parameters.
        const result: QueryResult = await pool.query(sql, [id_acc, id_sach]);

        // Returns the rows that were deleted.
        return result.rows;

    } catch (error) {
        console.error("Error deleting book from cart:", error);
        throw new Error("Failed to delete book from cart due to a database error.");
    }
};

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
    `SELECT 
    s.id AS id_sach,
    s.tieu_de AS title,
    tg.ten AS author
FROM gio_hang_chi_tiet g
JOIN sach s ON s.id = g.id_sach
JOIN tac_gia tg ON tg.id = s.tacgia_id
WHERE g.id_account = $1;

    `
    const results = await pool.query(sql,[id_acc]);
    return results.rows || [];
   
}