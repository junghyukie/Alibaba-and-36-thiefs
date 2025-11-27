BEGIN;
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
COMMIT;

BEGIN;

-- =============================
-- 1. Bảng tác giả
-- =============================
INSERT INTO tac_gia (ten, but_danh, mo_ta) VALUES
('Nguyễn Nhật Ánh', 'NNA', 'Nhà văn nổi tiếng với các tác phẩm viết cho tuổi học trò.'),
('J.K. Rowling', 'Robert Galbraith', 'Tác giả người Anh, nổi tiếng với loạt truyện Harry Potter.'),
('George Orwell', NULL, 'Nhà văn Anh, tác giả của 1984 và Animal Farm.'),
('Haruki Murakami', NULL, 'Nhà văn Nhật Bản, phong cách siêu thực và trữ tình.'),
('Trịnh Công Sơn', NULL, 'Nhạc sĩ, nhà thơ Việt Nam, có nhiều tác phẩm triết lý sâu sắc.'),
('Paulo Coelho', NULL, 'Nhà văn Brazil, nổi tiếng với tác phẩm Nhà Giả Kim.'),
('Dan Brown', NULL, 'Tác giả Mỹ, nổi tiếng với thể loại trinh thám và biểu tượng học.'),
('Nguyễn Ngọc Tư', NULL, 'Nhà văn Việt Nam, nổi tiếng với truyện ngắn Cánh đồng bất tận.'),
('Ernest Hemingway', NULL, 'Nhà văn Mỹ đoạt giải Nobel, phong cách hiện thực.'),
('Yuval Noah Harari', NULL, 'Nhà sử học người Israel, tác giả Sapiens và Homo Deus.'),
('Nguyễn Dữ', NULL, 'Tác giả cổ điển Việt Nam, nổi tiếng với Truyền kỳ mạn lục.'),
('Arthur Conan Doyle', NULL, 'Tác giả người Scotland, cha đẻ của Sherlock Holmes.'),
('Margaret Mitchell', NULL, 'Tác giả tiểu thuyết Cuốn theo chiều gió.');

-- =============================
-- 2. Bảng thể loại
-- =============================
INSERT INTO the_loai (ten, mo_ta) VALUES
('Tiểu thuyết', 'Tác phẩm văn xuôi hư cấu dài.'),
('Khoa học viễn tưởng', 'Thể loại tưởng tượng về công nghệ và tương lai.'),
('Tâm lý - Xã hội', 'Phân tích tâm lý con người và xã hội.'),
('Thiếu nhi', 'Tác phẩm dành cho trẻ em.'),
('Âm nhạc - Nghệ thuật', 'Sách về âm nhạc, hội họa, nghệ thuật nói chung.');

-- =============================
-- 3. Bảng nhà xuất bản
-- =============================
INSERT INTO nxb (ten, dia_chi, email, website, dien_thoai) VALUES
('NXB Trẻ', '161B Lý Chính Thắng, Quận 3, TP.HCM', 'info@nxbtre.vn', 'https://www.nxbtre.com.vn', '028-39316289'),
('Bloomsbury Publishing', '50 Bedford Square, London', 'contact@bloomsbury.com', 'https://www.bloomsbury.com', '+44-20-7631-5600'),
('Penguin Books', '80 Strand, London', 'info@penguin.co.uk', 'https://www.penguin.co.uk', '+44-20-7139-3000'),
('NXB Văn Học', '18 Nguyễn Trường Tộ, Ba Đình, Hà Nội', 'contact@nxbvanhoc.vn', 'https://nxbvanhoc.vn', '024-3733-3977'),
('NXB Kim Đồng', '55 Quang Trung, Hà Nội', 'contact@nxbkimdong.vn', 'https://nxbkimdong.vn', '024-3943-5030'),
('NXB Thế Giới', '46 Tràng Thi, Hà Nội', 'info@nxbthegioi.vn', 'https://thegioipublish.com.vn', '024-3825-9997'),
('Doubleday', '1745 Broadway, New York', 'info@doubleday.com', 'https://www.doubleday.com', '+1-212-782-9000');

-- =============================
-- 4. Bảng sách
-- =============================
INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu) VALUES
(1, 1, 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', '9786042088172', 'Câu chuyện tuổi thơ trong sáng, hồn nhiên ở miền quê Việt Nam.', 2010, 'Tiếng Việt'),
(2, 2, 'Harry Potter and the Philosopher''s Stone', '9780747532699', 'Câu chuyện về cậu bé phù thủy và ngôi trường Hogwarts.', 1997, 'English'),
(3, 3, '1984', '9780451524935', 'Tác phẩm phản địa đàng mô tả xã hội toàn trị.', 1949, 'English'),
(4, 3, 'Kafka on the Shore', '9781400079278', 'Một câu chuyện huyền ảo giữa thực và mộng.', 2002, 'English'),
(5, 4, 'Ca Khúc Da Vàng', '9786046981127', 'Tập hợp các sáng tác tiêu biểu của Trịnh Công Sơn.', 2018, 'Tiếng Việt'),
(6, 3, 'The Alchemist', '9780061122415', 'Một chàng trai chăn cừu đi tìm kho báu và khám phá ý nghĩa của cuộc đời.', 1988, 'English'),
(7, 3, 'The Da Vinci Code', '9780307474278', 'Tiểu thuyết trinh thám xoay quanh những bí ẩn trong nghệ thuật và tôn giáo.', 2003, 'English'),
(8, 1, 'Cánh đồng bất tận', '9786042066200', 'Tập truyện ngắn phản ánh cuộc sống miền Tây sông nước Việt Nam.', 2005, 'Tiếng Việt'),
(9, 3, 'The Old Man and the Sea', '9780684801223', 'Câu chuyện cảm động về người ngư dân đơn độc và con cá kiếm khổng lồ.', 1952, 'English'),
(10, 3, 'Sapiens: A Brief History of Humankind', '9780062316097', 'Khảo cứu về lịch sử tiến hóa và sự phát triển của loài người.', 2014, 'English'),
(11, 2, 'Truyền kỳ mạn lục', '9786043010073', 'Tác phẩm văn học cổ điển Việt Nam gồm nhiều truyện huyền ảo.', 1540, 'Chữ Hán'),
(12, 3, 'Sherlock Holmes: The Complete Novels and Stories', '9780553212419', 'Tuyển tập các truyện trinh thám về thám tử Sherlock Holmes.', 1892, 'English'),
(13, 3, 'Gone with the Wind', '9781416548942', 'Tiểu thuyết kinh điển về tình yêu và chiến tranh ở miền Nam nước Mỹ.', 1936, 'English'),
(1, 5, 'Cho tôi xin một vé đi tuổi thơ', '9786041144701', 'Hồi ức ngọt ngào và đầy triết lý về tuổi thơ Việt Nam.', 2008, 'Tiếng Việt'),
(2, 2, 'Fantastic Beasts and Where to Find Them', '9781338132311', 'Câu chuyện mở rộng thế giới phù thủy Harry Potter.', 2016, 'English'),
(4, 3, 'Norwegian Wood', '9780375704024', 'Tiểu thuyết lãng mạn và trầm buồn của Murakami.', 1987, 'English'),
(7, 7, 'Angels & Demons', '9780743493466', 'Robert Langdon điều tra bí ẩn về hội kín Illuminati.', 2000, 'English'),
(10, 3, 'Homo Deus: A Brief History of Tomorrow', '9780062464316', 'Bàn về tương lai của trí tuệ nhân tạo và nhân loại.', 2016, 'English'),
(8, 6, 'Gió lẻ và 9 câu chuyện khác', '9786046920805', 'Tuyển tập truyện ngắn đầy cảm xúc của Nguyễn Ngọc Tư.', 2008, 'Tiếng Việt'),
(1, 5, 'Ngồi khóc trên cây', '9786042087113', 'Câu chuyện tình cảm nhẹ nhàng, pha lẫn triết lý sống.', 2013, 'Tiếng Việt'),
(9, 3, 'A Farewell to Arms', '9780684801469', 'Tình yêu và chiến tranh qua cái nhìn của một người lính Mỹ.', 1929, 'English'),
(12, 3, 'The Sign of Four', '9780140439076', 'Một vụ án đầy bí ẩn với những dấu hiệu kỳ lạ.', 1890, 'English'),
(13, 3, 'Scarlett: The Sequel to Gone with the Wind', '9780688062682', 'Câu chuyện tiếp nối hành trình của Scarlett O’Hara.', 1991, 'English'),
(3, 3, 'Animal Farm', '9780451526342', 'Truyện ngụ ngôn chính trị phê phán chế độ toàn trị.', 1945, 'English'),
(5, 5, 'Lời thiên thu gọi', '9786042099987', 'Tuyển tập nhạc và thơ của Trịnh Công Sơn.', 2019, 'Tiếng Việt');

-- =============================
-- 5. Bảng sách_thể_loại
-- =============================
INSERT INTO sach_theloai (sach_id, theloai_id) VALUES
(1, 4),
(2, 1),
(2, 2),
(3, 3),
(4, 1),
(4, 3),
(5, 5),
(6, 1),
(7, 2),
(7, 3),
(8, 3),
(9, 1),
(10, 2),
(10, 3),
(11, 1),
(11, 3),
(12, 2),
(12, 3),
(13, 1),
(13, 3),
(14, 4),
(15, 1),
(15, 2),
(16, 1),
(16, 3),
(17, 2),
(17, 3),
(18, 2),
(19, 3),
(20, 3),
(21, 1),
(21, 3),
(22, 3),
(23, 1),
(24, 3),
(25, 5);

COMMIT;

CREATE TABLE ban_sao (
    id SERIAL PRIMARY KEY,
    sach_id INTEGER NOT NULL REFERENCES sach(id) ON DELETE CASCADE,
    ma_vach VARCHAR(63) UNIQUE NOT NULL,       -- Mã vạch duy nhất cho mỗi bản sao
    trang_thai VARCHAR(20) NOT NULL CHECK (trang_thai IN (
        'AVAILABLE', 'BORROWED', 'RESERVED', 'LOST', 'DAMAGED', 'MAINTENANCE'
    )),
    ngay_mua DATE NOT NULL,
    gia_tri NUMERIC(12, 2),
    ke_sach VARCHAR(63)                        -- vị trí vật lý trên kệ
);

INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES
(1, 'BC0001', 'AVAILABLE', '2023-05-12', 85000, 'A1-01'),
(1, 'BC0002', 'BORROWED', '2023-05-12', 85000, 'A1-01'),
(2, 'BC0003', 'AVAILABLE', '2023-06-10', 150000, 'A1-02'),
(2, 'BC0004', 'DAMAGED', '2023-06-10', 150000, 'A1-02'),
(3, 'BC0005', 'AVAILABLE', '2022-09-01', 120000, 'A2-05'),
(3, 'BC0006', 'LOST', '2022-09-01', 120000, 'A2-05'),
(4, 'BC0007', 'AVAILABLE', '2023-02-20', 180000, 'A3-04'),
(5, 'BC0008', 'AVAILABLE', '2024-01-15', 95000, 'B1-10'),
(5, 'BC0009', 'RESERVED', '2024-01-15', 95000, 'B1-10'),
(6, 'BC0010', 'AVAILABLE', '2022-12-01', 130000, 'B2-01'),
(7, 'BC0011', 'AVAILABLE', '2023-07-25', 145000, 'B2-02'),
(8, 'BC0012', 'BORROWED', '2023-03-14', 98000, 'B3-01'),
(9, 'BC0013', 'AVAILABLE', '2023-04-10', 110000, 'C1-03'),
(10, 'BC0014', 'MAINTENANCE', '2022-11-22', 200000, 'C1-03'),
(11, 'BC0015', 'AVAILABLE', '2023-09-09', 90000, 'C2-01'),
(12, 'BC0016', 'AVAILABLE', '2024-03-05', 175000, 'C2-02'),
(13, 'BC0017', 'AVAILABLE', '2022-10-10', 250000, 'C3-01'),
(14, 'BC0018', 'BORROWED', '2023-08-01', 90000, 'D1-05'),
(15, 'BC0019', 'AVAILABLE', '2024-01-10', 180000, 'D2-02'),
(16, 'BC0020', 'AVAILABLE', '2023-12-20', 125000, 'D2-03');

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

-- Bước 1: Tạo function thực hiện logic cập nhật
CREATE OR REPLACE FUNCTION cap_nhat_trang_thai_ban_sao()
RETURNS TRIGGER AS $$
BEGIN
    -- Khi thêm phiếu mượn mới (INSERT)
    IF (TG_OP = 'INSERT') THEN
        -- Nếu chưa có ngày trả => đang được mượn
        IF NEW.ngay_tra IS NULL THEN
            UPDATE ban_sao
            SET trang_thai = 'BORROWED'
            WHERE id = NEW.ban_sao_id;
        END IF;
        RETURN NEW;
    END IF;

    -- Khi cập nhật phiếu mượn (UPDATE)
    IF (TG_OP = 'UPDATE') THEN
        -- Nếu cập nhật có ngày trả (tức là sách được trả về)
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

-- Bước 2: Gắn trigger vào bảng phieu_muon
CREATE TRIGGER trg_cap_nhat_trang_thai_ban_sao
AFTER INSERT OR UPDATE
ON phieu_muon
FOR EACH ROW
EXECUTE FUNCTION cap_nhat_trang_thai_ban_sao();

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
    -- Chỉ xử lý khi phiếu mượn vừa được trả
    IF TG_OP = 'UPDATE' AND NEW.ngay_tra IS NOT NULL AND OLD.ngay_tra IS NULL THEN

        -- Phạt trễ hạn
        IF NEW.ngay_tra > NEW.ngay_het_han THEN
            so_ngay_tre := NEW.ngay_tra - NEW.ngay_het_han;
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'TRE', 5000 * so_ngay_tre,
                    CONCAT('Trễ ', so_ngay_tre, ' ngày'));
        END IF;

        -- Phạt hỏng
        IF NEW.tinh_trang = 'HONG' THEN
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'HONG', 50000, 'Sách bị hỏng');
        END IF;

        -- Phạt mất
        IF NEW.tinh_trang = 'MAT' THEN
            INSERT INTO phat (phieu_muon_id, doc_gia_id, loai, so_tien, mo_ta)
            VALUES (NEW.id, NEW.doc_gia_id, 'MAT', 200000, 'Mất sách');
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tạo trigger sau khi cập nhật phiếu mượn
CREATE TRIGGER trg_tao_phat_tu_dong
AFTER UPDATE
ON phieu_muon
FOR EACH ROW
EXECUTE FUNCTION tao_phat_tu_dong();

INSERT INTO tai_khoan (mat_khau_hash, ho_ten, email, vai_tro) VALUES
('123456', 'Độc Giả A', 'abc@gmail.com', 'DOC_GIA')

SELECT * FROM tai_khoan

INSERT INTO phieu_muon (doc_gia_id,ban_sao_id,ngay_muon,ngay_het_han) VALUES
('1', '1', '2025-11-2', '2025-11-9')

UPDATE phieu_muon
SET ngay_tra = '2025-11-11', tinh_trang = 'HONG'
WHERE id = 1
RETURNING *

INSERT INTO phieu_muon (doc_gia_id,ban_sao_id,ngay_muon,ngay_het_han) VALUES
('1', '2', '2025-11-2', '2025-11-9')

SELECT * FROM ban_sao
WHERE id = 2


 create table gio_hang_chi_tiet ( 
id_account int not null, 
id_sach int not null, 
so_luong int not null check (so_luong > 0),
primary key (id_account, id_sach), 
foreign key (id_account) references tai_khoan(id),
foreign key (id_sach) references sach(id) );


create table the(
	id SERIAL PRIMARY KEY,
	tai_khoan_id int not null,
	ngay_cap DATE not null,
	ngay_het_han DATE not null,
	loai_the varchar(20) check  (loai_the in ('THE_THUONG', 'THE_VIP','THE_HOC_SINH', 'THE_NHAN_VIEN')) default 'THE_THUONG',
	foreign key (tai_khoan_id) references tai_khoan(id)
);


create table dat_cho(
	id SERIAL PRIMARY KEY,
	tai_khoan_id int not null,
	sach_id int not null,
	ban_sao_id int,
	stt int not null,
	ngay_het_han timestamp,
	trang_thai varchar(20) check (trang_thai in ('CHO', 'DEN_LUOT')) default 'CHO',
	foreign key (tai_khoan_id) references tai_khoan(id),
	foreign key (sach_id) references sach(id),
	foreign key (ban_sao_id) references ban_sao(id)
);



CREATE TABLE thong_bao (
    id SERIAL PRIMARY KEY,
    
    tai_khoan_id INT NOT NULL,           -- người nhận
    dat_cho_id INT,                       -- nếu liên quan đến đặt chỗ, NULL nếu không
    book_id INT,                          -- nếu liên quan đến sách, NULL nếu không
    
    loai VARCHAR(50) NOT null check (loai in ('HET_HAN', 'DEN_LUOT')),           -- ví dụ: DEN_LUOT, HET_HAN, KHUYEN_MAI, THONG_BAO_CHUNG...
    noi_dung TEXT NOT NULL,               -- nội dung thông báo
    
    ngay_tao TIMESTAMP DEFAULT NOW(),
    ngay_het_han TIMESTAMP   ,      
    foreign key (tai_khoan_id) references tai_khoan(id)-- dùng cho loại có giới hạn thời gian, NULL nếu không
);
