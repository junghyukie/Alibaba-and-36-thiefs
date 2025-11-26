import { Book, BookQuery } from "../types/book";
import * as BookModel from "../models/bookModel";
import * as CopyModel from "../models/copyModel";
import { AppError } from "../utils/appError";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MyDatabase",
  password: "DuongKhaBanh@@123",
  port: 5432,
});

interface CreateBookInput {
  tieu_de: string;
  ten_tac_gia: string;
  ten_nxb: string;
  isbn?: string;
  tom_tat?: string;
  nam_xb?: number;
  ngon_ngu?: string;
}



export class BookService {
  static async getAll(query: BookQuery) {
    return BookModel.getBooks(query);
  }

  static async getById(id: number) {
    const book = await BookModel.getBookById(id);
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  static async create(input: CreateBookInput) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { tieu_de, ten_tac_gia, ten_nxb, isbn, tom_tat, nam_xb, ngon_ngu } = input;

      // 1. Kiểm tra trùng tên sách (không phân biệt hoa thường, bỏ khoảng trắng thừa)
      const existing = await client.query(
        "SELECT 1 FROM sach WHERE TRIM(LOWER(tieu_de)) = TRIM(LOWER($1))",
        [tieu_de.trim()]
      );
      if (existing.rowCount && existing.rowCount > 0) {
        throw new Error("Tên sách đã tồn tại");
      }

      // 2. Tác giả: tìm hoặc tạo mới
      let tacgia_id: number;
      const tgResult = await client.query("SELECT id FROM tac_gia WHERE TRIM(ten) = TRIM($1)", [
        ten_tac_gia,
      ]);
      if (tgResult.rowCount === 0) {
        const ins = await client.query(
          "INSERT INTO tac_gia (ten, but_danh, mo_ta) VALUES ($1, NULL, NULL) RETURNING id",
          [ten_tac_gia.trim()]
        );
        tacgia_id = ins.rows[0].id;
      } else {
        tacgia_id = tgResult.rows[0].id;
      }

      // 3. Nhà xuất bản: tìm hoặc tạo mới
      let nxb_id: number;
      const nxbResult = await client.query("SELECT id FROM nxb WHERE TRIM(ten) = TRIM($1)", [
        ten_nxb,
      ]);
      if (nxbResult.rowCount === 0) {
        const ins = await client.query(
          "INSERT INTO nxb (ten, dia_chi, email, website, dien_thoai) VALUES ($1, NULL, NULL, NULL, NULL) RETURNING id",
          [ten_nxb.trim()]
        );
        nxb_id = ins.rows[0].id;
      } else {
        nxb_id = nxbResult.rows[0].id;
      }

      // 4. Tạo sách mới
      const newBook = await client.query(
        `INSERT INTO sach 
           (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu`,
        [tacgia_id, nxb_id, tieu_de.trim(), isbn, tom_tat, nam_xb, ngon_ngu]
      );

      await client.query("COMMIT");
      return newBook.rows[0]; // Trả về thông tin sách vừa tạo
    } catch (error) {
      await client.query("ROLLBACK");
      throw error; // Ném lỗi lên controller để xử lý
    } finally {
      client.release();
    }
  }

  static async update(id: number, data: Partial<Book>) {
    const updated = await BookModel.updateBook(id, data);
    if (!updated) throw new AppError("Book not found", 404);
    return updated;
  }

  static async delete(id: number) {
    // Lấy tất cả bản sao của đầu sách
    const copies = await BookService.getAllCopies(id).catch(() => []);
  
    // Nếu có bản sao đang được mượn → không cho xoá
    const hasBorrowedCopy = copies.some(copy => copy.trang_thai === 'BORROWED');
    if (hasBorrowedCopy) {
      throw new AppError("Cannot delete book: Some copies are currently borrowed", 400);
    }

    const deleted = await BookModel.deleteBook(id);
    if (!deleted) throw new AppError("Book not found", 404);
    return { message: "Book deleted successfully" };
  }

  static async getAllCopies(bookId: number) {
    const copies = await CopyModel.getCopyByBookId(bookId);
    if (!copies) throw new AppError("No copy found", 404);
    return copies;
  }
}
