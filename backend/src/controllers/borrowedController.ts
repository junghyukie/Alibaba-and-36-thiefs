// import{Request,Response} from"express";
// import { updateReturnDate } from "../models/extendDate";

// export const changeReturnDate=async(req:Request, res:Response)=>{
//     try{
//         const{doc_gia_id,ban_sao_id,ngay_tra}=req.body;
//         if(!doc_gia_id||!ban_sao_id||!ngay_tra){
//             return res.status(400).json({message:"Thiếu thông tin cần thiết"});
//         }
//         const result = await updateReturnDate(doc_gia_id, ban_sao_id, ngay_tra);
//         res.status(200).json({
//           message: "Cập nhật ngày trả thành công",
//           data: result.data,
//     });
//     }catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// };


import { Request, Response } from "express";
import { updateReturnDateService } from "../services/extendReturnDateService";

export const changeReturnDate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id_doc_gia, id_muon, han_tra } = req.body;

    if (!id_doc_gia || !id_muon || !han_tra) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin cần thiết"
      });
    }

    const result = await updateReturnDateService(id_doc_gia, id_muon, han_tra);

    if (!result.success) {
      console.log("Lỗi controller gia hạn");
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error("Lỗi server:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
