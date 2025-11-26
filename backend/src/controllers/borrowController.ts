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

  static async returnBook(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { tinh_trang } = req.body;
      const data = await BorrowService.returnBook(id, tinh_trang);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}