import { changePassWordModel, oldPassWord } from "../models/changePassword";
import { changePassWordInput } from "../types/auth";

export const changePassWordService = async(id_acc : number , data : changePassWordInput)
: Promise<{success : boolean, message : string}> =>{
    try{
                if(!data.mat_khau_cu || !data.mat_khau_moi || !data.xac_thuc_mat_khau) {
            return {success : false , message : "Thiếu thông tin!"};
        }
        const check = await oldPassWord(id_acc);
        if(data.mat_khau_cu != check.data) {
            console.log("Mật khẩu database:", check.data);
            console.log("Mật khẩu form:", data.mat_khau_cu);
           return {
           success : false , message :"Mật khẩu không chính xác!"
           }
        }
        if(data.mat_khau_cu === data.mat_khau_moi){
            return {success : false , message : "Mật khẩu mới giống mật khẩu cũ , cần đổi mật khẩu khác!"};
        }
        if(data.mat_khau_moi != data.xac_thuc_mat_khau){
            return {success : false , message : "Mật khẩu mới cần giống mật khẩu xác thực!"};
        }
        
        const result = await changePassWordModel(id_acc,data);
        return {
            success : result.success,
            message : result.message
        }
    }catch(err){
        console.error("Lỗi SQL changePassWord:", err);
        return { success: false, message: "Lỗi server" };
    }

}