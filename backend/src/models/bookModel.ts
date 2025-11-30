import pool from "../config/db";
import { Book, BookQuery, QueryAnswer } from "../types/book.d";

export const getBooks = async (query: BookQuery): Promise<QueryAnswer> => {
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
    //const placeholders = filters.theloai_id.map((_, i) => `$${params.length + i + 1}`).join(",");
    //params.push(...filters.theloai_id);
    //whereClauses.push(`bc.theloai_id IN (${placeholders})`);
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
  const countSQL = `
    SELECT COUNT(*) AS total
    FROM sach b
    ${whereSQL}
  `;
  const countResult = await pool.query(countSQL, params);
  const totalItems = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalItems / limit);

  const sql = `
    SELECT 
      b.*,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', c.id, 'ten', c.ten)
        ) FILTER (WHERE c.id IS NOT NULL),
        '[]'
      ) AS the_loai
    FROM sach b
    LEFT JOIN sach_theloai bc ON b.id = bc.sach_id
    LEFT JOIN the_loai c ON bc.theloai_id = c.id
    ${whereSQL}
    GROUP BY b.id
    ORDER BY b.id
    LIMIT ${limit} OFFSET ${offset};
  `;
  const result = await pool.query(sql, params);
  return {
    currentPage: page,
    totalPages,
    totalItems,
    data: result.rows
  };
}

export const getBookById = async (id: number) : Promise<Book | null> => {
  //const result = await pool.query("SELECT * FROM sach WHERE id = $1", [id]);
  //return result.rows[0] || null;
  const result = await pool.query(
    ` SELECT 
        b.*,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object('id', c.id, 'ten', c.ten)
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS the_loai
      FROM sach b
      LEFT JOIN sach_theloai bc ON b.id = bc.sach_id
      LEFT JOIN the_loai c ON bc.theloai_id = c.id
      WHERE b.id = $1
      GROUP BY b.id; `,
    [id]
  );
  return result.rows[0] || null;
}

export const createBook = async (data: Omit<Book, "id">): Promise<Book> => {
  const { tacgia_id, nxb_id, tieu_de, tom_tat, isbn, ngon_ngu, nam_xb } = data;

  const result = await pool.query(
    ` INSERT INTO sach (tacgia_id, nxb_id, tieu_de, tom_tat, isbn13, ngon_ngu, nam_xb)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
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
      SET tacgia_id=$1, nxb_id=$2, tieu_de=$3, tom_tat=$4, isbn13=$5, ngon_ngu=$6, nam_xb=$7
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

export const deleteBook = async (id: Number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM sach WHERE id = $1", [id]);
  if (!result) return false;
  else return true;
}
