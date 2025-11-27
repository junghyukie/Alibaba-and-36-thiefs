import pool from "../config/db";
import { checkDatCho, countBanSao } from "../models/reserveBookModel";

export const checkReserved = async(id_acc : number, sach_id : number) : Promise<any> => {
  try{
    const results = await checkDatCho(id_acc, sach_id);
    if(results > 0) return {success : false}
    else return {success : true}
  }catch (err) {
    console.error("Lỗi SQL reserve:", err);
    return { success: false, message: "Lỗi server" };
  }
}

export const cntBanSao = async(sach_id : number) : Promise<any> => {
  try{
    const results = await countBanSao(sach_id);
    if(results > 0) return {success : false}
    else return {success : true}
  }catch (err) {
    console.error("Lỗi SQL reserve:", err);
    return { success: false, message: "Lỗi server" };
  }
}