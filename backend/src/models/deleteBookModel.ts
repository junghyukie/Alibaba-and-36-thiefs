import pool from "../config/db";

export const deleteBookModel = async(id_sach : number)
: Promise<{success : boolean}> =>{
    const sql = `DELETE FROM sach
                WHERE id = $1
                RETURNING *;`
    const result = await pool.query(sql,[id_sach]);
    if(result.rows.length > 0) return {success : true};
    else return {success : false};
}

