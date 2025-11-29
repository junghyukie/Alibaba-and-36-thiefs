import { Request, Response } from "express";
import { AuthRequest } from "../types/auth"
import { ReservationService } from "../services/reservceBookService";
import { checkReserved, cntBanSao } from "../services/reserveServiceForUser";


export const reserveController = async(req : AuthRequest, res : Response) : Promise<any> =>{
    try{
        const id_acc = req.user?.id_acc;
        if (!id_acc) return res.status(401).json({ message: "Xin hãy đăng nhập" });
           const { sach_id } = req.body;
        if (!sach_id || typeof sach_id !== "number") {
            return res.status(400).json({ message: "Sai dữ liệu sách" });
        }
        const count = await cntBanSao(sach_id)
        if(count.success === false)  return res.status(400).json({ message: "Sách đã có ở thư viện" });
        const rest = await checkReserved(id_acc,sach_id);
        if(rest.success == false){
            return res.status(400).json({ message: "Đã đặt chỗ sách này" });
        }
        const results = await ReservationService.addToQueue(id_acc,sach_id)
        if (results.success === false) {
            console.log("Lỗi reserve Controller ");
            return res.status(400).json(results);
        }
        else {
            console.log("Đặt chỗ thành công")
            return res.status(200).json(results)
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
}