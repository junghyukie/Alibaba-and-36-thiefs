import pool from "../config/db";
import { UserInformation } from "../types/auth";

export const updateUser = async(id_acc : number, data_user : UserInformation) : Promise<any> =>{
  const sql = `
  UPDATE tai_khoan 
  SET ho_ten = $2 , ngay_sinh = $3 , dien_thoai = $4 , dia_chi = $5 , gioi_tinh = $6 
  where id = $1 
  returning id`
  const result = await pool.query(sql,
    [
      id_acc,data_user.ho_ten,
      data_user.ngay_sinh,
      data_user.dien_thoai,
      data_user.dia_chi,
      data_user.gioi_tinh
    ]);
  return result.rows[0].id as number;
}
