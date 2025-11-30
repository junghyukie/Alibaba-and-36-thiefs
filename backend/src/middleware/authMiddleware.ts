import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập", success: false });
    }

    const secret = process.env.JWT_SECRET || "super_secret_key";

    // ⚠️ Đảm bảo type này khớp với payload khi ký token
    const decoded = jwt.verify(token, secret) as { id_acc: number , vai_tro : string}; 

    // 1. Lưu payload vào req.user để Controller có thể truy cập id_acc
    (req as any).user = decoded; 
    
    next();
  } catch (err) {
    // 2. Sửa mã lỗi thành 401 cho lỗi xác thực
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn", success: false }); 
  }
};