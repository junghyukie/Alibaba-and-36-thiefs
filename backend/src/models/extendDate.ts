import pool from"../config/db";
import { BorrowedCard } from "../types/account";

export const updateReturnDate=async(doc_gia_id:number, ban_sao_id: number,ngay_tra:string):Promise<any>=>{
    const sql=`
    UPDATE phieumuon
    SET ngay_tra=$1
    WHERE doc_gia_id=$2 AND ban_sao_id=$3
    RETURNING *;
    `;
    const results=await pool.query(sql,[ngay_tra,doc_gia_id,ban_sao_id]);
    return results.rows;
}