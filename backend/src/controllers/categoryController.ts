import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const book = await CategoryService.getById(id);
      res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }
}