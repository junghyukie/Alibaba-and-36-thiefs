import * as AuthorModel from "../models/authorModel";
import { AppError } from "../utils/appError";

export class AuthorService {
  static async getAll() {
    return AuthorModel.getAuthors();
  }

  static async getById(id: number) {
    const author = await AuthorModel.getAuthorById(id);
    if (!author) throw new AppError("Author not found", 404);
    return author;
  }
}