import { Book, BookQuery } from "../types/book";
import * as BookModel from "../models/bookModel";
import { AppError } from "../utils/appError";

// TODO
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
    if (!data.tieu_de || !data.isbn13)
      throw new AppError("Missing required fields: tieu_de, isbn13", 400);
    return BookModel.createBook(data);
  }

  static async update(id: number, data: Partial<Book>) {
    const updated = await BookModel.updateBook(id, data);
    if (!updated) throw new AppError("Book not found", 404);
    return updated;
  }

  static async delete(id: number) {
    const deleted = await BookModel.deleteBook(id);
    if (!deleted) throw new AppError("Book not found", 404);
    return { message: "Book deleted successfully" };
  }
}
