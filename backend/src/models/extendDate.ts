import pool from"../config/db";
import { BorrowedCard } from "../types/account";

<<<<<<< Updated upstream
export const updateReturnDate=async(doc_gia_id:number, ban_sao_id: number,ngay_tra:string):Promise<any>=>{
    const sql=`
    UPDATE phieumuon
    SET ngay_tra=$1
    WHERE doc_gia_id=$2 AND ban_sao_id=$3
    RETURNING *;
    `;
    const results=await pool.query(sql,[ngay_tra,doc_gia_id,ban_sao_id]);
=======
export const updateReturnDate=async(id_doc_gia:number, id_sach: number,han_tra:string):Promise<any>=>{
    const sql=`
    UPDATE phieumuon
    SET han_tra=$1
    WHERE id_doc_gia=$2 AND id_sach=$3
    RETURNING *;
    `;
    const results=await pool.query(sql,[han_tra,id_doc_gia,id_sach]);
>>>>>>> Stashed changes
    return results.rows;
}