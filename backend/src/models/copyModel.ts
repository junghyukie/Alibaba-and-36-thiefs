import pool from "../config/db";
import { Copy, NumCopy } from "../types/copy";

export const getCopyByBarcode = async (ma_vach: string) : Promise<Copy | null> => {
  const result = await pool.query(
    ` SELECT * FROM ban_sao WHERE ma_vach = $1; `,
    [ma_vach]
  );
  return result.rows[0] || null;
}

export const getCopyById = async (id: number) : Promise<Copy | null> => {
  const result = await pool.query(
    ` SELECT * FROM ban_sao WHERE id = $1; `,
    [id]
  );
  return result.rows[0] || null;
}

export const getCopyByBookId = async (bookId: number) : Promise<Copy[]> => {
  const result = await pool.query(
    ` SELECT * FROM ban_sao WHERE sach_id = $1; `,
    [bookId]
  );
  return result.rows;
}

export const getNumCopies = async (bookId: number) : Promise<NumCopy> => {
  const result = await pool.query(
    ` SELECT
        sach_id,
        COUNT(*) AS total_copies,
        COUNT(*) FILTER (WHERE trang_thai = 'AVAILABLE') AS available_copies
      FROM ban_sao
      WHERE sach_id = $1
      GROUP BY sach_id;`,
    [bookId]
  );
  return result.rows[0];
}

export const createCopy = async (data: Omit<Copy, "id">) : Promise<Copy> => {
  const { sach_id, trang_thai, ma_vach, ngay_mua, gia_tri, ke_sach } = data;

  const result = await pool.query(
    ` INSERT INTO ban_sao (sach_id, trang_thai, ma_vach, ngay_mua, gia_tri, ke_sach)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING * `,
    [sach_id, trang_thai, ma_vach, ngay_mua, gia_tri, ke_sach]
  );
  return result.rows[0];
}

export const updateCopy = async (id: number, data: Partial<Copy>): Promise<Copy | null>  => {
  const existing = await getCopyById(id);
  if (!existing) return null;

  const updated = { ...existing, ...data };

  const result = await pool.query(
    ` UPDATE ban_sao
      SET sach_id=$1, trang_thai=$2, ma_vach=$3, ngay_mua=$4, gia_tri=$5, ke_sach=$6
      WHERE id=$7
      RETURNING * `,
    [
      updated.sach_id,
      updated.trang_thai,
      updated.ma_vach,
      updated.ngay_mua,
      updated.gia_tri,
      updated.ke_sach,
      id,
    ]
  );
  return result.rows[0];
}

export const deleteCopy = async (id: number): Promise<boolean> => {
  const result = await pool.query(
    "DELETE FROM ban_sao WHERE id = $1",
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}
