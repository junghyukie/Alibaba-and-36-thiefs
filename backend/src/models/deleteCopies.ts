import pool from "../config/db";

export const deleteCopiesModel = async(id_ban_sao : number)
: Promise<{success : boolean}> =>{
    const sql = `DELETE FROM ban_sao
                WHERE id = $1
                RETURNING *;`
    const result = await pool.query(sql,[id_ban_sao]);
    if(result.rows.length > 0) return {success : true};
    else return {success : false};
}

export const deleteCopiesByIdBook = async(id_sach : number)
: Promise<any> =>{
    const sql = `DELETE FROM ban_sao
                WHERE sach_id = $1
                RETURNING *;`
    const result = await pool.query(sql,[id_sach]);
    //Ko cần trả về gì
}
