// import { borrowBook, insertBook } from "../types/userService"
// import { checkBook_Cart, checkCart, inforBookinCart, insertBookModel } from "../models/insertBookintoCartModel"
// import { borrowBookModel, checkBook_Cart2, checkSoLuongDaMuon, insertPhieuMuonModel, updateBanSao } from "../models/borrowBookModel";
// export const insertBookService = async(id_acc : number, data : insertBook) : Promise<any> =>{
//     try{
//         const check = await checkCart(id_acc);
//         if(check >= 3) return {success : false , message : "Gio hang da day"};
//         const checkBook = await checkBook_Cart(id_acc, data);
//         if(checkBook > 0) return {message : "Sach da ton tai trong gio hang"};
//         const result = await insertBookModel(id_acc,data);
//         if(result.length > 0){
//             console.log("Them sach thanh cong");
//             return {success : true};
//         }
//         else{
//             console.log("Them sach that bai");
//             return {success : false};
//         }
//     }catch(err){
//         console.error("Loi truy van sql" , err);
//          return {success : false};
//     }
// }

// export const borrowBookService = async (id_acc : number , data : borrowBook) : Promise <any> => {
//     try{
//         const check = await checkSoLuongDaMuon(id_acc);
//         if(check >= 3) return {success : false , message : "Da het luot muon sach"};
//         // const test = await checkBook_Cart2(id_acc,data);
//         // if(test === 0) return {success : false , message : "Cần cho sách vào giỏ trước khi mượn"};
//         const result = await borrowBookModel(data);
        
//         if(result){
//             console.log("Du so luong ban sao");
//             const Phieu_Muon = await insertPhieuMuonModel(id_acc,data ,result.id_ban_sao);
//             if(Phieu_Muon.length > 0) {
//                 console.log("Insert Phieu Muon Thanh Cong");
//                 const BanSao = await updateBanSao(result.id_ban_sao)
//                 if(BanSao.length > 0){
//                     console.log("Update Ban Sao thanh cong");
//                     return {success : true};
//                 }
//                 else{
//                     console.log("Loi Update Ban Sao");
//                     return {success : false};
//                 }
//             } else{
//                 console.log(" Loi Insert Phieu Muon");
//                 return {success : false};
//             }

//         }else{
//             console.log("Ko con du ban sao");
//             return {success : false};
//         }
//     }catch(err){
//         console.error("Loi truy van sql" , err);
//         return {success : false};
//     }
// }

// export const inforBookinCartService = async (id_acc : number) : Promise<any> => {
//     try{
//         console.log("infor Book Service Success")
//         return await inforBookinCart(id_acc);
//     }catch(err){
//         console.error("Loi truy van sql" , err);
//         return[] ;
//     }
// }


import { insertBook, borrowBook } from "../types/userService";
import { checkBook_Cart, checkCart, inforBookinCart, insertBookModel } from "../models/insertBookintoCartModel";
import { borrowBookModel, checkBook_Cart2, checkSoLuongDaMuon, insertPhieuMuonModel, updateBanSao } from "../models/borrowBookModel";

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

export const borrowBookService = async (id_acc: number, data: borrowBook): Promise<any> => {
  try {
    const alreadyBorrowed = await checkSoLuongDaMuon(id_acc);
    if (alreadyBorrowed >= 3) return { success: false, message: "Đã hết lượt mượn sách" };

    const banSao = await borrowBookModel(data);
    if (!banSao) return { success: false, message: "Không còn bản sao khả dụng" };

    const phieuMuon = await insertPhieuMuonModel(id_acc, data, banSao.id);
    if (!phieuMuon) return { success: false, message: "Tạo phiếu mượn thất bại" };

    const updateBanSaoResult = await updateBanSao(banSao.id, 'BORROWED');
    if (!updateBanSaoResult.length) return { success: false, message: "Cập nhật trạng thái bản sao thất bại" };

    return { success: true, phieuMuon , message: "Mượn sách thành công" };
  } catch (err) {
    console.error("Lỗi SQL borrowBookService:", err);
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
