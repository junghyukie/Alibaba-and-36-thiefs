import * as fineModel from "../models/fineModel";
import { Fine } from "../types/fine";
import { AppError } from "../utils/appError";

export class FineService {
  static async getFineById(id: number): Promise<Fine | null> {
    const fine = await fineModel.getFineById(id);
    if (!fine) throw new AppError("Fine not found", 404);
    return fine;
  }

  static async getFinesByTicketId(ticketId: number): Promise<Fine[]> {
    return fineModel.getFineByTicketId(ticketId);
  }

  static async getFinesByUserId(userId: number): Promise<Fine[]> {
    return fineModel.getFineByUserId(userId);
  }

  static async payFine(fineId: number): Promise<void> {
    const updated = await fineModel.markFineAsPaid(fineId);

    if (!updated) {
      throw new AppError("Không tìm thấy phạt hoặc đã thanh toán", 404);
    }
  }
}
