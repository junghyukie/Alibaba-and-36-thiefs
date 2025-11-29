import pool from "../config/db";

export const countBanSao = async(sach_id : number) : Promise<number> =>{
    const sql = `SELECT * FROM ban_sao WHERE sach_id = $1 and trang_thai = 'AVAILABLE'`
    const results = await pool.query(sql,[sach_id]);
    return results.rowCount ?? 0;
}

export const checkDatCho = async(id_acc : number , sach_id : number) : Promise<any> =>{
     const sql = `SELECT * FROM dat_cho WHERE tai_khoan_id = $1 AND sach_id = $2`
    const results = await pool.query(sql,[id_acc,sach_id]);
    return results.rowCount ?? 0;
}

//Cho váo hàng đợi nếu chưa có bản sao
export const insertQueue = async(id_acc : number , sach_id : number , stt : number) : Promise<any> =>{
    const sql = 
    `
   INSERT INTO dat_cho(tai_khoan_id, sach_id, stt)
    VALUES ($1, $2, $3)
    RETURNING *;
    `
    const result = await pool.query(sql,[id_acc,sach_id,stt]);
    return result.rowCount;
}


//update queue khi có người mượn sách (thay thứ tự)
export const reorderQueue = async(sach_id : number) : Promise<any> => {
    const sql = 
    `
    UPDATE dat_cho
    SET stt = stt - 1
    WHERE sach_id = $1;
    `
    const results = await pool.query(sql,[sach_id]);
    return results.rowCount;
}

//Lấy số thứ tự đang đợi hiện tại của 1 user
export const selectSTT = async(id_acc : number , sach_id : number) : Promise<{stt : number} | null> => {
    const sql = `SELECT stt FROM dat_cho
                WHERE tai_khoan_id = $1 AND sach_id = $2`
    const result = await pool.query(sql,[id_acc,sach_id]);
    if (result.rows.length > 0) {
        // Lấy row đầu tiên
        return { stt: result.rows[0].stt };
    } else {
        return null;
    }
}

export const selectUserFirst = async(sach_id : number) : Promise<any> => {
    const sql = 
    `SELECT * FROM dat_cho 
       WHERE sach_id = $1 AND ban_sao_id IS NULL 
       ORDER BY stt ASC 
       LIMIT 1
    `
    const result = await pool.query(sql,[sach_id]);
    return result.rows;
}

export const updateDatcho = async(id_acc: number, ban_sao_id : number) : Promise<any> =>{
    const sql = 
    `UPDATE dat_cho
    SET ban_sao_id = $2,
    ngay_het_han = NOW() + INTERVAL '3 minutes',
    trang_thai = 'DEN_LUOT'
    WHERE tai_khoan_id = $1
    RETURNING *;`

    const result = await pool.query(sql,[id_acc,ban_sao_id]);
    return result.rows[0];
}

export const selectExpired = async(sach_id: number): Promise<any[]> => {
    const sql = `
        SELECT *
        FROM dat_cho
        WHERE sach_id = $1
          AND trang_thai = 'DEN_LUOT'
          AND ngay_het_han < NOW();
    `;
    const result = await pool.query(sql, [sach_id]);
    return result.rows;
}

export const deleteFromQueue = async(id_acc: number, sach_id: number): Promise<number | null> => {
    const sql = `
        DELETE FROM dat_cho
        WHERE tai_khoan_id = $1
        AND sach_id = $2;
    `;
    const result = await pool.query(sql, [id_acc, sach_id]);
    return result.rowCount;
}

export const moveNextUser = async (sach_id: number, ban_sao_id: number): Promise<any> => {
    const first = await selectUserFirst(sach_id);
    if (first.length === 0) return null;

    const nextUser = first[0];

    const updated = await updateDatcho(nextUser.tai_khoan_id, ban_sao_id);
    return updated;
}

///sai trường
export const createNotification = async (
    tai_khoan_id: number,
    loai: string,
    noi_dung: string
) => {
    const sql = `
        INSERT INTO thong_bao (tai_khoan_id, loai, noi_dung)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await pool.query(sql, [tai_khoan_id, loai, noi_dung]);
    return result.rows[0];
}


//bổ sung : nếu ko ai lấy sách chuyển từ reserved sang available
//nếu ko ai đặt chỗ chuyển từ maintenance sang available
export const convertReservedtoAvailable = async() : Promise<any> =>{
    const sql = 
    `
    UPDATE ban_sao
    SET trang_thai = 'AVAILABLE'
    WHERE trang_thai = 'RESERVED'
    AND sach_id not in (
        SELECT dc.sach_id FROM dat_cho dc
    
    )
    RETURNING *;
    `
    const results = await pool.query(sql);
    return results.rowCount;
}

export const convertMaintenancetoAvailable = async(): Promise<number> => {
    const sql = `
        UPDATE ban_sao b
        SET trang_thai = 'AVAILABLE'
        WHERE b.trang_thai = 'MAINTENANCE'
          AND NOT EXISTS (
              SELECT 1
              FROM dat_cho dc
              WHERE dc.sach_id = b.sach_id
                AND dc.trang_thai = 'CHO'
          )
        RETURNING *;
    `;
    const results = await pool.query(sql);
    return results.rowCount ?? 0;
}


