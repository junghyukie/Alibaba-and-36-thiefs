import pool from "../config/db";

export const addBanSao = async(
    sach_id : number,
    ma_vach: string,
    ngay_mua : Date,
    gia_tri : number,
    ke_sach: string
) : Promise<{ success: boolean; message: string}> =>{
    const sql = `
    INSERT INTO ban_sao(sach_id, ma_vach, ngay_mua, gia_tri, ke_sach, trang_thai)
    VALUES ($1,$2,$3,$4,$5,'MAINTENANCE')
    RETURNING id;`
    const result = await pool.query(sql,[sach_id,ma_vach,ngay_mua,gia_tri,ke_sach]);
    if(result.rows.length > 0) return{success : true, message : "Thêm bản sao thành công"};
    else{
        return{success : false, message : "Thêm bản sao thất bại"};
    }
}