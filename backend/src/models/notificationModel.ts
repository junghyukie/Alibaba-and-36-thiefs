import pool from "../config/db";
import { notification } from "../types/notification";


//Sách sắp hết hạn
// USER: Sách sắp hết hạn
export const notifyUserSachSapHetHan = async (): Promise<number> => {
    const sql = `
    INSERT INTO thong_bao (
        tai_khoan_id,
        loai,
        phieu_muon_id,
        noi_dung,
        ngay_het_han,
        doi_tuong_xem
    )
    SELECT
        pm.doc_gia_id,
        'SACH_SAP_HET_HAN',
        pm.id,
        CONCAT(
            'Sách "', s.tieu_de,
            '" sẽ hết hạn vào ',
            TO_CHAR(pm.ngay_het_han, 'DD/MM/YYYY')
        ),
        pm.ngay_het_han,
        'USER'
    FROM phieu_muon pm
    JOIN ban_sao bs ON bs.id = pm.ban_sao_id
    JOIN sach s ON s.id = bs.sach_id
    WHERE pm.tinh_trang = 'CHUA_TRA'
    AND pm.ngay_het_han > CURRENT_DATE
    AND pm.ngay_het_han <= CURRENT_DATE + INTERVAL '3 days'

    ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};


//cho nhân viên
// STAFF: Sách quá hạn
export const notifyStaffSachQuaHan = async (): Promise<number> => {
    const sql = `
    INSERT INTO thong_bao (
        loai,
        phieu_muon_id,
        noi_dung,
        doi_tuong_xem
    )
    SELECT
        'SACH_QUA_HAN',
        pm.id,
        CONCAT(
            'Sách "', s.tieu_de,
            '" đã quá hạn. Độc giả: ', tk.ho_ten
        ),
        'STAFF'
    FROM phieu_muon pm
    JOIN ban_sao bs ON bs.id = pm.ban_sao_id
    JOIN sach s ON s.id = bs.sach_id
    JOIN tai_khoan tk ON tk.id = pm.doc_gia_id
    WHERE pm.tinh_trang = 'CHUA_TRA'
    AND pm.ngay_het_han < CURRENT_DATE
    ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};

//ON CONFLICT DO NOTHING;
// USER: Sách đã quá hạn
export const notifyUserSachQuaHan = async (): Promise<number> => {
    const sql = `
    INSERT INTO thong_bao (
        tai_khoan_id,
        loai,
        phieu_muon_id,
        noi_dung,
        doi_tuong_xem
    )
    SELECT
        pm.doc_gia_id,
        'SACH_QUA_HAN',
        pm.id,
        CONCAT(
            'Sách "', s.tieu_de,
            '" đã quá hạn. Vui lòng đến thư viện để trả sách.'
        ),
        'USER'
    FROM phieu_muon pm
    JOIN ban_sao bs ON bs.id = pm.ban_sao_id
    JOIN sach s ON s.id = bs.sach_id
    WHERE pm.tinh_trang = 'CHUA_TRA'
    AND pm.ngay_het_han < CURRENT_DATE
    ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};

// Thẻ sắp hết hạn → USER
export const notifyUserTheSapHetHan = async (): Promise<number> => {
    const sql = `
INSERT INTO thong_bao (
    tai_khoan_id,
    loai,
    the_id,
    noi_dung,
    ngay_het_han,
    doi_tuong_xem
)
SELECT
    t.tai_khoan_id,
    'THE_SAP_HET_HAN',
    t.id,
    CONCAT(
        'Thẻ thư viện của bạn sẽ hết hạn vào ',
        TO_CHAR(t.ngay_het_han, 'DD/MM/YYYY'),
        '. Vui lòng gia hạn.'
    ),
    t.ngay_het_han,
    'USER'
FROM the t
WHERE t.ngay_het_han > CURRENT_DATE
AND t.ngay_het_han <= CURRENT_DATE + INTERVAL '3 days'

ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};


// Thẻ đã quá hạn → STAFF
export const notifyStaffTheQuaHan = async (): Promise<number> => {
    const sql = `
INSERT INTO thong_bao (
    tai_khoan_id,
    loai,
    the_id,
    noi_dung,
    doi_tuong_xem
)
SELECT
    NULL,
    'THE_QUA_HAN',
    t.id,
    CONCAT(
        'Thẻ của độc giả "', tk.ho_ten,
        '" đã quá hạn.'
    ),
    'STAFF'
FROM the t
JOIN tai_khoan tk ON tk.id = t.tai_khoan_id
WHERE t.ngay_het_han < CURRENT_DATE
ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};


// Tài khoản chưa kích hoạt → STAFF
export const notifyStaffAccChuaKichHoat = async (): Promise<number> => {
    const sql = `
INSERT INTO thong_bao (
    tai_khoan_id,
    loai,
    noi_dung,
    doi_tuong_xem
)
SELECT
    NULL,
    'TAI_KHOAN_CHUA_KICH_HOAT',
    CONCAT(
        'Tài khoản "', tk.ho_ten,
        '" (email: ', tk.email,
        ') chưa được kích hoạt.'
    ),
    'STAFF'
FROM tai_khoan tk
WHERE tk.trang_thai = 'PENDING'
ON CONFLICT DO NOTHING;
    `;
    const res = await pool.query(sql);
    return res.rowCount || 0;
};


export const notificationForUser = async(id_acc : number) : Promise<notification[]> =>{
    const sql = `SELECT tb.noi_dung, tb.ngay_tao
                FROM thong_bao tb
                WHERE tb.doi_tuong_xem = 'USER'
                AND tai_khoan_id = $1
                ORDER BY tb.ngay_tao DESC;`
    
    const results = await pool.query(sql,[id_acc]);
    return results.rows as notification[];
}


export const notificationForStaff = async() : Promise<notification[]> =>{
        const sql = `SELECT tb.noi_dung, tb.ngay_tao
                FROM thong_bao tb
                WHERE tb.doi_tuong_xem = 'STAFF'
                ORDER BY tb.ngay_tao DESC;`
    
    const results = await pool.query(sql,[]);
    return results.rows as notification[];
}






