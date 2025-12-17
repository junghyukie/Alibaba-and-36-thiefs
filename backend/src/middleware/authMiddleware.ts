import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
  
    if (!token) {
      throw new AppError("Vui lòng đăng nhập", 401);
    }
 
    const secret = process.env.JWT_SECRET || "super_secret_key";
  
    // ⚠️ Đảm bảo type này khớp với payload khi ký token
    const decoded = jwt.verify(token, secret) as { id_acc: number , vai_tro : string}; 
  
    // 1. Lưu payload vào req.user để Controller có thể truy cập id_acc
    (req as any).user = decoded; 
      
    next();
  } catch (err) {
    // 2. Sửa mã lỗi thành 401 cho lỗi xác thực
    next(new AppError("Token không hợp lệ hoặc đã hết hạn", 401));
  }
};

export const staffOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.vai_tro !== "NHAN_VIEN") {
    throw new AppError("Bạn không có quyền thực hiện chức năng này", 403);
  }

  next();
};