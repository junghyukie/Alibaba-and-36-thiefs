import * as BorrowModel from "../models/borrowModel";
import * as FineModel from "../models/fineModel"
import { AppError } from "../utils/appError";

export class BorrowService {
  static async getByNotReturnedCopy(ban_sao_id: number) {
    const ticket = await BorrowModel.getBorrowByNotReturnedCopy(ban_sao_id);
    if (!ticket) throw new AppError("Borrow ticket not found", 404);
    return ticket;
  }

  static async getActiveBorrow(userId: number): Promise<BorrowService[]> {
    return BorrowModel.getActiveBorrowByUserId(userId);
  }

  static async returnBook(
    id: number,
    tinh_trang: "OK" | "HONG" | "MAT"
  ) {
    const ALLOWED = ["OK", "HONG", "MAT"];

    if (!ALLOWED.includes(tinh_trang)) {
      throw new AppError("Tình trạng sách không hợp lệ", 400);
    }

    // 1️⃣ Kiểm tra phiếu mượn
    const borrow = await BorrowModel.getBorrowById(id);
    if (!borrow) {
      throw new AppError("Không tìm thấy phiếu mượn", 404);
    }

    if (borrow.tinh_trang !== "CHUA_TRA") {
      throw new AppError("Phiếu mượn đã được xử lý", 400);
    }

    // 2️⃣ Cập nhật trạng thái + ngày trả
    const ngay_tra = new Date().toISOString().split("T")[0];

    await BorrowModel.returnUpdate(id, tinh_trang, ngay_tra);

    return {
      message: "Trả sách thành công",
      tinh_trang,
    };
  }

}
