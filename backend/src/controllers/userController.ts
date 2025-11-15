import { Request, Response } from "express";
import { AuthRequest } from "../types/auth"
import { borrowBookService, insertBookService } from "../services/userService";
export const insertBookController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
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


export const borrowBookController  = async (req : AuthRequest, res : Response) : Promise <any> =>{
    try{
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