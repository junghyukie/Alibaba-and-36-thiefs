import pool from "../config/db";
import { Book, BookQuery } from "../types/book.d";

export const getBooks = async (query: BookQuery): Promise<Book[]> => {
  const {page = 1, limit = 10 , search, filters} = query;
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let whereClauses: string[] = [];

  // --- search filter ---
  if (search) {
    params.push(`%${search}%`);
    whereClauses.push(`
      unaccent_immutable(b.tieu_de) ILIKE unaccent_immutable($${params.length})
    `);
  }

  // --- language filter ---
  if (filters?.ngon_ngu) {
    params.push(filters.ngon_ngu);
    whereClauses.push(`b.ngon_ngu = $${params.length}`);
  }

  // --- multi-category filter ---
  if (filters?.theloai_id && filters.theloai_id.length > 0) {
    const placeholders = filters.theloai_id.map((_, i) => `$${params.length + i + 1}`).join(", ");
    params.push(...filters.theloai_id);
    whereClauses.push(`
      EXISTS (
        SELECT 1 FROM sach_theloai bc
        WHERE bc.sach_id = b.id
          AND bc.theloai_id IN (${placeholders})
      )
    `);
  }

  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  
  // FIX 1: Thêm b.id vào SELECT và GROUP BY
  const sql = `
    SELECT 
      b.id,
      b.tieu_de, 
      tg.ten AS author,
      p.ten AS publisher,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', c.id, 'ten', c.ten)
        ) FILTER (WHERE c.id IS NOT NULL),
        '[]'
      ) AS the_loai
    FROM sach b
    LEFT JOIN sach_theloai bc ON b.id = bc.sach_id
    LEFT JOIN the_loai c ON bc.theloai_id = c.id
    LEFT JOIN tac_gia tg ON b.tacgia_id = tg.id
    LEFT JOIN nxb p ON b.nxb_id = p.id
    ${whereSQL}
    GROUP BY b.id, b.tieu_de, tg.ten, p.ten
    ORDER BY b.id
    LIMIT $${params.length + 1} OFFSET $${params.length + 2};
  `;
  
  // FIX 2: Thêm limit và offset vào params thay vì string concatenation
  params.push(limit, offset);
  
  const result = await pool.query(sql, params);
  return result.rows;
}

export const getBookById = async (id: number) : Promise<Book | null> => {
  // FIX 3: Thêm b.id vào GROUP BY và SELECT đầy đủ columns
  const result = await pool.query(
    ` SELECT 
        b.id,
        b.tacgia_id,
        b.nxb_id,
        b.tieu_de,
        b.tom_tat,
        b.isbn,
        b.ngon_ngu,
        b.nam_xb,
        tg.ten AS author,
        p.ten AS publisher,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('id', c.id, 'ten', c.ten)
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS the_loai
      FROM sach b
      LEFT JOIN sach_theloai bc ON b.id = bc.sach_id
      LEFT JOIN the_loai c ON bc.theloai_id = c.id
      LEFT JOIN tac_gia tg ON b.tacgia_id = tg.id
      LEFT JOIN nxb p ON b.nxb_id = p.id
      WHERE b.id = $1
      GROUP BY b.id, b.tacgia_id, b.nxb_id, b.tieu_de, b.tom_tat, b.isbn, b.ngon_ngu, b.nam_xb, tg.ten, p.ten; `,
    [id]
  );
  return result.rows[0] || null;
}

export const createBook = async (data: Omit<Book, "id">): Promise<Book> => {
  const { tacgia_id, nxb_id, tieu_de, tom_tat, isbn, ngon_ngu, nam_xb } = data;

  const result = await pool.query(
    ` INSERT INTO sach (tacgia_id, nxb_id, tieu_de, tom_tat, isbn, ngon_ngu, nam_xb)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING * `,
    [tacgia_id, nxb_id, tieu_de, tom_tat, isbn, ngon_ngu, nam_xb]
  );
  return result.rows[0];
}

export const updateBook = async (id: number, data: Partial<Book>): Promise<Book | null>  => {
  const existing = await getBookById(id);
  if (!existing) return null;

  const updated = { ...existing, ...data };

  const result = await pool.query(
    ` UPDATE sach
      SET tacgia_id=$1, nxb_id=$2, tieu_de=$3, tom_tat=$4, isbn=$5, ngon_ngu=$6, nam_xb=$7
      WHERE id=$8
      RETURNING * `,
    [
      updated.tacgia_id,
      updated.nxb_id,
      updated.tieu_de,
      updated.tom_tat,
      updated.isbn,
      updated.ngon_ngu,
      updated.nam_xb,
      id,
    ]
  );
  return result.rows[0];
}

export const deleteBook = async (id: number): Promise<boolean> => {
  // FIX 4: Đổi Number thành number, và kiểm tra rowCount
  const result = await pool.query("DELETE FROM sach WHERE id = $1", [id]);
  return result.rowCount !== null && result.rowCount > 0;
}