import * as BorrowModel from "../models/borrowModel";
import * as FineModel from "../models/fineModel"
import { AppError } from "../utils/appError";

export class BorrowService {
  static async getByNotReturnedCopy(ban_sao_id: number) {
    const ticket = await BorrowModel.getBorrowByNotReturnedCopy(ban_sao_id);
    if (!ticket) throw new AppError("Borrow ticket not found", 404);
    return ticket;
  }

  static async returnBook(id: number, tinh_trang: string) {
    if (!['OK', 'HONG', 'MAT'].includes(tinh_trang)) {
      throw new AppError("Invalid book status", 400);
    }
    const today = new Date().toISOString().split('T')[0];
    const updated = await BorrowModel.returnUpdate(id, tinh_trang, today);
    if (!updated) throw new AppError("Borrow ticket not found", 404);

    const fine = await FineModel.getFineByTicketId(id);
    return { updated, fine };
  }
}
