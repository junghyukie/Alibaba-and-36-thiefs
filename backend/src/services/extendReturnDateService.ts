import { checkBorrowExist, updateReturnDate } from "../models/extendDate";

export const updateReturnDateService = async (
  id_doc_gia: number,
  id_muon: number,
  han_tra: string
): Promise<any> => {
  try {
    const check = await checkBorrowExist(id_doc_gia, id_muon);
    if (check.length === 0) {
      console.log("Không tồn tại phiếu mượn");
      return { success: false, message: "Không tìm thấy phiếu mượn" };
    }

    const result = await updateReturnDate(id_doc_gia, id_muon, han_tra);

    if (result.length > 0) {
      console.log("Cập nhật hạn trả thành công");
      return { success: true };
    } else {
      console.log("Cập nhật hạn trả thất bại");
      return { success: false };
    }

  } catch (err) {
    console.error("Lỗi truy vấn SQL:", err);
    return { success: false };
  }
};
