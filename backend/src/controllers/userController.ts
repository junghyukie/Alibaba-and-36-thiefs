import { Request, Response } from "express";
import { AuthRequest } from "../types/auth"
import { borrowBookService, inforBookinCartService, insertBookService } from "../services/userService";
//import { promises } from "nodemailer/lib/xoauth2";
export const insertBookController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        //console.log(req.headers);
        const id_acc = req.user?.id_acc;
        if (!id_acc) return res.status(401).json({ message: "Xin hay dang nhap" });
        const result = await insertBookService(id_acc, req.body);
        if (result.success === false) {
            console.log("Loi controller");
            return res.status(400).json(result);
        }
        else {
            return res.status(200).json(result)
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }

}


export const borrowBookController  = async (req : AuthRequest, res : Response) : Promise <any> => {
    try{
        //console.log(req.headers);
        const id_acc = req.user?.id_acc;
        if (!id_acc) return res.status(401).json({ message: "Xin hay dang nhap" });
        const result = await borrowBookService(id_acc, req.body);
        if(result.success === false){
            console.log("Loi controller");
            return res.status(400).json(result);
        }
        else{
            return res.status(200).json(result)
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
}

export const inforBookinCartController = async (req : AuthRequest, res : Response) : Promise <any> =>{
    try{
       // console.log(req.headers);
        const id_acc = req.user?.id_acc;
        if (!id_acc) return res.status(401).json({ message: "Xin hay dang nhap" });
        const results = await inforBookinCartService(id_acc);
        console.log("Dang chay controller");
        return res.status(200).json(results);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
}


/// lấy thông tin độc giả, thêm sách , bản sao , chỉnh sách của staff
//Lấy thông tin sách cho vào component
// dùng nút mượn sách để mượn
//