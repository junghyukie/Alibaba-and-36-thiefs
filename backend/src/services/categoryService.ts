import * as CategoryModel from "../models/categoryModel";
import { AppError } from "../utils/appError";

export class CategoryService {
  static async getAll() {
    return CategoryModel.getCategories();
  }

  static async getById(id: number) {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) throw new AppError("Category not found", 404);
    return category;
  }
}