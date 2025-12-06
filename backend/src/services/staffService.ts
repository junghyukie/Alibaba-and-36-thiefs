import { LateModel } from "../models/listLateModel";
import { listAccountModel, totalRecord } from "../models/listAccountModel";
import { LateServiceResult, ListAccountResult } from "../types/staffService";
import { addBookInput } from "../types/addBook";
import {
  addAuthor, AddBookModel, addNXB,
  checkExistingAuthor, checkExistingBook,
  checkExistingNXB, checkExistingTheLoai, addSachTheLoai, addTheLoai
} from "../models/addBookModel";
import { addBanSaoInput } from "../types/addBanSao";
import { addBanSao } from "../models/addBanSaoModel";
import { activateAccModel, lockAccModel } from "../models/changeStateAccModel";

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


//add bản sao
export const addBanSaoService = async (data: addBanSaoInput)
  : Promise<{ success: boolean; message: string }> => {
  try {
    const checkBook = await checkExistingBook(data.ten_sach);
    if (checkBook === null) {
      return { success: false, message: "Sách chưa tồn tại, cần thêm sách trước" }
    }
    const result = await addBanSao(checkBook, data.ma_vach, data.ngay_mua, data.gia_tri, data.ke_sach);
    console.log(result.message);
    return { success: result.success, message: result.message };
  } catch (err) {
    console.error("add bản sao error:", err);
    return { success: false, message: "Lỗi server khi thêm bản sao" };
  }
}

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
