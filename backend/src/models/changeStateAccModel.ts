import pool from "../config/db";

export const activateAccModel = async(id_acc : number)
: Promise<{success : boolean, message: string}> =>{
    const sql =
     `UPDATE tai_khoan
    SET trang_thai = 'ACTIVE'
    WHERE id = $1
    RETURNING *;`

    const result = await pool.query(sql,[id_acc]);
    if(result.rows.length > 0) return{success : true , message : "Kích hoạt tài khoản thành công!"}
    else return {success : false , message : "Kích hoạt tài khoản thất bại!"}
}

export const lockAccModel = async(id_acc : number)
: Promise<{success : boolean, message: string}> =>{
    const sql =
     `UPDATE tai_khoan
    SET trang_thai = 'LOCKED'
    WHERE id = $1
    RETURNING *;`
    const result = await pool.query(sql,[id_acc]);
    if(result.rows.length > 0) return{success : true , message : "Khóa tài khoản thành công!"}
    else return {success : false , message : "Khóa tài khoản thất bại!"}
}