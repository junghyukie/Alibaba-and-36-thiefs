import pool from "../config/db";
import { Publisher } from "../types/publisher";

export const getPublishers = async (): Promise<Publisher[]> => {
  const result = await pool.query(
    ` SELECT * FROM nxb `
  );
  return result.rows;
}

export const getPublisherById = async (id: number) : Promise<Publisher | null> => {
  const result = await pool.query(
    ` SELECT * FROM nxb WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}
