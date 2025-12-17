import * as CopyModel from "../models/copyModel";
import { Copy } from "../types/copy";
import { AppError } from "../utils/appError";

export class CopyService {
  static async getByBarcode(ma_vach: string) {
    // Validate barcode có tồn tại
    if (!ma_vach) {
      throw new AppError("Barcode is required", 400);
    }
    const copy = await CopyModel.getCopyByBarcode(ma_vach);
    if (!copy) throw new AppError("Copy not found", 404);
    return copy;
  }

  static async getById(id: number) {
    const copy = await CopyModel.getCopyById(id);
    if (!copy) throw new AppError("Copy not found", 404);
    return copy;
  }

  static async create(data: Omit<Copy, "id">) {
    if (!data.sach_id || !data.ma_vach || !data.trang_thai || !data.ngay_mua)
      throw new AppError("Missing required fields: sach_id, ma_vach, trang_thai, ngay_mua", 400);
    const existing = await CopyModel.getCopyByBarcode(data.ma_vach);

    if (existing) {
      throw new AppError("Duplicate barcode", 400);
    }
    if (!['AVAILABLE', 'BORROWED', 'RESERVED', 'LOST', 'DAMAGED', 'MAINTENANCE'].includes(data.trang_thai)) {
      throw new AppError("Invalid copy status", 400);
    }

    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    if (!data.ngay_mua || !DATE_REGEX.test(data.ngay_mua) || isNaN(Date.parse(data.ngay_mua))) {
      throw new AppError("Invalid date format for 'ngay_mua'. Expected YYYY-MM-DD.", 400);
    }

    return CopyModel.createCopy(data);
  }

  static async update(id: number, data: Partial<Copy>) {
    // Validate barcode nếu có truyền
    if (data.ma_vach) {
      const duplicateBarcode = await CopyModel.getCopyByBarcode(data.ma_vach);
      if (duplicateBarcode && duplicateBarcode.id !== id) {
        throw new AppError("Duplicate barcode", 400);
      }
    }
  
    // Validate trạng thái nếu có truyền
    if (data.trang_thai &&
        !['AVAILABLE', 'BORROWED', 'RESERVED', 'LOST', 'DAMAGED', 'MAINTENANCE'].includes(data.trang_thai)) {
      throw new AppError("Invalid copy status", 400);
    }
  
    // Validate ngày mua nếu có truyền
    if (data.ngay_mua) {
      const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
      if (!DATE_REGEX.test(data.ngay_mua) || isNaN(Date.parse(data.ngay_mua))) {
        throw new AppError(
          "Invalid date format for 'ngay_mua'. Expected YYYY-MM-DD.",
          400
        );
      }
    }
    const updated = await CopyModel.updateCopy(id, data);
    if (!updated) throw new AppError("Copy not found", 404);
    return updated;
  }

  static async delete(id: number) {
    // Việc kiểm tra điều kiện xóa thực hiện ở database
    const deleted = await CopyModel.deleteCopy(id);
    if (!deleted) throw new AppError("Copy not found", 404);
    return { message: "Copies deleted successfully" };
  }

}
