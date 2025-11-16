import pool from"../config/db";
import { BorrowedCard } from "../types/account";
export const checkBorrowExist = async (
  id_doc_gia: number,
  id_muon: number
) => {
  const sql = `
    SELECT *
    FROM muonsach
    WHERE id_doc_gia = $1 AND id_muon = $2
  `;
  const result = await pool.query(sql, [id_doc_gia, id_muon]);
  return result.rows[0];
};



export const updateReturnDate=async(id_doc_gia:number, id_muon: number,han_tra:string):Promise<any>=>{
    const sql=`
    UPDATE muonsach
    SET han_tra=$1
    WHERE id_doc_gia=$2 AND id_muon=$3
    RETURNING *;
    `;
    const results=await pool.query(sql,[han_tra,id_doc_gia,id_muon]);

    return results.rows;
}