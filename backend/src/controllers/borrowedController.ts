import{Request,Response} from"express";
import { updateReturnDate } from "../models/extendDate";

export const changeReturnDate=async(req:Request, res:Response)=>{
    try{
        const{doc_gia_id,ban_sao_id,ngay_tra}=req.body;
        if(!doc_gia_id||!ban_sao_id||!ngay_tra){
            return res.status(400).json({message:"Thiếu thông tin cần thiết"});
        }
        const result = await updateReturnDate(doc_gia_id, ban_sao_id, ngay_tra);
        res.status(200).json({
          message: "Cập nhật ngày trả thành công",
          data: result,
    });
    }catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};