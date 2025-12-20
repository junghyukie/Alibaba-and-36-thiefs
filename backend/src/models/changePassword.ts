import pool from "../config/db";
import { changePassWordInput } from "../types/auth";

export const changePassWordModel = async(id_acc : number, data : changePassWordInput)
: Promise<{success : boolean , message : string}> =>{
        const sql = `UPDATE tai_khoan SET mat_khau_hash = $2
                    WHERE id = $1
                    RETURNING *;
                    `
        const result = await pool.query(sql,[id_acc,data.mat_khau_moi]);
        if(result.rows.length > 0) return {success : true , message : "Đổi mật khẩu thành công!"};
        else return {success : false , message : "Đổi mật khẩu thất bại!"};
}

export const oldPassWord = async (
  id_acc: number
): Promise<{ success: boolean; data: string }> => {
  const sql = `
    SELECT mat_khau_hash
    FROM tai_khoan
    WHERE id = $1
  `;

  const result = await pool.query(sql, [id_acc]);

  if (result.rows.length === 0) {
    return {
      success: false,
      data: ""
    };
  }

  return {
    success: true,
    data: result.rows[0].mat_khau_hash
  };
};
