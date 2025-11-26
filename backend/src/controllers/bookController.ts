import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/bookService";

export class BookController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, ngon_ngu, the_loai, page = "1", limit = "10" } = req.query;
      const theloai_id =
        typeof the_loai === "string"
          ? the_loai.split(",").map((id) => Number(id.trim())).filter(Boolean)
          : undefined;
      const books = await BookService.getAll({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        search: search ? String(search) : undefined,
        filters: {ngon_ngu: ngon_ngu? String(ngon_ngu) : undefined, theloai_id}
      });
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "ID sách không hợp lệ" });
      }
      const book = await BookService.getById(id);
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookService.create(req.body);
      res.status(201).json({
        message: "Thêm sách thành công!",
        book,
      });
    } catch (err) {
        if (err instanceof Error) {
          if (err.message === "Tên sách đã tồn tại") {
            return res.status(400).json({ error: err.message });
          }
        }
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updated = await BookService.update(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await BookService.delete(id);
      res.status(204).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllCopies(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = Number(req.params.id);
      const copies = await BookService.getAllCopies(bookId);
      res.status(200).json(copies);
    } catch (err) {
      next(err);
    }
  }
}