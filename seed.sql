BEGIN;

-- ===========================
-- 1. BẢNG CƠ BẢN
-- ===========================

CREATE TABLE tac_gia (
    id SERIAL PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    but_danh VARCHAR(255),
    mo_ta TEXT
);

CREATE TABLE the_loai (
    id SERIAL PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    mo_ta TEXT
);

CREATE TABLE nxb (
    id SERIAL PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    dia_chi VARCHAR(255),
    email VARCHAR(255),
    website VARCHAR(255),
    dien_thoai VARCHAR(127)
);

CREATE TABLE sach (
    id SERIAL PRIMARY KEY,
    tacgia_id INTEGER REFERENCES tac_gia(id) ON DELETE CASCADE,
    nxb_id INTEGER REFERENCES nxb(id) ON DELETE CASCADE,
    tieu_de VARCHAR(255),
    isbn VARCHAR(31),
    tom_tat TEXT,
    nam_xb INTEGER,
    ngon_ngu VARCHAR(127)
);

CREATE TABLE sach_theloai (
    sach_id INTEGER REFERENCES sach(id) ON DELETE CASCADE,
    theloai_id INTEGER REFERENCES the_loai(id) ON DELETE CASCADE,
    PRIMARY KEY (sach_id, theloai_id)
);

-- ===========================
-- 2. BẢNG BẢN SAO SÁCH
-- ===========================

CREATE TABLE ban_sao (
    id SERIAL PRIMARY KEY,
    sach_id INTEGER NOT NULL REFERENCES sach(id) ON DELETE CASCADE,
    ma_vach VARCHAR(63) UNIQUE NOT NULL,
    trang_thai VARCHAR(20) NOT NULL CHECK (trang_thai IN (
        'AVAILABLE', 'BORROWED', 'RESERVED', 'LOST', 'DAMAGED', 'MAINTENANCE'
    )),
    ngay_mua DATE NOT NULL,
    gia_tri NUMERIC(12, 2),
    ke_sach VARCHAR(63)
);

-- ===========================
-- 3. TÀI KHOẢN NGƯỜI DÙNG
-- ===========================

CREATE TABLE tai_khoan (
	id SERIAL PRIMARY KEY,
	mat_khau_hash VARCHAR(63) NOT NULL,
	ho_ten VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	dien_thoai VARCHAR(31),
	ngay_sinh DATE,
	gioi_tinh VARCHAR(10) CHECK (gioi_tinh IN ('NAM', 'NU')),
	dia_chi VARCHAR(255),
	vai_tro VARCHAR(15) CHECK (vai_tro IN ('DOC_GIA', 'NHAN_VIEN', 'ADMIN')) DEFAULT 'DOC_GIA',
	gioi_han_muon INTEGER DEFAULT 10,
	trang_thai VARCHAR(15) CHECK (trang_thai IN ('ACTIVE', 'LOCKED', 'PENDING')) DEFAULT 'PENDING',
	ma_xac_thuc VARCHAR(31),
	token_expire TIMESTAMP,
	failed_attempt INTEGER,
	locked_until TIMESTAMP
);

-- ===========================
-- 4. PHIẾU MƯỢN
-- ===========================

CREATE TABLE phieu_muon (
    id SERIAL PRIMARY KEY,
    doc_gia_id INTEGER NOT NULL REFERENCES tai_khoan(id) ON DELETE CASCADE,
    nhan_vien_id INTEGER REFERENCES tai_khoan(id) ON DELETE CASCADE,
    ban_sao_id INTEGER NOT NULL REFERENCES ban_sao(id) ON DELETE CASCADE,
    ngay_muon DATE NOT NULL,
    ngay_het_han DATE NOT NULL,
    ngay_tra DATE,
    tinh_trang VARCHAR(10) CHECK (tinh_trang IN ('CHUA_TRA', 'OK', 'HONG', 'MAT', 'KEM')) DEFAULT 'CHUA_TRA'
);

-- Trigger cập nhật trạng thái bản sao
CREATE OR REPLACE FUNCTION cap_nhat_trang_thai_ban_sao()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF NEW.ngay_tra IS NULL THEN
            UPDATE ban_sao
            SET trang_thai = 'BORROWED'
            WHERE id = NEW.ban_sao_id;
        END IF;
        RETURN NEW;
    END IF;

    IF (TG_OP = 'UPDATE') THEN
        IF NEW.ngay_tra IS NOT NULL AND OLD.ngay_tra IS NULL THEN
            IF NEW.tinh_trang = 'OK' THEN
                UPDATE ban_sao SET trang_thai = 'AVAILABLE'
                WHERE id = NEW.ban_sao_id;
            ELSIF NEW.tinh_trang = 'HONG' THEN
                UPDATE ban_sao SET trang_thai = 'DAMAGED'
                WHERE id = NEW.ban_sao_id;
            ELSIF NEW.tinh_trang = 'MAT' THEN
                UPDATE ban_sao SET trang_thai = 'LOST'
                WHERE id = NEW.ban_sao_id;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_cap_nhat_trang_thai_ban_sao
AFTER INSERT OR UPDATE ON phieu_muon
FOR EACH ROW
EXECUTE FUNCTION cap_nhat_trang_thai_ban_sao();

-- ===========================
-- 5. PHẠT
-- ===========================

CREATE TABLE phat (
    id SERIAL PRIMARY KEY,
    phieu_muon_id INTEGER NOT NULL REFERENCES phieu_muon(id) ON DELETE CASCADE,
    doc_gia_id INTEGER NOT NULL,
    loai VARCHAR(10) NOT NULL CHECK (loai IN ('TRE', 'HONG', 'MAT')),
    so_tien INTEGER NOT NULL CHECK (so_tien >= 0),
    mo_ta TEXT,
    da_thanh_toan BOOLEAN DEFAULT FALSE
);

CREATE OR REPLACE FUNCTION tao_phat_tu_dong()
RETURNS TRIGGER AS $$
DECLARE
    so_ngay_tre INTEGER;
BEGIN
    IF TG_OP = 'UPDATE' AND NEW.ngay_tra IS NOT NULL AND OLD.ngay_tra IS NULL THEN

        IF NEW.ngay_tra > NEW.ngay_het_han THEN
            so_ngay_tre := NEW.ngay_tra - NEW.ngay_het_han;
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'TRE', 5000 * so_ngay_tre,
                    CONCAT('Trễ ', so_ngay_tre, ' ngày'));
        END IF;

        IF NEW.tinh_trang = 'HONG' THEN
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'HONG', 50000, 'Sách bị hỏng');
        END IF;

        IF NEW.tinh_trang = 'MAT' THEN
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'MAT', 200000, 'Mất sách');
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tao_phat_tu_dong
AFTER UPDATE ON phieu_muon
FOR EACH ROW
EXECUTE FUNCTION tao_phat_tu_dong();

-- ===========================
-- 6. GIỎ HÀNG
-- ===========================

CREATE TABLE gio_hang_chi_tiet (
    id_account INT NOT NULL,
    id_sach INT NOT NULL,
    so_luong INT NOT NULL CHECK (so_luong > 0),
    PRIMARY KEY (id_account, id_sach),
    FOREIGN KEY (id_account) REFERENCES tai_khoan(id),
    FOREIGN KEY (id_sach) REFERENCES sach(id)
);

-- ===========================
-- 7. THẺ THƯ VIỆN
-- ===========================

CREATE TABLE the (
	id SERIAL PRIMARY KEY,
	tai_khoan_id INT NOT NULL REFERENCES tai_khoan(id),
	ngay_cap DATE NOT NULL,
	ngay_het_han DATE NOT NULL,
	loai_the VARCHAR(20) CHECK (loai_the IN ('THE_THUONG', 'THE_VIP', 'THE_HOC_SINH', 'THE_NHAN_VIEN')) DEFAULT 'THE_THUONG'
);

-- ===========================
-- 8. ĐẶT CHỖ SÁCH (QUEUE)
-- ===========================

CREATE TABLE dat_cho (
	id SERIAL PRIMARY KEY,
	tai_khoan_id INT NOT NULL REFERENCES tai_khoan(id),
	sach_id INT NOT NULL REFERENCES sach(id),
	ban_sao_id INT REFERENCES ban_sao(id),
	stt INT NOT NULL,
	ngay_het_han TIMESTAMP,
	trang_thai VARCHAR(20) CHECK (trang_thai IN ('CHO', 'DEN_LUOT')) DEFAULT 'CHO'
);

-- ===========================
-- 9. THÔNG BÁO
-- ===========================

CREATE TABLE thong_bao (
    id SERIAL PRIMARY KEY,
    tai_khoan_id INT NOT NULL REFERENCES tai_khoan(id),
    dat_cho_id INT,
    book_id INT,
    loai VARCHAR(50) NOT NULL CHECK (loai IN ('HET_HAN', 'DEN_LUOT')),
    noi_dung TEXT NOT NULL,
    ngay_tao TIMESTAMP DEFAULT NOW(),
    ngay_het_han TIMESTAMP
);

-- ===========================
-- 10. EXTENSION + INDEX TÌM KIẾM KHÔNG DẤU
-- ===========================

CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION unaccent_immutable(text)
RETURNS text
IMMUTABLE
PARALLEL SAFE
LANGUAGE sql AS $$
  SELECT public.unaccent($1);
$$;

CREATE INDEX IF NOT EXISTS idx_book_unaccent_search 
ON sach (unaccent_immutable(tieu_de) varchar_pattern_ops);

COMMIT;
