import { NextFunction, Request, Response } from "express";
import { FineService } from "../services/fineService";

export class FineController {

  static async getFinesByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const fines = await FineService.getFinesByUserId(userId);
      res.json(fines);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  static async payFine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await FineService.payFine(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

}