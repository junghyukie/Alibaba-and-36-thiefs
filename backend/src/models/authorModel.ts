import pool from "../config/db";
import { Author } from "../types/author";

export const getAuthors = async (): Promise<Author[]> => {
  const result = await pool.query(
    ` SELECT * FROM tac_gia `
  );
  return result.rows;
}

export const getAuthorById = async (id: number) : Promise<Author | null> => {
  const result = await pool.query(
    ` SELECT * FROM tac_gia WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}
