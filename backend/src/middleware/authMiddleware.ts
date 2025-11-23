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

    const decoded = jwt.verify(token, secret) as { id_acc: number };

    // Lưu payload vào req.user để route có thể dùng
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn", success: false });
  }
};
