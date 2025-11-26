import { NextFunction, Request, Response } from "express";
import { AuthorService } from "../services/authorService";

export class AuthorController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const authors = await AuthorService.getAll();
      res.status(200).json(authors);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const author = await AuthorService.getById(id);
      res.json(author);
    } catch (err) {
      next(err);
    }
  }
}