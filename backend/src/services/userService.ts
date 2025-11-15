import { borrowBook, insertBook } from "../types/userService"
import { checkBook_Cart, checkCart, insertBookModel } from "../models/insertBookintoCartModel"
import { borrowBookModel, checkSoLuongDaMuon, insertPhieuMuonModel, updateBanSao } from "../models/borrowBookModel";
export const insertBookService = async(id_acc : number, data : insertBook) : Promise<any> =>{
    try{
        const check = await checkCart(id_acc);
        if(check >= 3) return {success : false , message : "Gio hang da day"};
        const checkBook = await checkBook_Cart(id_acc, data);
        if(checkBook > 0) return {message : "Sach da ton tai trong gio hang"};
        const result = await insertBookModel(id_acc,data);
        if(result.length > 0){
            console.log("Them sach thanh cong");
            return {success : true};
        }
        else{
            console.log("Them sach that bai");
            return {success : false};
        }
    }catch(err){
        console.error("Loi truy van sql" , err);
         return {success : false};
    }
}

export const borrowBookService = async (id_acc : number , data : borrowBook) : Promise <any> => {
    try{
        const check = await checkSoLuongDaMuon(id_acc);
        if(check >= 3) return {success : false , message : "Da het luot muon sach"};
        const result = await borrowBookModel(data);

        if(result){
            console.log("Du so luong ban sao");
            const Phieu_Muon = await insertPhieuMuonModel(id_acc,data ,result.id_ban_sao);
            if(Phieu_Muon.length > 0) {
                console.log("Insert Phieu Muon Thanh Cong");
                const BanSao = await updateBanSao(result.id_ban_sao)
                if(BanSao.length > 0){
                    console.log("Update Ban Sao thanh cong");
                    return {success : true};
                }
                else{
                    console.log("Loi Update Ban Sao");
                    return {success : false};
                }
            } else{
                console.log(" Loi Insert Phieu Muon");
                return {success : false};
            }

        }else{
            console.log("Ko con du ban sao");
            return {success : false};
        }
    }catch(err){
        console.error("Loi truy van sql" , err);
        return {success : false};
    }
}