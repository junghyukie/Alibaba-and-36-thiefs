import { LateModel } from "../models/listLateModel";
import { listAccountModel, totalRecord } from "../models/listAccountModel";
import { LateServiceResult, ListAccountResult } from "../types/staffService";

// Đọc giả quá hạn
export const lateService = async (): Promise<LateServiceResult> => {
  try {
    const results = await LateModel();
    return { success: true, data: results };
  } catch (err) {
    console.error("Lỗi SQL lateService:", err);
    return { success: false, message: "Lỗi server" };
  }
};

// List tài khoản
export const listAccountService = async (
  page: number = 1,
  pageSize: number = 20
): Promise<ListAccountResult> => {
  try {
    const { totalRecords, totalPages } = await totalRecord(pageSize);
    const accounts = await listAccountModel(page, pageSize);
    return {
      success: true,
      data: accounts,
      page,
      pageSize,
      totalPages,
      totalRecords,
    };
  } catch (err) {
    console.error("Lỗi listAccountService:", err);
    return { success: false, message: "Lỗi server" };
  }
};
