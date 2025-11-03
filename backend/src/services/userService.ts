import { insertBook } from "../types/userService"
import { insertBookModel } from "../models/insertBookintoCartModel"
export const insertBookService = async(id_acc : number, data : insertBook) : Promise<{ success: boolean }> =>{
    try{
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