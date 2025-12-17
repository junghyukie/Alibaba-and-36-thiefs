import { Book, BookQuery } from "../types/book";
import * as BookModel from "../models/bookModel";
import * as CopyModel from "../models/copyModel";
import { AppError } from "../utils/appError";

export class BookService {
  static async getAll(query: BookQuery) {
    return BookModel.getBooks(query);
  }

  static async getById(id: number) {
    const book = await BookModel.getBookById(id);
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  static async create(data: Omit<Book, "id">) {
    if (!data.tieu_de || !data.isbn)
      throw new AppError("Missing required fields: tieu_de, isbn13", 400);
    return BookModel.createBook(data);
  }

  static async update(id: number, data: Partial<Book>) {
    const updated = await BookModel.updateBook(id, data);
    if (!updated) throw new AppError("Book not found", 404);
    return updated;
  }

  static async delete(id: number) {
    // Chú ý việc kiểm tra điều kiện xóa thực hiện trong database
    const deleted = await BookModel.deleteBook(id);

    if (!deleted) {
      throw new AppError("Book not found", 404);
    }

    return { message: "Book deleted successfully" };
  }

  static async getAllCopies(bookId: number) {
    const copies = await CopyModel.getCopyByBookId(bookId);
    if (!copies) throw new AppError("No copy found", 404);
    return copies;
  }

  static async getNumCopies(bookId: number) {
    const numCopies = await CopyModel.getNumCopies(bookId);
    if (!numCopies) throw new AppError("No copy found", 404);
    return numCopies;
  }
}
