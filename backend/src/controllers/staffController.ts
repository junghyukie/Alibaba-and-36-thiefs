import { Response } from "express";
import { AuthRequest } from "../types/auth";
import { addBanSaoService, addBookService, lateService, listAccountService } from "../services/staffService";
import { LateServiceResult, ListAccountResult } from "../types/staffService";

// Controller lấy danh sách đọc giả quá hạn
export const lateController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const id_acc = req.user?.id_acc;
    if (!id_acc) return res.status(401).json({ success: false, message: "Xin hãy đăng nhập" });

    const role = req.user?.vai_tro;
    if (role === "DOC_GIA") return res.status(403).json({ success: false, message: "Không đủ quyền hạn" });

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
    const id_acc = req.user?.id_acc;
    if (!id_acc) return res.status(401).json({ success: false, message: "Xin hãy đăng nhập" });

    const role = req.user?.vai_tro;
    if (role === "DOC_GIA") return res.status(403).json({ success: false, message: "Không đủ quyền hạn" });

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
     const id_acc = req.user?.id_acc;
    if (!id_acc) return res.status(401).json({ success: false, message: "Xin hãy đăng nhập" });

    const role = req.user?.vai_tro;
    if (role === "DOC_GIA") return res.status(403).json({ success: false, message: "Không đủ quyền hạn" });

    const addBook = await addBookService(req.body);
    console.log(addBook.message);
    return res.status(addBook.success ? 200 : 500).json(addBook);
  }catch (err) {
    console.error("Lỗi Thêm sách Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

export const addBanSaoController = async(
   req: AuthRequest,
  res: Response
): Promise<Response> =>{
   try{
     const id_acc = req.user?.id_acc;
    if (!id_acc) return res.status(401).json({ success: false, message: "Xin hãy đăng nhập" });

    const role = req.user?.vai_tro;
    if (role === "DOC_GIA") return res.status(403).json({ success: false, message: "Không đủ quyền hạn" });

    const add = await addBanSaoService(req.body);
    console.log(add.message);
     return res.status(add.success ? 200 : 500).json(add);
}catch (err) {
    console.error("Lỗi Thêm bản sao Controller:", err);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}