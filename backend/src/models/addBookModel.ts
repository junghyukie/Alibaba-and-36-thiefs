// import pool from "../config/db";
// import { addBookInput } from "../types/addBook";
// export const AddBookModel = async(tacgia_id : number,nxb_id : number,tieu_de : string,isbn : string,tom_tat : string | null,nam_xb : number,ngon_ngu : string) 
// : Promise<{success : boolean , message : string}> =>{
//     const sql = `INSERT INTO sach(tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
//             VALUES($1,$2,$3,$4,$5,$6,$7)
//             RETURNING *;
//     `
//     const result = await pool.query(sql,[tacgia_id,nxb_id,tieu_de,isbn,tom_tat,nam_xb,ngon_ngu]);
//     if(result.rows.length > 0) return {success : true, message :"Thêm sách thành công"};
//     else{
//         return {success : false, message :"Thêm sách thất bại"};
//     }
// }

// export const checkExistingAuthor = async(ten_tac_gia : string) : Promise<{id : number} | null> =>{
//     const sql = `SELECT id FROM tac_gia
//                 WHERE ten = $1`;
//     const result = await pool.query(sql,[ten_tac_gia]);
//     if (result.rows.length === 0) return null;
//     return result.rows[0].id;
// }

// export const checkExistingNXB = async(ten_nxb : string) : Promise<{id : number} | null> =>{
//     const sql = `SELECT id FROM nxb
//                 WHERE ten = $1`;
//     const result = await pool.query(sql,[ten_nxb]);
//     if (result.rows.length === 0) return null;
//     return result.rows[0].id;
// }

// export const addAuthor = async(ten_tac_gia : string) : Promise<{success : boolean , message : string , id : number}> =>{
//     const sql = `INSERT INTO tac_gia(ten)
//                 VALUES($1)
//                 RETURNING *;`
//     const result = await pool.query(sql,[ten_tac_gia]);
//     if(result.rows.length > 0) return {success : true, message :"Thêm tác giả thành công" , id : result.rows[0].id};
//     else{
//         return {success : false, message :"Thêm tác giả thất bại" , id : -1};
//     }
// }

// export const addNXB = async(ten_nxb : string) : Promise<{success : boolean , message : string , id : number}> =>{
//     const sql = `INSERT INTO nxb(ten)
//                 VALUES($1)
//                 RETURNING *;`
//     const result = await pool.query(sql,[ten_nxb]);
//     if(result.rows.length > 0) return {success : true, message :"Thêm nxb  thành công", id : result.rows[0].id};
//     else{
//         return {success : false, message :"Thêm nxb thất bại" , id : -1};
//     }
// }



import pool from "../config/db";

export const AddBookModel = async (
  tacgia_id: number,
  nxb_id: number,
  tieu_de: string,
  isbn: string,
  tom_tat: string | null,
  nam_xb: number,
  ngon_ngu: string
): Promise<{ success: boolean; message: string; bookId?: number }> => {
  const sql = `
    INSERT INTO sach(tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id;
  `;

  try {
    const result = await pool.query(sql, [
      tacgia_id,
      nxb_id,
      tieu_de,
      isbn,
      tom_tat,
      nam_xb,
      ngon_ngu,
    ]);

    if (result.rows.length > 0) {
      return { success: true, message: "Thêm sách thành công", bookId: result.rows[0].id };
    }

    return { success: false, message: "Thêm sách thất bại" };
  } catch (err) {
    console.error("AddBookModel error:", err);
    return { success: false, message: "Lỗi server khi thêm sách" };
  }
};


// --- Check if author exists ---
export const checkExistingAuthor = async (ten_tac_gia: string): Promise<number | null> => {
  const sql = `SELECT id FROM tac_gia WHERE ten = $1`;
  const result = await pool.query(sql, [ten_tac_gia]);
  if (result.rows.length === 0) return null;
  return result.rows[0].id; // number
};

export const checkExistingBook = async (ten_sach: string): Promise<number | null> => {
  const sql = `SELECT id FROM sach WHERE tieu_de = $1`;
  const result = await pool.query(sql, [ten_sach]);
  if (result.rows.length === 0) return null;
  return result.rows[0].id; // number
};

// --- Check if NXB exists ---
export const checkExistingNXB = async (ten_nxb: string): Promise<number | null> => {
  const sql = `SELECT id FROM nxb WHERE ten = $1`;
  const result = await pool.query(sql, [ten_nxb]);
  if (result.rows.length === 0) return null;
  return result.rows[0].id; // number
};

// --- Add author ---
export const addAuthor = async (ten_tac_gia: string): Promise<{ success: boolean; message: string; id: number }> => {
  const sql = `INSERT INTO tac_gia(ten) VALUES ($1) RETURNING id;`;
  const result = await pool.query(sql, [ten_tac_gia]);
  if (result.rows.length > 0) return { success: true, message: "Thêm tác giả thành công", id: result.rows[0].id };
  return { success: false, message: "Thêm tác giả thất bại", id: -1 };
};

// --- Add NXB ---
export const addNXB = async (ten_nxb: string): Promise<{ success: boolean; message: string; id: number }> => {
  const sql = `INSERT INTO nxb(ten) VALUES ($1) RETURNING id;`;
  const result = await pool.query(sql, [ten_nxb]);
  if (result.rows.length > 0) return { success: true, message: "Thêm NXB thành công", id: result.rows[0].id };
  return { success: false, message: "Thêm NXB thất bại", id: -1 };
};

// Kiểm tra thể loại đã tồn tại chưa
export const checkExistingTheLoai = async (ten: string): Promise<number | null> => {
  const res = await pool.query("SELECT id FROM the_loai WHERE ten = $1", [ten]);
  if (res.rows.length === 0) return null;
  return res.rows[0].id;
};

// Thêm thể loại mới
export const addTheLoai = async (ten: string): Promise<{ success: boolean; id: number }> => {
  const res = await pool.query(
    "INSERT INTO the_loai(ten) VALUES($1) RETURNING id",
    [ten]
  );
  return { success: res.rows.length > 0, id: res.rows[0].id };
};

// Thêm vào bảng trung gian sach_the_loai
export const addSachTheLoai = async (sachId: number, theLoaiId: number) => {
  await pool.query(
    "INSERT INTO sach_theloai(sach_id, theloai_id) VALUES($1, $2)",
    [sachId, theLoaiId]
  );
};

