import { NextFunction, Request, Response } from "express";
import { BorrowService } from "../services/borrowService";

export class BorrowController {
  static async returnBook(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { tinh_trang } = req.body;
      const authors = await BorrowService.returnBook(id, tinh_trang);
      res.json(authors);
    } catch (err) {
      next(err);
    }
  }
}