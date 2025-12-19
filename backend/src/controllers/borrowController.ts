import { NextFunction, Request, Response } from "express";
import { BorrowService } from "../services/borrowService";

export class BorrowController {
  static async getByNotReturnedCopy(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const ticket = await BorrowService.getByNotReturnedCopy(id);
      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  }

  static async getActiveBorrowByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const borrows = await BorrowService.getActiveBorrow(userId);
      return res.status(200).json(borrows);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);
      const { tinh_trang } = req.body;

      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
      }

      await BorrowService.returnBook(id, tinh_trang);

      // ✅ REST chuẩn: không trả body
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
