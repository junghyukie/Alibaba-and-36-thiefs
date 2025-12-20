import { Response } from "express";
import { AuthRequest } from "../types/auth";
import { activeAccService, addBookService, addTheService, createBorrowService, extendTheService, lateService, listAccountService, listCopiesService, lockAccService, logServiceforStaff, notificationStaffService, upgradeTheService } from "../services/staffService";
import { copiesInfor, copiesInforService, LateServiceResult, ListAccountResult } from "../types/staffService";
import { theExistingModel } from "../models/CardModel";

// Controller lấy danh sách đọc giả quá hạn
export const lateController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const results: LateServiceResult = await lateService();
    console.log(results)
    return res.status(results.success ? 200 : 400).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// Controller list tài khoản với phân trang
export const listAccountController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const result: ListAccountResult = await listAccountService(page, pageSize);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    console.error("Lỗi listAccountController:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const addBookController = async(
   req: AuthRequest,
  res: Response
): Promise<Response> =>{
  try{
    const addBook = await addBookService(req.body);
    console.log(addBook.message);
    return res.status(addBook.success ? 200 : 500).json(addBook);
  }catch (err) {
    console.error("Lỗi Thêm sách Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

// Kích hoạt tài khoản
export const activateAccController = async(req : AuthRequest, res : Response)
: Promise<Response> =>{
    try{
    const id = req.body.id;
    const result = await activeAccService(id);
    const check = await theExistingModel(id);
    if(check.rows.length == 0){
        const add = await addTheService(id);
        console.log(add.message + " Controller");
    }
    console.log(result.message + " Controller");
    return res.status(result.success ? 200 : 500).json(result);
    }catch (err) {
    console.error("Lỗi kích hoạt tài khoản Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

//Khóa tài khoản
export const lockAccController = async(req : AuthRequest, res : Response)
: Promise<Response> =>{
    try{
    const id = req.body.id;
    const result = await lockAccService(id);
    console.log(result.message + " Controller");
    return res.status(result.success ? 200 : 500).json(result);
    }catch (err) {
    console.error("Lỗi khóa tài khoản Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

export const extendTheController = async(req : AuthRequest, res : Response)
: Promise<Response> =>{
    try{
    const id = req.body.id;
    const result = await extendTheService(id);
    console.log(result.message + " Controller");
    return res.status(result.success ? 200 : 500).json(result);
    }catch (err) {
    console.error("Lỗi khóa tài khoản Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

export const upgradeTheController = async(req : AuthRequest, res : Response)
: Promise<Response> =>{
    try{
    const id = req.body.id;
    const loai_the = req.body.loai_the;
    const result = await upgradeTheService(id, loai_the);
    console.log(result.message + " Controller");
    return res.status(result.success ? 200 : 500).json(result);
    }catch (err) {
    console.error("Lỗi khóa tài khoản Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}


export const LogControllerforStaff = async(req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const result = await logServiceforStaff();
      if (result.success === false) {
          console.log("Lỗi controller log");
          return res.status(400).json(result);
      } else {
          console.log("Đang chạy controller log");
          console.log(result.data);
          return res.status(200).json(result);
      }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server" }); 
    }
};


export const listCopiesController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const result: copiesInforService = await listCopiesService(page, pageSize);
    return res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    console.error("Lỗi listCopiesController:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};


//Notification
export const notificationStaffController = async(req: AuthRequest, res: Response): Promise<Response> => {
    try {
        const id_acc = req.user?.id_acc;
        if (!id_acc) return res.status(401).json({ message: "Xin hãy đăng nhập" });

        const result = await notificationStaffService();
        if (result.success === false) {
            //console.log("Lỗi controller extendBook");
            return res.status(400).json(result);
        } else {
            return res.status(200).json(result);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server" }); 
    }
};

export const staffBorrowController = async(req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const nhanVienId = req.user?.id_acc;
    if (!nhanVienId) return res.status(401).json({ message: "Xin hãy đăng nhập" });

    const result = await createBorrowService(nhanVienId, req.body);
    if (result.success === false){
      return res.status(400).json(result);
    }
    else {
      return res.status(200).json(result);
    }
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
