import pool from "../config/db";
import { theInforResult } from "../types/the";

export const addTheModel = async (id_acc: number)
    : Promise<{ success: boolean; message: string }> => {
    const sql = `
      INSERT INTO the (tai_khoan_id, ngay_cap, ngay_het_han)
      VALUES ($1, NOW(), NOW() + INTERVAL '1 year')
      RETURNING *;
    `;
    const result = await pool.query(sql, [id_acc]);
    if(result.rows.length > 0) return {success : true, message : "Tạo thẻ thành công!"};
    else return {success : false, message : "Tạo thẻ thất bại!"};
}

export const extendTheModel = async(id_acc : number)
    : Promise<{ success: boolean; message: string }> => {
    const sql = `
      UPDATE the 
      SET ngay_het_han = NOW() + INTERVAL '2 year'
      WHERE tai_khoan_id = $1
      RETURNING *;
    `;
    const result = await pool.query(sql, [id_acc]);
    if(result.rows.length > 0) return {success : true, message : "Ra hạn thẻ thành công!"};
    else return {success : false, message : "Ra hạn thẻ thất bại!"};
}

export const upgradeTheModel = async(id_acc : number , loai_the : string)
  : Promise<{ success: boolean; message: string }> => {
    const sql = `
      UPDATE TABLE the 
      SET loai_the = $2
      WHERE tai_khoan_id = $1
      RETURNING *;
    `;
    const result = await pool.query(sql, [id_acc, loai_the]);
    if(result.rows.length > 0) return {success : true, message : "Ra hạn thẻ thành công!"};
    else return {success : false, message : "Ra hạn thẻ thất bại!"};
  }

export const theQuaHanModel = async()
: Promise<number[]> =>{
  const sql = `SELECT tai_khoan_id FROM the
              JOIN tai_khoan tk ON tk.id = the.tai_khoan_id
              WHERE ngay_het_han < NOW() and tk.trang_thai = 'ACTIVE';`
  const result = await pool.query(sql,[]);
 return result.rows.map(r => r.tai_khoan_id);
}

export const inforTheModel = async(id_acc : number)
: Promise<theInforResult> =>{
  const sql = `SELECT tk.ho_ten , t.id, t.loai_the, t.ngay_cap, t.ngay_het_han
              FROM the t
              JOIN tai_khoan tk ON tk.id = t.tai_khoan_id
              WHERE tk.id = $1;
              `
  const result = await pool.query(sql,[id_acc]);
  return result.rows[0] as theInforResult
  
}

export const theConHanModel = async()
: Promise<number[]> =>{
  const sql = `SELECT tai_khoan_id FROM the
              JOIN tai_khoan tk ON tk.id = the.tai_khoan_id
              WHERE ngay_het_han > NOW() and tk.trang_thai = 'LOCKED';`
  const result = await pool.query(sql,[]);
 return result.rows.map(r => r.tai_khoan_id);
}