import { LateModel } from "../models/listLateModel";
import { listAccountModel, totalRecord } from "../models/listAccountModel";
import { copiesInforService, LateServiceResult, ListAccountResult } from "../types/staffService";
import { addBookInput } from "../types/addBook";
import {
  addAuthor, AddBookModel, addNXB,
  checkExistingAuthor, checkExistingBook,
  checkExistingNXB, checkExistingTheLoai, addSachTheLoai, addTheLoai
} from "../models/addBookModel";
import { addBanSaoInput } from "../types/addBanSao";
import { activateAccModel, lockAccModel } from "../models/changeStateAccModel";
import { addTheModel, extendTheModel, upgradeTheModel } from "../models/CardModel";
import { LogModelforStaff } from "../models/logModel";
import { logServiceResult } from "../types/userService";
import { listCopies, totalRecordCopies } from "../models/copiesInforModel";

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



//add book
export const addBookService = async (
  data: addBookInput & { the_loai?: string[] }
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingBookId = await checkExistingBook(data.tieu_de);
    if (existingBookId != null) return { success: false, message: "Sách đã tồn tại" };

    let authorId = await checkExistingAuthor(data.ten_tg);
    if (!authorId || authorId < 0) {
      const addedAuthor = await addAuthor(data.ten_tg);
      if (!addedAuthor.success) return { success: false, message: addedAuthor.message };
      authorId = addedAuthor.id;
    }

    let nxbId = await checkExistingNXB(data.nxb);
    if (!nxbId || nxbId < 0) {
      const addedNXB = await addNXB(data.nxb);
      if (!addedNXB.success) return { success: false, message: addedNXB.message };
      nxbId = addedNXB.id;
    }

    const addBookRes = await AddBookModel(
      authorId,
      nxbId,
      data.tieu_de,
      data.isbn,
      data.tom_tat ?? null,
      data.nam_xb,
      data.ngon_ngu
    );
    if (!addBookRes.success || !addBookRes.bookId) return { success: false, message: addBookRes.message };

    const sachId = addBookRes.bookId;

    if (data.the_loai && data.the_loai.length > 0) {
      for (const tenTL of data.the_loai) {
        let theLoaiId = await checkExistingTheLoai(tenTL);
        if (!theLoaiId) {
          const addedTL = await addTheLoai(tenTL);
          if (!addedTL.success) continue;
          theLoaiId = addedTL.id;
        }
        if (theLoaiId != null) await addSachTheLoai(sachId, theLoaiId);
      }
    }

    return { success: true, message: "Thêm sách thành công" };
  } catch (err) {
    console.error("addBookService error:", err);
    return { success: false, message: "Lỗi server khi thêm sách" };
  }
};

// Kích hoạt tài khoản
export const activeAccService = async (id_acc: number)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const result = await activateAccModel(id_acc);
    console.log(result.message + " Service");
    return {success : result.success , message : result.message}
  } catch (err) {
    console.error("Kích hoạt tài khoản error:", err);
    return { success: false, message: "Lỗi server khi kích hoạt tài khoản" };
  }
 }

 export const lockAccService = async (id_acc: number)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const result = await lockAccModel(id_acc);
    console.log(result.message + " Service");
    return {success : result.success , message : result.message}
  } catch (err) {
    console.error("Khóa tài khoản error:", err);
    return { success: false, message: "Lỗi server khi khóa tài khoản" };
  }
 }


 export const addTheService = async (id_acc: number)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const result = await addTheModel(id_acc);
    console.log(result.message + " Service");
    return {success : result.success , message : result.message}
  } catch (err) {
    console.error("Tạo Thẻ error:", err);
    return { success: false, message: "Lỗi server khi tạo thẻ" };
  }
 }

  export const extendTheService = async (id_acc: number)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const result = await extendTheModel(id_acc);
    console.log(result.message + " Service");
    return {success : result.success , message : result.message}
  } catch (err) {
    console.error("Gia hạn error:", err);
    return { success: false, message: "Lỗi server khi gia hạn tài khoản" };
  }
 }

  export const upgradeTheService = async (id_acc: number, loai_the : string)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const result = await upgradeTheModel(id_acc, loai_the);
    console.log(result.message + " Service");
    return {success : result.success , message : result.message}
  } catch (err) {
    console.error("Nâng cấp error:", err);
    return { success: false, message: "Lỗi server khi nâng cấp thẻ" };
  }
 }

 export const logServiceforStaff = async() : Promise<logServiceResult> => {
   try{
     const results = await LogModelforStaff();
     return {success : true, data : results}
   }catch (err) {
     console.error("Lỗi SQL logService:", err);
     return { success: false, message: "Lỗi server" };
   }
 }


 export const listCopiesService = async (
  page: number = 1,
  pageSize: number = 20
): Promise<copiesInforService> => {
  try {
    const { totalRecords, totalPages } = await totalRecordCopies(pageSize);
    const copies = await listCopies(page, pageSize);
    return {
      success: true,
      data: copies,
      page,
      pageSize,
      totalPages,
      totalRecords,
    };
  } catch (err) {
    console.error("Lỗi listCopiesService:", err);
    return { success: false, message: "Lỗi server" };
  }
};
