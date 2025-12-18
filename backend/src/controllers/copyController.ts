import { NextFunction, Request, Response } from "express";
import { CopyService } from "../services/copyService";
import { AppError } from "../utils/appError";

export class CopyController {

  static async getByBarcode(req: Request, res: Response, next: NextFunction) {
    try {
      const { barcode } = req.params;
      const copy = await CopyService.getByBarcode(barcode);
      res.status(200).json(copy);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const copy = await CopyService.getById(id);
      res.status(200).json(copy);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const copy = await CopyService.create(req.body);
      res.status(201).json(copy);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const updated = await CopyService.update(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await CopyService.delete(id);

      res.status(200).json({
        success: true,
        message: "Xóa bản sao thành công"
      });
    } catch (err: any) {
      if (err.code === "P0001") {
        return next(new AppError(err.message, 400));
      }
      next(err);
    }
  }

}