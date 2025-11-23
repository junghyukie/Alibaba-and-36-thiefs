import { NextFunction, Request, Response } from "express";
import { PublisherService } from "../services/publisherService";

export class PublisherController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const publishers = await PublisherService.getAll();
      res.json(publishers);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const publisher = await PublisherService.getById(id);
      res.json(publisher);
    } catch (err) {
      next(err);
    }
  }
}