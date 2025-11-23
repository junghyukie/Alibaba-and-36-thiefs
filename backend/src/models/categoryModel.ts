import pool from "../config/db";
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const result = await pool.query(
    ` SELECT * FROM the_loai `
  );
  return result.rows;
}

export const getCategoryById = async (id: number) : Promise<Category | null> => {
  const result = await pool.query(
    ` SELECT * FROM the_loai WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}
