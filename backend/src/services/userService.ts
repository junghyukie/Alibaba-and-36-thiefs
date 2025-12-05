
import { insertBook, borrowBook, logServiceResult } from "../types/userService";
import { checkBook_Cart, checkCart, inforBookinCart, insertBookModel } from "../models/insertBookintoCartModel";
import { borrowBookModel, checkBorrowedBook, checkSoLuongDaMuon, insertPhieuMuonModel, updateBanSao } from "../models/borrowBookModel";
import { LogModel } from "../models/logModel";
import { theInforResult } from "../types/the";
import { inforTheModel } from "../models/CardModel";


export const insertBookService = async (id_acc: number, data: insertBook): Promise<any> => {
  try {
    const cartCount = await checkCart(id_acc);
    if (cartCount >= 3) return { success: false, message: "Giỏ hàng đã đầy" };

    const existing = await checkBook_Cart(id_acc, data);
    if (existing > 0) return { success: false, message: "Sách đã tồn tại trong giỏ" };

    const result = await insertBookModel(id_acc, data);
    return result.length ? { success: true } : { success: false, message: "Thêm sách thất bại" };
  } catch (err) {
    console.error("Lỗi SQL insertBookService:", err);
    return { success: false, message: "Lỗi server" };
  }
};

export const inforBookinCartService = async (id_acc: number): Promise<any[]> => {
  try {
    return await inforBookinCart(id_acc);
  } catch (err) {
    console.error("Lỗi SQL inforBookinCartService:", err);
    return [];
  }
};

export const borrowBookService = async (id_acc: number, data: borrowBook): Promise<any> => {
  try {
    const checkBorrowed = await checkBorrowedBook(id_acc,data);
    if(checkBorrowed > 0) return { success: false, message: "Đã mượn sách này" };
    const alreadyBorrowed = await checkSoLuongDaMuon(id_acc);
    if (alreadyBorrowed >= 3) return { success: false, message: "Đã hết lượt mượn sách" };
    console.log("qua check 1");
    const banSao = await borrowBookModel(data);
    if (!banSao) return { success: false, message: "Không còn bản sao khả dụng" };
    console.log("qua check 2");
    const phieuMuon = await insertPhieuMuonModel(id_acc, data, banSao.id);
    if (!phieuMuon) return { success: false, message: "Tạo phiếu mượn thất bại" };
    console.log("qua check 3");
    const updateBanSaoResult = await updateBanSao(banSao.id, "BORROWED");
    if (!updateBanSaoResult.length) return { success: false, message: "Cập nhật trạng thái bản sao thất bại" };
    console.log("qua check 4");
    return { success: true, phieuMuon , message: "Mượn sách thành công" };
  } catch (err) {
    console.error("Lỗi SQL borrowBookService:", err);
    return { success: false, message: "Lỗi server" };
  }
};

//Lịch sử mượn trả của user
export const logService = async(id_acc : number) : Promise<logServiceResult> => {
  try{
    const results = await LogModel(id_acc);
    return {success : true, data : results}
  }catch (err) {
    console.error("Lỗi SQL logService:", err);
    return { success: false, message: "Lỗi server" };
  }
}

export const theInforService = async(id_acc : number) : Promise<any> => {
  try{
    const results = await inforTheModel(id_acc);
    return {success : true , data : results};
  }catch (err) {
    console.error("Lỗi SQL theInforService:", err);
    return {success : false};
  }
}




