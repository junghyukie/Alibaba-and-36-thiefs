-- 1. Tạo NXB
INSERT INTO nxb (ten, dia_chi, email, dien_thoai) VALUES
('NXB Kim Đồng', 'Hà Nội', 'kimdong@nxb.vn', '02439434730'), -- ID 1
('NXB Trẻ', 'TP.HCM', 'nxbtre@tre.vn', '02839316289'),     -- ID 2
('IPM', 'Hà Nội', 'info@ipm.vn', '0333192934');           -- ID 3

-- 2. Tạo Thể Loại
INSERT INTO the_loai (ten, mo_ta) VALUES
('Psychological', 'Tâm lý'),
('Horror', 'Kinh dị'),
('Shounen', 'Dành cho thiếu niên nam'),
('Action', 'Hành động'),
('Adventure', 'Phiêu lưu'),
('Comedy', 'Hài hước'),
('Drama', 'Kịch tính'),
('Fantasy', 'Giả tưởng'),
('Mystery', 'Bí ẩn'),
('Sports', 'Thể thao'),
('Sci-Fi', 'Khoa học viễn tưởng'),
('Supernatural', 'Siêu nhiên');

DO $$
DECLARE
    v_nxb_kimdong INT;
    v_nxb_tre INT;
    v_nxb_ipm INT;
    v_tg_id INT;
    v_sach_id INT;
BEGIN
    -- Lấy ID NXB (giả định đã insert ở bước 1)
    SELECT id INTO v_nxb_kimdong FROM nxb WHERE ten = 'NXB Kim Đồng';
    SELECT id INTO v_nxb_tre FROM nxb WHERE ten = 'NXB Trẻ';
    SELECT id INTO v_nxb_ipm FROM nxb WHERE ten = 'IPM';

    -- =======================================================================
    -- DANH SÁCH 40 TRUYỆN (Mỗi block là 1 bộ truyện đầy đủ thông tin)
    -- =======================================================================

    -- 1. One Piece
    INSERT INTO tac_gia (ten) VALUES ('Eiichiro Oda') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'One Piece', '978-604-2-001', 'Hành trình của Luffy tìm kho báu Vua Hải Tặc.', 1997, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Adventure'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-OP-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-1');

    -- 2. Naruto
    INSERT INTO tac_gia (ten) VALUES ('Masashi Kishimoto') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Naruto', '978-604-2-002', 'Câu chuyện về ninja Naruto muốn trở thành Hokage.', 1999, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NAR-01', 'BORROWED', CURRENT_DATE, 25000, 'Kệ A-2');

    -- 3. Dragon Ball
    INSERT INTO tac_gia (ten) VALUES ('Akira Toriyama') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Dragon Ball', '978-604-2-003', 'Son Goku và hành trình tìm ngọc rồng.', 1984, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DB-01', 'AVAILABLE', CURRENT_DATE, 22000, 'Kệ A-3');

    -- 4. Thám tử lừng danh Conan
    INSERT INTO tac_gia (ten) VALUES ('Gosho Aoyama') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Thám tử lừng danh Conan', '978-604-2-004', 'Kudo Shinichi bị teo nhỏ và phá án.', 1994, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CON-01', 'AVAILABLE', CURRENT_DATE, 20000, 'Kệ B-1');

    -- 5. Doraemon
    INSERT INTO tac_gia (ten) VALUES ('Fujiko F. Fujio') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Doraemon', '978-604-2-005', 'Mèo máy đến từ tương lai.', 1969, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DOR-01', 'AVAILABLE', CURRENT_DATE, 18000, 'Kệ B-2');

    -- 6. Bleach
    INSERT INTO tac_gia (ten) VALUES ('Tite Kubo') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Bleach', '978-604-2-006', 'Ichigo trở thành thần chết thay thế.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BLE-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-4');

    -- 7. Hunter x Hunter
    INSERT INTO tac_gia (ten) VALUES ('Yoshihiro Togashi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hunter x Hunter', '978-604-2-007', 'Gon Freecss tìm cha và trở thành Hunter.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Adventure'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HXH-01', 'MAINTENANCE', CURRENT_DATE, 25000, 'Kệ A-5');

    -- 8. Gintama
    INSERT INTO tac_gia (ten) VALUES ('Hideaki Sorachi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Gintama', '978-604-2-008', 'Samurai thời kỳ người ngoài hành tinh xâm lược.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GIN-01', 'AVAILABLE', CURRENT_DATE, 22000, 'Kệ C-1');

    -- 9. Fullmetal Alchemist
    INSERT INTO tac_gia (ten) VALUES ('Hiromu Arakawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Fullmetal Alchemist', '978-604-2-009', 'Hai anh em giả kim thuật sư tìm hòn đá triết gia.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FMA-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ C-2');

    -- 10. Death Note
    INSERT INTO tac_gia (ten) VALUES ('Tsugumi Ohba') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Death Note', '978-604-3-010', 'Cuốn sổ tử thần và cuộc đấu trí với L.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DN-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ B-3');

    -- 11. Fairy Tail
    INSERT INTO tac_gia (ten) VALUES ('Hiro Mashima') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Fairy Tail', '978-604-2-011', 'Hội pháp sư vui nhộn nhất Fiore.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FT-01', 'AVAILABLE', CURRENT_DATE, 22000, 'Kệ A-6');

    -- 12. Kimetsu no Yaiba (Thanh gươm diệt quỷ)
    INSERT INTO tac_gia (ten) VALUES ('Koyoharu Gotouge') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Kimetsu no Yaiba', '978-604-2-012', 'Tanjiro gia nhập đội diệt quỷ để cứu em gái.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KNY-01', 'BORROWED', CURRENT_DATE, 25000, 'Kệ hot-1');

    -- 13. Jujutsu Kaisen (Chú thuật hồi chiến)
    INSERT INTO tac_gia (ten) VALUES ('Gege Akutami') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Jujutsu Kaisen', '978-604-2-013', 'Nam sinh trung học nuốt ngón tay nguyền hồn.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-JJK-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ hot-2');

    -- 14. My Hero Academia (Học viện siêu anh hùng)
    INSERT INTO tac_gia (ten) VALUES ('Kohei Horikoshi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'My Hero Academia', '978-604-2-014', 'Cậu bé vô năng muốn trở thành anh hùng số 1.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MHA-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ hot-3');

    -- 15. Chainsaw Man
    INSERT INTO tac_gia (ten) VALUES ('Tatsuki Fujimoto') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Chainsaw Man', '978-604-4-015', 'Chàng trai cưa máy diệt quỷ.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CSM-01', 'AVAILABLE', CURRENT_DATE, 45000, 'Kệ hot-4');

    -- 16. Spy x Family
    INSERT INTO tac_gia (ten) VALUES ('Tatsuya Endo') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Spy x Family', '978-604-2-016', 'Gia đình điệp viên, sát thủ và nhà ngoại cảm.', 2019, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SXF-01', 'BORROWED', CURRENT_DATE, 30000, 'Kệ hot-5');

    -- 17. Haikyuu!!
    INSERT INTO tac_gia (ten) VALUES ('Haruichi Furudate') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Haikyuu!!', '978-604-2-017', 'Chàng lùn chơi bóng chuyền.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HAI-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ S-1');

    -- 18. Slam Dunk
    INSERT INTO tac_gia (ten) VALUES ('Takehiko Inoue') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Slam Dunk', '978-604-2-018', 'Huyền thoại bóng rổ học đường.', 1990, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SD-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ S-2');

    -- 19. Kuroko no Basket
    INSERT INTO tac_gia (ten) VALUES ('Tadatoshi Fujimaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Kuroko no Basket', '978-604-2-019', 'Thế hệ kỳ tích bóng rổ.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KNB-01', 'AVAILABLE', CURRENT_DATE, 22000, 'Kệ S-3');

    -- 20. Blue Lock
    INSERT INTO tac_gia (ten) VALUES ('Muneyuki Kaneshiro') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Blue Lock', '978-604-2-020', 'Trại huấn luyện tiền đạo số 1 thế giới.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BL-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ S-4');

    -- 21. Attack on Titan
    INSERT INTO tac_gia (ten) VALUES ('Hajime Isayama') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Attack on Titan', '978-604-4-021', 'Cuộc chiến sinh tồn chống lại người khổng lồ.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AOT-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ A-7');

    -- 22. Tokyo Revengers
    INSERT INTO tac_gia (ten) VALUES ('Ken Wakui') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Tokyo Revengers', '978-604-3-022', 'Du hành thời gian cứu bạn gái khỏi băng đảng.', 2017, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TR-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ A-8');

    -- 23. One Punch Man
    INSERT INTO tac_gia (ten) VALUES ('ONE & Yusuke Murata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'One Punch Man', '978-604-2-023', 'Người hùng đấm phát chết luôn.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-OPM-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-9');

    -- 24. Mob Psycho 100
    -- Tác giả ONE đã có ở trên (nếu insert lại sẽ lỗi nếu ko check, nhưng ở đây mình insert chuỗi khác)
    INSERT INTO tac_gia (ten) VALUES ('ONE (Original)') RETURNING id INTO v_tg_id; 
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Mob Psycho 100', '978-604-2-024', 'Cậu bé siêu năng lực muốn sống bình thường.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MOB-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ C-3');

    -- 25. Dr. Stone
    INSERT INTO tac_gia (ten) VALUES ('Riichiro Inagaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Dr. Stone', '978-604-2-025', 'Khôi phục nền văn minh từ thời đồ đá.', 2017, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DRS-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ D-1');

    -- 26. Black Clover
    INSERT INTO tac_gia (ten) VALUES ('Yuki Tabata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Black Clover', '978-604-2-026', 'Asta không có phép thuật muốn làm Ma Pháp Vương.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-10');

    -- 27. The Promised Neverland
    INSERT INTO tac_gia (ten) VALUES ('Kaiu Shirai') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'The Promised Neverland', '978-604-3-027', 'Cuộc đào thoát khỏi trại trẻ mồ côi ăn thịt người.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TPN-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ B-4');

    -- 28. Assassination Classroom (Lớp học ám sát)
    INSERT INTO tac_gia (ten) VALUES ('Yusei Matsui') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Assassination Classroom', '978-604-2-028', 'Học sinh ám sát thầy giáo bạch tuộc.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ C-4');

    -- 29. Bakuman
    -- Tác giả Ohba đã có ở trên
    INSERT INTO tac_gia (ten) VALUES ('Takeshi Obata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Bakuman', '978-604-2-029', 'Hành trình trở thành họa sĩ truyện tranh chuyên nghiệp.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BAK-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ D-2');

    -- 30. JoJo Bizarre Adventure
    INSERT INTO tac_gia (ten) VALUES ('Hirohiko Araki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'JoJo Bizarre Adventure', '978-604-4-030', 'Các thế hệ gia đình Joestar chiến đấu chống lại cái ác.', 1987, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-JOJO-01', 'AVAILABLE', CURRENT_DATE, 45000, 'Kệ A-11');

    -- 31. Rurouni Kenshin (Lãng khách Kenshin)
    INSERT INTO tac_gia (ten) VALUES ('Nobuhiro Watsuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Rurouni Kenshin', '978-604-4-031', 'Kiếm sĩ huyền thoại thề không sát sinh.', 1994, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-RK-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ A-12');

    -- 32. Inuyasha
    INSERT INTO tac_gia (ten) VALUES ('Rumiko Takahashi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Inuyasha', '978-604-4-032', 'Khuyển dạ xoa và cô gái xuyên không.', 1996, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-INU-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ C-5');

    -- 33. Ranma 1/2
    -- Tác giả Rumiko đã có, nhưng insert dòng mới cho đơn giản
    -- INSERT INTO tac_gia (ten) VALUES ('Rumiko Takahashi (2)') RETURNING id INTO v_tg_id;
	SELECT id INTO v_tg_id FROM tac_gia WHERE ten = 'Rumiko Takahashi';
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Ranma 1/2', '978-604-4-033', 'Chàng trai biến thành con gái khi gặp nước lạnh.', 1987, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-RAN-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ C-6');

    -- 34. Yu Yu Hakusho (Hành trình U Linh Giới)
    -- Tác giả Togashi đã có
    -- INSERT INTO tac_gia (ten) VALUES ('Yoshihiro Togashi (2)') RETURNING id INTO v_tg_id;
	SELECT id INTO v_tg_id FROM tac_gia WHERE ten = 'Yoshihiro Togashi';
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Yu Yu Hakusho', '978-604-2-034', 'Thám tử tâm linh Yusuke.', 1990, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YYH-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-13');

    -- 35. Shaman King (Vua Pháp Thuật)
    INSERT INTO tac_gia (ten) VALUES ('Hiroyuki Takei') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Shaman King', '978-604-2-035', 'Cuộc chiến giữa các pháp sư để trở thành Vua.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SK-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-14');

    -- 36. Hikaru no Go (Kỳ thủ cờ vây)
    INSERT INTO tac_gia (ten) VALUES ('Yumi Hotta') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hikaru no Go', '978-604-2-036', 'Hồn ma cờ vây nghìn năm tuổi.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HNG-01', 'AVAILABLE', CURRENT_DATE, 20000, 'Kệ D-3');

    -- 37. Death Parade
    -- (Tạm lấy dữ liệu ví dụ vì đây là anime gốc, nhưng có manga chuyển thể)
    INSERT INTO tac_gia (ten) VALUES ('Yuzuru Tachikawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Death Parade', '978-604-3-037', 'Trò chơi phán xét linh hồn tại quán bar.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DP-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ B-5');

    -- 38. Noragami (Vị thần lang thang)
    INSERT INTO tac_gia (ten) VALUES ('Adachitoka') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Noragami', '978-604-2-038', 'Vị thần nghèo rớt mồng tơi nhận làm mọi việc.', 2010, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NOR-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ C-7');

    -- 39. Soul Eater
    INSERT INTO tac_gia (ten) VALUES ('Atsushi Ohkubo') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Soul Eater', '978-604-2-039', 'Học viện vũ khí tử thần.', 2004, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
     INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SE-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ C-8');

    -- 40. Fire Force
    -- Tác giả Atsushi đã có
    -- INSERT INTO tac_gia (ten) VALUES ('Atsushi Ohkubo (2)') RETURNING id INTO v_tg_id;
	SELECT id INTO v_tg_id FROM tac_gia WHERE ten = 'Atsushi Ohkubo';
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Fire Force', '978-604-2-040', 'Đội cứu hỏa đặc biệt chống lại hiện tượng tự bốc cháy.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FF-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-15');

END $$;

DO $$
DECLARE
    v_nxb_kimdong INT;
    v_nxb_tre INT;
    v_nxb_ipm INT;
    v_tg_id INT;
    v_sach_id INT;
BEGIN
    -- Lấy ID NXB
    SELECT id INTO v_nxb_kimdong FROM nxb WHERE ten = 'NXB Kim Đồng';
    SELECT id INTO v_nxb_tre FROM nxb WHERE ten = 'NXB Trẻ';
    SELECT id INTO v_nxb_ipm FROM nxb WHERE ten = 'IPM';

    -- Thêm các Thể loại LN chuyên biệt nếu chưa có
    INSERT INTO the_loai (ten, mo_ta) VALUES
    ('Isekai', 'Chuyển sinh sang thế giới khác'),
    ('School Life', 'Học đường'),
    ('Romance', 'Tình cảm lãng mạn'),
    ('Harem', 'Nhiều nữ chính'),
    ('Magic', 'Phép thuật');

    -- =======================================================================
    -- DANH SÁCH 40 TRUYỆN (LIGHT NOVEL & ISEKAI) (ID từ 41 đến 80)
    -- =======================================================================

    -- 41. Sword Art Online (LN)
    INSERT INTO tac_gia (ten) VALUES ('Reki Kawahara') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Sword Art Online (LN)', '978-604-3-041', 'Game thủ kẹt trong thế giới game MMORPG.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SAO-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-A1');

    -- 42. Re:Zero kara Hajimeru Isekai Seikatsu (LN)
    INSERT INTO tac_gia (ten) VALUES ('Tappei Nagatsuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Re:Zero Bắt đầu lại ở thế giới khác từ số 0 (LN)', '978-604-3-042', 'Chuyển sinh với khả năng "Trở về từ cái chết".', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-R0-01', 'BORROWED', CURRENT_DATE, 120000, 'Kệ LN-A2');

    -- 43. Overlord (LN)
    INSERT INTO tac_gia (ten) VALUES ('Kugane Maruyama') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Overlord (LN)', '978-604-3-043', 'Nhân vật game bị kẹt trong thế giới mới với sức mạnh tối thượng.', 2010, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-OVL-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-A3');

    -- 44. Tensei Shitara Slime Datta Ken (LN)
    INSERT INTO tac_gia (ten) VALUES ('Fuse') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Về chuyện tôi chuyển sinh thành Slime (LN)', '978-604-3-044', 'Nhân viên văn phòng chết và tái sinh thành Slime.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SLIME-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-A4');

    -- 45. No Game No Life (LN)
    INSERT INTO tac_gia (ten) VALUES ('Yuu Kamiya') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'No Game No Life (LN)', '978-604-3-045', 'Hai anh em game thủ bị triệu hồi đến thế giới nơi mọi thứ được quyết định bằng game.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NGNL-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-A5');

    -- 46. Classroom of the Elite (LN)
    INSERT INTO tac_gia (ten) VALUES ('Shougo Kinugasa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Lớp học ưu việt (LN)', '978-604-3-046', 'Trường học ưu tú nơi mọi hành vi đều được tính điểm.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='School Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-COTE-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-B1');

    -- 47. Konosuba (LN)
    INSERT INTO tac_gia (ten) VALUES ('Natsume Akatsuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Konosuba (LN)', '978-604-4-047', 'Chuyển sinh hài hước với team bất tài.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KONO-01', 'AVAILABLE', CURRENT_DATE, 95000, 'Kệ LN-A6');

    -- 48. That Time I Got Reincarnated as a Slime (Manga)
    -- Tác giả Fuse đã có
    INSERT INTO tac_gia (ten) VALUES ('Taiki Kawakami') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Về chuyện tôi chuyển sinh thành Slime (Manga)', '978-604-2-048', 'Bản Manga chuyển thể từ Light Novel.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SLIMM-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ A-16');

    -- 49. Mushoku Tensei (LN)
    INSERT INTO tac_gia (ten) VALUES ('Rifujin na Magonote') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Mushoku Tensei: Thất nghiệp chuyển sinh (LN)', '978-604-3-049', 'Thất nghiệp 34 tuổi chuyển sinh thành đứa trẻ với ký ức cũ.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MT-01', 'AVAILABLE', CURRENT_DATE, 130000, 'Kệ LN-A7');

    -- 50. Spice and Wolf (LN)
    INSERT INTO tac_gia (ten) VALUES ('Isuna Hasekura') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Spice and Wolf (LN)', '978-604-3-050', 'Thương gia và nữ thần Sói đi du lịch.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Adventure'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SW-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-B2');

    -- 51. Đứa con của thời tiết (LN)
    INSERT INTO tac_gia (ten) VALUES ('Makoto Shinkai') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Đứa con của thời tiết (LN)', '978-604-3-051', 'Câu chuyện về cô gái có khả năng điều khiển thời tiết.', 2019, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-WTW-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-C1');

    -- 52. Your Name (LN)
    -- Tác giả Makoto Shinkai đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Your Name (LN)', '978-604-3-052', 'Hai người xa lạ trao đổi cơ thể qua giấc mơ.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YN-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-C2');

    -- 53. Goblin Slayer (LN)
    INSERT INTO tac_gia (ten) VALUES ('Kumo Kagyu') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Goblin Slayer (LN)', '978-604-4-053', 'Thợ săn chuyên diệt Goblin.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GS-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-A8');

    -- 54. Accel World (LN)
    -- Tác giả Reki Kawahara đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Reki Kawahara'), v_nxb_ipm, 'Accel World (LN)', '978-604-3-054', 'Game thực tế ảo tăng tốc suy nghĩ.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AW-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-A9');

    -- 55. Date A Live (LN)
    INSERT INTO tac_gia (ten) VALUES ('Koushi Tachibana') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Date A Live (LN)', '978-604-3-055', 'Hẹn hò với các tinh linh để cứu thế giới.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Harem'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DAL-01', 'AVAILABLE', CURRENT_DATE, 95000, 'Kệ LN-D1');

    -- 56. The Melancholy of Haruhi Suzumiya (LN)
    INSERT INTO tac_gia (ten) VALUES ('Nagaru Tanigawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Sự u sầu của Haruhi Suzumiya (LN)', '978-604-4-056', 'Cô gái có khả năng thay đổi thế giới theo cảm xúc.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HS-01', 'AVAILABLE', CURRENT_DATE, 80000, 'Kệ LN-B3');

    -- 57. The Devil is a Part-Timer! (LN)
    INSERT INTO tac_gia (ten) VALUES ('Satoshi Wagahara') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Ma vương đi làm thêm (LN)', '978-604-3-057', 'Ma vương bị kẹt ở Tokyo và làm nhân viên bán hàng.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DPT-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-A10');

    -- 58. Grimgar of Fantasy and Ash (LN)
    INSERT INTO tac_gia (ten) VALUES ('Ao Jyumonji') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Grimgar: Ảo ảnh và Tro tàn (LN)', '978-604-4-058', 'Nhóm người bị ném vào thế giới game mà không có ký ức.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GRM-01', 'AVAILABLE', CURRENT_DATE, 95000, 'Kệ LN-B4');

    -- 59. The Rising of the Shield Hero (LN)
    INSERT INTO tac_gia (ten) VALUES ('Aneko Yusagi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Sự trỗi dậy của Anh Hùng Khiên (LN)', '978-604-3-059', 'Anh hùng bị ruồng bỏ chiến đấu để cứu thế giới.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SHD-01', 'AVAILABLE', CURRENT_DATE, 120000, 'Kệ LN-A11');

    -- 60. Seishun Buta Yarou (LN)
    INSERT INTO tac_gia (ten) VALUES ('Hajime Kamoshida') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Tuổi trẻ lợn rừng không mơ thấy gái đẹp (LN)', '978-604-4-060', 'Giải quyết các hiện tượng siêu nhiên tuổi teen.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BUNNY-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-C3');

    -- 61. Boku no Kanojo ga Majimesugiru Sho-bitch na Ken (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Namiru Koshio') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bạn gái quá nghiêm túc với chuyện sh*bitch (Manga)', '978-604-4-061', 'Học sinh cố gắng hẹn hò với cô gái hoàn hảo.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BKG-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ D-4');

    -- 62. I want to eat your pancreas (LN)
    INSERT INTO tac_gia (ten) VALUES ('Yoru Sumino') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Tớ muốn ăn lụy tuyến tụy của cậu (LN)', '978-604-3-062', 'Câu chuyện cảm động về một cô gái mắc bệnh nan y.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-PWY-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-C4');

    -- 63. Rascal Does Not Dream of Bunny Girl Senpai (Manga)
    -- Tác giả Kamoshida đã có
    INSERT INTO tac_gia (ten) VALUES ('Tsukumo Asakusa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Cô gái thỏ và sự u sầu tuổi teen (Manga)', '978-604-4-063', 'Bản Manga chuyển thể từ LN (Seishun Buta Yarou).', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BGS-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ D-5');

    -- 64. That Time I Got Reincarnated as a Slime (Manga) - Phiên bản khác
    -- Tác giả Fuse đã có
    INSERT INTO tac_gia (ten) VALUES ('Mitz Vah') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Về chuyện tôi chuyển sinh thành Slime (Manga - bản ngoại truyện)', '978-604-2-064', 'Ngoại truyện hài hước về cuộc sống thường ngày của Rimuru.', 2017, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SLIMC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ D-6');

    -- 65. The Saga of Tanya the Evil (LN)
    INSERT INTO tac_gia (ten) VALUES ('Carlo Zen') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Tanya chiến ký (LN)', '978-604-3-065', 'Nhân viên văn phòng vô thần chuyển sinh thành cô gái lính ma pháp.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Isekai'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TANYA-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-A12');

    -- 66. Eighty-Six (LN)
    INSERT INTO tac_gia (ten) VALUES ('Asato Asato') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, '86: Eighty-Six (LN)', '978-604-3-066', 'Cuộc chiến của những người lính bị phân biệt đối xử.', 2017, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-86-01', 'AVAILABLE', CURRENT_DATE, 120000, 'Kệ LN-B5');

    -- 67. The Irregular at Magic High School (LN)
    INSERT INTO tac_gia (ten) VALUES ('Tsutomu Satō') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bất thường tại Học viện Ma thuật (LN)', '978-604-4-067', 'Thiên tài ma thuật ẩn mình trong vỏ bọc.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Magic'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MIHS-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-D2');

    -- 68. The Garden of Words (LN)
    -- Tác giả Makoto Shinkai đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Makoto Shinkai'), v_nxb_ipm, 'Khu vườn ngôn từ (LN)', '978-604-3-068', 'Câu chuyện tình lãng mạn trong những ngày mưa.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GOW-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-C5');

    -- 69. Goblin Slayer (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Kōsuke Kurose') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Goblin Slayer (Manga)', '978-604-4-069', 'Bản Manga chuyển thể.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GSL-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ A-17');

    -- 70. Is It Wrong to Try to Pick Up Girls in a Dungeon? (LN)
    INSERT INTO tac_gia (ten) VALUES ('Fujino Ōmori') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'DanMachi: Liệu có sai khi cố gắng kiếm tìm cô gái trong Dungeon? (LN)', '978-604-3-070', 'Thám hiểm Dungeon để trở nên mạnh hơn.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DMN-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-A13');

    -- 71. Kaguya-sama: Love Is War (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Aka Akasaka') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Kaguya-sama: Cuộc chiến tỏ tình (Manga)', '978-604-2-071', 'Cuộc đấu trí giữa hai học sinh thiên tài.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KGY-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ D-7');

    -- 72. Zaregoto Series (LN)
    INSERT INTO tac_gia (ten) VALUES ('Nisio Isin') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Zaregoto Series (LN)', '978-604-3-072', 'Series trinh thám tâm lý của tác giả Monogatari.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ZAR-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-B6');

    -- 73. Cát Trắng Mùa Hè (LN)
    INSERT INTO tac_gia (ten) VALUES ('Kana Akatsuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Cát Trắng Mùa Hè (LN)', '978-604-3-073', 'Tình cảm lãng mạn nhẹ nhàng.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CW-01', 'AVAILABLE', CURRENT_DATE, 80000, 'Kệ LN-C6');

    -- 74. Sword Art Online Progressive (LN)
    -- Tác giả Reki Kawahara đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Reki Kawahara'), v_nxb_ipm, 'Sword Art Online Progressive (LN)', '978-604-3-074', 'Kể lại Aincrad từ đầu theo thứ tự từng tầng.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SAOP-01', 'AVAILABLE', CURRENT_DATE, 120000, 'Kệ LN-A14');

    -- 75. Rascal Does Not Dream of Petite Devil Kohai (LN)
    -- Tác giả Hajime Kamoshida đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Hajime Kamoshida'), v_nxb_tre, 'Sự u sầu của cô gái quỷ nhỏ hậu bối (LN)', '978-604-4-075', 'Một phần của series Seishun Buta Yarou.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-PD-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-C7');

    -- 76. No Game No Life Desu! (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Kazuya Yuizaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'No Game No Life Desu! (Manga)', '978-604-3-076', 'Bản Manga ngoại truyện của NGNL.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NGNLD-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ D-8');

    -- 77. Toaru Majutsu no Index (LN)
    INSERT INTO tac_gia (ten) VALUES ('Kazuma Kamachi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'A Certain Magical Index (LN)', '978-604-3-077', 'Thành phố Học viện, nơi khoa học và phép thuật giao thoa.', 2004, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Magic'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TMAI-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-D3');

    -- 78. Mahouka Koukou no Rettousei (Manga)
    -- Tác giả Tsutomu Satō đã có
    INSERT INTO tac_gia (ten) VALUES ('Gin Amau') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bất thường tại Học viện Ma thuật (Manga)', '978-604-4-078', 'Bản Manga chuyển thể.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MIHSM-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ A-18');

    -- 79. Cô gái đến từ bên kia (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Nagabe') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Cô gái đến từ bên kia', '978-604-4-079', 'Câu chuyện cổ tích Gothic về cô gái và sinh vật bị nguyền rủa.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CTBTK-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ D-9');

    -- 80. Cô bé và cây cầu (LN)
    INSERT INTO tac_gia (ten) VALUES ('Fumiya Washio') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Cô bé và cây cầu (LN)', '978-604-3-080', 'Một câu chuyện siêu nhiên và lãng mạn.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CBC-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-C8');
END $$;

DO $$
DECLARE
    v_nxb_kimdong INT;
    v_nxb_tre INT;
    v_nxb_ipm INT;
    v_tg_id INT;
    v_sach_id INT;
BEGIN
    -- Lấy ID NXB
    SELECT id INTO v_nxb_kimdong FROM nxb WHERE ten = 'NXB Kim Đồng';
    SELECT id INTO v_nxb_tre FROM nxb WHERE ten = 'NXB Trẻ';
    SELECT id INTO v_nxb_ipm FROM nxb WHERE ten = 'IPM';

    -- Thêm các Thể loại chuyên biệt nếu chưa có
    INSERT INTO the_loai (ten, mo_ta) VALUES
    ('Shoujo', 'Dành cho thiếu nữ'),
    ('Slice of Life', 'Đời thường'),
    ('Josei', 'Dành cho phụ nữ trưởng thành'),
    ('Historical', 'Lịch sử');

    -- =======================================================================
    -- DANH SÁCH 40 TRUYỆN (SHOJO, ROMANCE & SLICE OF LIFE) (ID từ 81 đến 120)
    -- =======================================================================

    -- 81. Yona - Công chúa Bình Minh (Shoujo/Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Mizuho Kusanagi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Yona - Công chúa Bình Minh', '978-604-2-081', 'Hành trình của công chúa bị lưu đày đi tìm 4 Rồng Thần.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Shoujo'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YONA-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-1');

    -- 82. Chàng Quản Gia (Comedy/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Kenjiro Hata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Chàng Quản Gia', '978-604-2-082', 'Cuộc sống quản gia và cô chủ giàu có.', 2004, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CQG-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-2');

    -- 83. Kimi ni Todoke (Shoujo/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Karuho Shiina') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Kimi ni Todoke - Gửi đến cậu', '978-604-2-083', 'Cô gái bị hiểu lầm là ma nữ và tình yêu học đường.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KNTD-01', 'BORROWED', CURRENT_DATE, 25000, 'Kệ E-3');

    -- 84. Orange (Shoujo/Sci-Fi)
    INSERT INTO tac_gia (ten) VALUES ('Ichigo Takano') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Orange', '978-604-4-084', 'Thư từ tương lai cố gắng thay đổi quá khứ.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ORG-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ E-4');

    -- 85. Nisekoi (Shounen/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Naoshi Komi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Nisekoi - Giả tình', '978-604-2-085', 'Cặp đôi giả vờ hẹn hò để ngăn chiến tranh băng đảng.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NSK-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ F-1');

    -- 86. Your Lie in April (Shounen/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Naoshi Arakawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Lời nói dối tháng Tư của tôi', '978-604-2-086', 'Câu chuyện về âm nhạc và mất mát.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YLA-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ F-2');

    -- 87. Fruits Basket (Shoujo/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Natsuki Takaya') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Fruits Basket', '978-604-2-087', 'Cô gái sống cùng gia đình bị lời nguyền 12 con giáp.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FB-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ E-5');

    -- 88. Skip Beat! (Shoujo/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Yoshiki Nakamura') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Skip Beat!', '978-604-4-088', 'Cô gái trả thù bạn trai bằng cách gia nhập giới giải trí.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SB-01', 'AVAILABLE', CURRENT_DATE, 22000, 'Kệ E-6');

    -- 89. Ouran High School Host Club (Shoujo/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Bisco Hatori') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Ouran High School Host Club', '978-604-4-089', 'Cô gái giả trai tham gia CLB Host của trường quý tộc.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-OHSHC-01', 'AVAILABLE', CURRENT_DATE, 20000, 'Kệ F-3');

    -- 90. Wotakoi: Love is Hard for Otaku (Josei/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Fujita') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Wotakoi: Tình yêu thật khó cho Otaku', '978-604-3-090', 'Câu chuyện tình công sở của những người hâm mộ anime/game.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Josei'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-WOTA-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ F-4');

    -- 91. A Silent Voice (Shounen/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Yoshitoki Ōima') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Dáng hình Thanh Âm', '978-604-2-091', 'Câu chuyện về sự bắt nạt và chuộc lỗi.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ASV-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ F-5');

    -- 92. Erased (Seinen/Mystery)
    INSERT INTO tac_gia (ten) VALUES ('Kei Sanbe') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Thị trấn chỉ mình tôi không có', '978-604-4-092', 'Du hành thời gian để ngăn chặn vụ án giết người.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ERA-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ B-6');

    -- 93. Fruits Basket Another (Shoujo/Slice of Life)
    -- Tác giả Natsuki Takaya đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Natsuki Takaya'), v_nxb_kimdong, 'Fruits Basket Another', '978-604-2-093', 'Phần tiếp theo của Fruits Basket, tập trung vào thế hệ con cháu.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FBA-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-7');

    -- 94. Tokyo Ghoul (Seinen/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Sui Ishida') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Tokyo Ghoul', '978-604-4-094', 'Sinh viên trở thành bán Ghoul và chiến đấu để tồn tại.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TG-01', 'BORROWED', CURRENT_DATE, 30000, 'Kệ B-7');

    -- 95. Say I Love You (Shoujo/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Kanae Hazuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Say I Love You', '978-604-4-095', 'Câu chuyện về cô gái hướng nội và chàng trai nổi tiếng nhất trường.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SILY-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-8');

    -- 96. Koe no Katachi (Manga) - (Dáng Hình Thanh Âm)
    -- Tác giả Yoshitoki Ōima đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Yoshitoki Ōima'), v_nxb_kimdong, 'Koe no Katachi (Dáng Hình Thanh Âm)', '978-604-2-096', 'Bản gốc của Lời nói dối tháng Tư.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KNK-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ F-6');

    -- 97. Tsubasa: Reservoir Chronicle (Shounen/Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('CLAMP') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Tsubasa: Reservoir Chronicle', '978-604-2-097', 'Du hành qua các thế giới để tìm ký ức công chúa.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TRC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ F-7');

    -- 98. Chobits (Seinen/Sci-Fi)
    -- Tác giả CLAMP đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='CLAMP'), v_nxb_tre, 'Chobits', '978-604-4-098', 'Câu chuyện về cô gái người máy (Persocom).', 2000, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CHO-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ D-10');

    -- 99. Given (Boys' Love/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Natsuki Kizu') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Given', '978-604-4-099', 'Câu chuyện tình yêu và âm nhạc giữa các thành viên ban nhạc.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GIV-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ F-8');

    -- 100. Nana (Josei/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Ai Yazawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Nana', '978-604-4-100', 'Cuộc sống và tình bạn của hai cô gái cùng tên Nana.', 1999, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Josei'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NANA-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-9');

    -- 101. Hiyokoi (Shoujo/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Moe Yukimaru') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hiyokoi', '978-604-2-101', 'Chuyện tình học đường giữa cô gái nhút nhát và chàng trai cao nhất trường.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HYK-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-10');

    -- 102. Natsume Yuujinchou (Shoujo/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Yuki Midorikawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hữu Nhân Sổ của Natsume', '978-604-2-102', 'Cậu bé nhìn thấy yêu quái và cuốn sổ quyền năng.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NY-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ G-1');

    -- 103. Sayonara, Football (Sports/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Naoshi Arakawa (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Sayonara, Football', '978-604-2-103', 'Câu chuyện về nữ cầu thủ bóng đá quyết tâm chứng minh bản thân.', 2010, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SFB-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ S-5');

    -- 104. Honey and Clover (Josei/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Chica Umino') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Honey and Clover', '978-604-4-104', 'Cuộc sống đại học và tìm kiếm mục đích sống.', 2000, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Josei'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ F-9');

    -- 105. Cross Game (Shounen/Sports)
    INSERT INTO tac_gia (ten) VALUES ('Mitsuru Adachi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Cross Game', '978-604-2-105', 'Bóng chày và tình bạn/tình yêu sâu sắc.', 2005, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CG-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ S-6');

    -- 106. Hibi Chouchou (Shoujo/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Sui Morishita') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hibi Chouchou', '978-604-2-106', 'Mối tình câm lặng giữa cô gái xinh đẹp và chàng trai nhút nhát.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HBC-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-11');

    -- 107. Vinland Saga (Seinen/Historical)
    INSERT INTO tac_gia (ten) VALUES ('Makoto Yukimura') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Vinland Saga', '978-604-4-107', 'Câu chuyện về chiến binh Viking và hành trình tìm kiếm Vinland.', 2005, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-VS-01', 'AVAILABLE', CURRENT_DATE, 45000, 'Kệ G-2');

    -- 108. March Comes in Like a Lion (Seinen/Slice of Life)
    -- Tác giả Chica Umino đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Chica Umino'), v_nxb_tre, 'Tháng 3 đến như một người hùng', '978-604-4-108', 'Câu chuyện về kỳ thủ shogi cô đơn và gia đình ba chị em.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-LION-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ G-3');

    -- 109. Nichijou (Comedy/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Keiichi Arawi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Nichijou (Đời sống thường nhật)', '978-604-2-109', 'Những tình huống kỳ quặc và hài hước ở trường học.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NJ-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ F-10');

    -- 110. Your Name Another Side: Earthbound (LN)
    INSERT INTO tac_gia (ten) VALUES ('Kanoh Arata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Your Name Another Side: Earthbound (LN)', '978-604-3-110', 'Ngoại truyện Your Name dưới góc nhìn của các nhân vật phụ.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YNAS-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-C9');

    -- 111. Haikyuu!! Novel (LN)
    INSERT INTO tac_gia (ten) VALUES ('Haruichi Furudate (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Haikyuu!! Tiểu Thuyết', '978-604-2-111', 'Phiên bản tiểu thuyết của bộ truyện bóng chuyền.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HAIN-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ S-7');

    -- 112. Nữ Sinh Trung Học (Slice of Life/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Kaori Minami') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Nữ Sinh Trung Học', '978-604-4-112', 'Những câu chuyện đời thường và ngây ngô của các nữ sinh.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NSTH-01', 'AVAILABLE', CURRENT_DATE, 20000, 'Kệ E-12');

    -- 113. Given - Bị Bỏ Rơi (Manga)
    -- Tác giả Natsuki Kizu đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Natsuki Kizu'), v_nxb_tre, 'Given - Bị Bỏ Rơi', '978-604-4-113', 'Tập truyện ngắn liên quan đến các nhân vật trong Given.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GIVB-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ F-11');

    -- 114. Kono Oto Tomare! (Shounen/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Amyu') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Âm thanh của chúng ta!', '978-604-2-114', 'Câu lạc bộ nhạc cụ truyền thống Nhật Bản Koto.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KOT-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ G-4');

    -- 115. Bloom Into You (Yuri/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Nio Nakatani') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Dù cho chúng ta trưởng thành', '978-604-3-115', 'Tình yêu học đường giữa hai cô gái.', 2015, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BIY-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ F-12');

    -- 116. Hyouka: You can't escape (LN)
    INSERT INTO tac_gia (ten) VALUES ('Honobu Yonezawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Hyouka: Lời nguyền băng giá', '978-604-3-116', 'Câu lạc bộ Văn học cổ điển giải quyết các bí ẩn nhỏ.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HYO-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ LN-D4');

    -- 117. Your Lie in April (Novel)
    -- Tác giả Naoshi Arakawa đã có
    INSERT INTO tac_gia (ten) VALUES ('Yui Tokiumi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Lời nói dối tháng Tư của tôi (Tiểu Thuyết)', '978-604-2-117', 'Phiên bản tiểu thuyết của câu chuyện buồn này.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YLANT-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ G-5');

    -- 118. My Dress-Up Darling (Seinen/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Shinichi Fukuda') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'My Dress-Up Darling', '978-604-2-118', 'Chàng trai mê búp bê và cô gái mê cosplay.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MDD-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ E-13');

    -- 119. A Place Further Than the Universe (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Yuzuru Tachikawa (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Hành trình đến Nam Cực', '978-604-3-119', 'Bốn cô gái trung học quyết tâm đi đến Nam Cực.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Adventure'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-APF-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ G-6');

    -- 120. Monthly Girls' Nozaki-kun (Shounen/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Izumi Tsubaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Nozaki-kun, chàng họa sĩ shoujo', '978-604-2-120', 'Cô gái tỏ tình nhầm với họa sĩ manga shoujo nổi tiếng.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NGNK-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-14');

END $$;

DO $$
DECLARE
    v_nxb_kimdong INT;
    v_nxb_tre INT;
    v_nxb_ipm INT;
    v_tg_id INT;
    v_sach_id INT;
BEGIN
    -- Lấy ID NXB
    SELECT id INTO v_nxb_kimdong FROM nxb WHERE ten = 'NXB Kim Đồng';
    SELECT id INTO v_nxb_tre FROM nxb WHERE ten = 'NXB Trẻ';
    SELECT id INTO v_nxb_ipm FROM nxb WHERE ten = 'IPM';

    -- Thêm các Thể loại chuyên biệt nếu chưa có
    INSERT INTO the_loai (ten, mo_ta) VALUES
    ('Seinen', 'Dành cho nam giới trưởng thành'),
    ('Mecha', 'Robot chiến đấu'),
    ('Post-Apocalyptic', 'Hậu tận thế');

    -- =======================================================================
    -- DANH SÁCH 40 TRUYỆN MỚI (SEINEN, HORROR, CLASSICS) (ID từ 121 đến 160)
    -- =======================================================================

    -- 121. Monster (Seinen/Psychological)
    INSERT INTO tac_gia (ten) VALUES ('Naoki Urasawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Monster', '978-604-2-121', 'Bác sĩ truy đuổi bệnh nhân bí ẩn biến thành tên giết người hàng loạt.', 1994, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MONS-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ H-1');

    -- 122. Pluto (Seinen/Sci-Fi)
    -- Tác giả Naoki Urasawa đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Naoki Urasawa'), v_nxb_kimdong, 'Pluto', '978-604-2-122', 'Tái hiện lại Astro Boy theo phong cách trinh thám noir.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-PLUT-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ H-2');

    -- 123. Uzumaki (Horror)
    INSERT INTO tac_gia (ten) VALUES ('Junji Ito') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Xoắn Ốc', '978-604-4-123', 'Một thị trấn bị ám bởi những vòng xoáy.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-UZU-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ H-3');

    -- 124. Tomie (Horror)
    -- Tác giả Junji Ito đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Junji Ito'), v_nxb_tre, 'Tomie', '978-604-4-124', 'Câu chuyện về cô gái bí ẩn có khả năng khiến mọi người điên cuồng.', 1987, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TME-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ H-4');

    -- 125. Berserk (Seinen/Dark Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Kentaro Miura') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Berserk', '978-604-4-125', 'Chiến binh Guts và hành trình báo thù trong thế giới Dark Fantasy.', 1989, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BRSK-01', 'AVAILABLE', CURRENT_DATE, 45000, 'Kệ H-5');

    -- 126. Neon Genesis Evangelion (Mecha/Psychological)
    INSERT INTO tac_gia (ten) VALUES ('Yoshiyuki Sadamoto') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Neon Genesis Evangelion', '978-604-2-126', 'Thế giới chống lại Thiên sứ bằng những cỗ máy khổng lồ (Eva).', 1995, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mecha'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NGE-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ H-6');

    -- 127. Vagabond (Seinen/Historical)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Takehiko Inoue'), v_nxb_kimdong, 'Vagabond', '978-604-2-127', 'Tiểu sử hư cấu về kiếm khách Miyamoto Musashi.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-VGAB-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ H-7');

    -- 128. I Am a Hero (Seinen/Horror)
    INSERT INTO tac_gia (ten) VALUES ('Kengo Hanazawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'I Am a Hero', '978-604-4-128', 'Thế giới bị đại dịch zombie tấn công.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-IAAH-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ H-8');

    -- 129. Akira (Sci-Fi/Post-Apocalyptic)
    INSERT INTO tac_gia (ten) VALUES ('Katsuhiro Otomo') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Akira', '978-604-2-129', 'Neo-Tokyo hậu tận thế và những đứa trẻ có sức mạnh tâm linh.', 1982, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Post-Apocalyptic'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AKIRA-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ I-1');

    -- 130. Psycho-Pass (Sci-Fi/Psychological)
    INSERT INTO tac_gia (ten) VALUES ('Akira Amano') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Psycho-Pass (Manga)', '978-604-3-130', 'Tương lai nơi tội ác được đo lường trước khi xảy ra.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-PP-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ I-2');

    -- 131. The Promised Neverland (Manga)
    -- Tác giả Kaiu Shirai đã có (ID 27)
    INSERT INTO tac_gia (ten) VALUES ('Posuka Demizu') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'The Promised Neverland', '978-604-2-131', 'Các cô nhi cố gắng thoát khỏi trang trại bí ẩn.', 2016, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TPNM-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-19');

    -- 132. The Flowers of Evil (Psychological/Drama)
    INSERT INTO tac_gia (ten) VALUES ('Shūzō Oshimi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Aku no Hana - Những đóa hoa ác', '978-604-4-132', 'Câu chuyện tâm lý phức tạp về tuổi mới lớn.', 2009, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TFOE-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ I-3');

    -- 133. Gantz (Sci-Fi/Action)
    INSERT INTO tac_gia (ten) VALUES ('Hiroya Oku') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Gantz', '978-604-4-133', 'Những người chết được triệu hồi để chiến đấu với người ngoài hành tinh.', 2000, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GANTZ-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ I-4');

    -- 134. Dorohedoro (Action/Dark Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Q Hayashida') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Dorohedoro', '978-604-4-134', 'Thế giới hỗn loạn, nơi một người đàn ông tìm kiếm kẻ đã biến đầu anh thành thằn lằn.', 2000, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DHD-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ I-5');

    -- 135. Made in Abyss (Adventure/Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Akihito Tsukushi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Made in Abyss', '978-604-2-135', 'Hành trình khám phá một hố sâu bí ẩn và nguy hiểm.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Adventure'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MIA-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ J-1');

    -- 136. Tokyo Ghoul:re (Seinen/Supernatural)
    -- Tác giả Sui Ishida đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Sui Ishida'), v_nxb_tre, 'Tokyo Ghoul:re', '978-604-4-136', 'Phần tiếp theo của Tokyo Ghoul.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TGR-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ B-8');

    -- 137. 20th Century Boys (Seinen/Mystery)
    -- Tác giả Naoki Urasawa đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Naoki Urasawa'), v_nxb_kimdong, '20th Century Boys', '978-604-2-137', 'Nhóm bạn thời thơ ấu cứu thế giới khỏi một giáo phái bí ẩn.', 1999, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-20CB-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ J-2');

    -- 138. Blade of the Immortal (Seinen/Historical)
    INSERT INTO tac_gia (ten) VALUES ('Hiroaki Samura') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Lưỡi Kiếm Bất Tử', '978-604-4-138', 'Kiếm sĩ bất tử chiến đấu để chuộc tội.', 1993, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BOTI-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ J-3');

    -- 139. Claymore (Shounen/Dark Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Norihiro Yagi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Claymore', '978-604-2-139', 'Nữ chiến binh nửa người nửa yêu chiến đấu chống lại Yoma.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CLM-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ J-4');

    -- 140. School-Live! (Horror/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Norimitsu Kaihou') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'School-Live!', '978-604-4-140', 'Những cô gái cố gắng sống sót trong một trường học bị bao vây bởi zombie.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SL-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ J-5');
    
    -- 141. Slam Dunk (Sports)
    -- Tác giả Takehiko Inoue đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Takehiko Inoue'), v_nxb_kimdong, 'Slam Dunk (Bản Deluxe)', '978-604-2-141', 'Bộ truyện bóng rổ kinh điển của Inoue.', 1990, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SDD-01', 'AVAILABLE', CURRENT_DATE, 60000, 'Kệ S-8');

    -- 142. Oyasumi Punpun (Seinen/Psychological)
    INSERT INTO tac_gia (ten) VALUES ('Inio Asano') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Oyasumi Punpun - Chúc ngủ ngon Punpun', '978-604-4-142', 'Câu chuyện trưởng thành u ám và tâm lý.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-OPP-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ H-9');

    -- 143. Goodnight Punpun (Manga - Phiên bản khác)
    -- Tác giả Inio Asano đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Inio Asano'), v_nxb_tre, 'Goodnight Punpun - Tái bản', '978-604-4-143', 'Bản tái bản chất lượng cao hơn.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GNP-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ H-10');

    -- 144. Chainsaw Man (Light Novel)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Tatsuki Fujimoto'), v_nxb_kimdong, 'Chainsaw Man: Buddy Stories (LN)', '978-604-2-144', 'Tập truyện ngắn Light Novel của Chainsaw Man.', 2021, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CSMLN-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-A15');

    -- 145. Ajin: Demi-Human (Seinen/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Gamon Sakurai') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Ajin: Người Bán Nhân', '978-604-4-145', 'Loài người bất tử bị săn lùng.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AJIN-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ I-6');

    -- 146. Kiseijuu (Parasyte) (Sci-Fi/Horror)
    INSERT INTO tac_gia (ten) VALUES ('Hitoshi Iwaaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Kiseijuu - Ký Sinh Trùng', '978-604-2-146', 'Sinh vật ngoài hành tinh chiếm lấy cơ thể con người.', 1988, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-PAR-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ I-7');

    -- 147. A Lull in the Sea (Slice of Life/Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Mari Okada') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Nagi-Asu: A Lull in the Sea (Manga)', '978-604-3-147', 'Câu chuyện về những người sống dưới biển và trên mặt đất.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NAGI-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ G-7');

    -- 148. Vinland Saga (Manga - Bản đặc biệt)
    -- Tác giả Makoto Yukimura đã có
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Makoto Yukimura'), v_nxb_tre, 'Vinland Saga (Bản Boxset)', '978-604-4-148', 'Bản đặc biệt của bộ truyện Viking.', 2005, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-VSBOX-01', 'AVAILABLE', CURRENT_DATE, 100000, 'Kệ G-8');

    -- 149. Chi’s Sweet Home (Slice of Life/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Konami Kanata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Chi - Chú Mèo Dễ Thương', '978-604-2-149', 'Cuộc sống hàng ngày của chú mèo con lạc mẹ.', 2004, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CHI-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ J-6');

    -- 150. Yotsuba&! (Slice of Life/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Kiyohiko Azuma') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Yotsuba&!', '978-604-2-150', 'Cuộc sống thường nhật của cô bé Yotsuba 5 tuổi.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-YOT-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ J-7');

    -- 151. Shigurui (Seinen/Historical)
    INSERT INTO tac_gia (ten) VALUES ('Takayuki Yamaguchi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Shigurui', '978-604-4-151', 'Câu chuyện về hai kiếm sĩ bị thương tật nặng nề trong cuộc chiến Samurai tàn khốc.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SHI-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ J-8');

    -- 152. Devilman (Horror/Action)
    INSERT INTO tac_gia (ten) VALUES ('Go Nagai') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Devilman', '978-604-2-152', 'Nam sinh hợp thể với quỷ để chiến đấu bảo vệ nhân loại.', 1972, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Horror'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DM-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ I-8');

    -- 153. Doraemon (Bản màu)
    -- Tác giả Fujiko F. Fujio đã có (ID 5)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Fujiko F. Fujio'), v_nxb_kimdong, 'Doraemon Truyện Dài (Bản Màu)', '978-604-2-153', 'Phiên bản truyện dài Doraemon chất lượng cao.', 1980, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DMC-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ C-5');

    -- 154. Maison Ikkoku (Romance/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Rumiko Takahashi (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Maison Ikkoku', '978-604-4-154', 'Câu chuyện lãng mạn về chàng sinh viên và bà chủ nhà trọ xinh đẹp.', 1980, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MIK-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ E-15');

    -- 155. Kindaichi Case Files (Mystery)
    INSERT INTO tac_gia (ten) VALUES ('Seimaru Amagi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Thám tử Kindaichi', '978-604-2-155', 'Cháu trai của thám tử nổi tiếng giải quyết các vụ án bí ẩn.', 1992, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KIN-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ C-6');

    -- 156. Initial D (Sports/Action)
    INSERT INTO tac_gia (ten) VALUES ('Shuichi Shigeno') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Initial D', '978-604-4-156', 'Cuộc đua xe drift trên núi của Takumi Fujiwara.', 1995, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ID-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ S-9');

    -- 157. Trigun (Action/Sci-Fi)
    INSERT INTO tac_gia (ten) VALUES ('Yasuhiro Nightow') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Trigun', '978-604-2-157', 'Hành trình của Vash the Stampede, tay súng huyền thoại.', 1995, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TRI-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-20');

    -- 158. Shingeki no Kyojin (Before the Fall) (LN)
    INSERT INTO tac_gia (ten) VALUES ('Ryō Suzukaze') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Đại Chiến Titan: Trước Thời Khắc Sụp Đổ (LN)', '978-604-4-158', 'Tiền truyện Light Novel của Attack on Titan.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AOTLN-01', 'AVAILABLE', CURRENT_DATE, 90000, 'Kệ LN-A16');

    -- 159. Black Butler (Shounen/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Yana Toboso') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hắc Quản Gia', '978-604-2-159', 'Quản gia ác quỷ phục vụ một cậu bé quý tộc ở Anh.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BB-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ I-9');

    -- 160. Aria (Slice of Life/Sci-Fi)
    INSERT INTO tac_gia (ten) VALUES ('Kozue Amano') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Aria', '978-604-4-160', 'Cuộc sống yên bình của những cô gái lái thuyền Gondola ở sao Hỏa.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ARIA-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ J-9');

END $$;

-- Các NXB bổ sung tạm thời
    INSERT INTO nxb (ten, dia_chi, email, dien_thoai) VALUES
    ('NXB Văn Học', 'Hà Nội', 'vh@nxb.vn', '02439434732') , -- ID 4
    ('NXB Đà Nẵng', 'Đà Nẵng', 'dn@nxb.vn', '02363555999'); -- ID 5

DO $$
DECLARE
    v_nxb_kimdong INT;
    v_nxb_tre INT;
    v_nxb_ipm INT;
    v_nxb_vh INT;
    v_nxb_dn INT;
    v_tg_id INT;
    v_sach_id INT;
BEGIN
    -- Lấy ID NXB (Đã có)
    SELECT id INTO v_nxb_kimdong FROM nxb WHERE ten = 'NXB Kim Đồng';
    SELECT id INTO v_nxb_tre FROM nxb WHERE ten = 'NXB Trẻ';
    SELECT id INTO v_nxb_ipm FROM nxb WHERE ten = 'IPM';
    SELECT id INTO v_nxb_vh FROM nxb WHERE ten = 'NXB Văn Học';
    SELECT id INTO v_nxb_dn FROM nxb WHERE ten = 'NXB Đà Nẵng';

	-- Thêm các Thể loại chuyên biệt nếu chưa có
    INSERT INTO the_loai (ten, mo_ta) VALUES
    ('Ecchi', 'Nội dung người lớn nhẹ'),
    ('Wuxia', 'Kiếm hiệp Trung Quốc'),
    ('Martial Arts', 'Võ thuật'),
    ('Gore', 'Máu me, bạo lực'),
    ('Suspense', 'Hồi hộp'),
	('Artbook', 'Sách tranh');

    -- =======================================================================
    -- DANH SÁCH 40 TRUYỆN MỚI, KHÔNG TRÙNG LẶP (ID từ 161 đến 200)
    -- =======================================================================

    -- 161. The Ancient Magus' Bride (Fantasy/Slice of Life)
    INSERT INTO tac_gia (ten) VALUES ('Kore Yamazaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Cô Dâu Pháp Sư Cổ Đại', '978-604-2-161', 'Câu chuyện tình lãng mạn giữa cô gái người và pháp sư đầu hươu.', 2013, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-AMB-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-1');

    -- 162. D.Gray-man (Action/Supernatural)
    INSERT INTO tac_gia (ten) VALUES ('Katsura Hoshino') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'D.Gray-man', '978-604-4-162', 'Nhà trừ tà Allen Walker chiến đấu chống lại Millennium Earl.', 2004, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DGM-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ L-2');

    -- 163. Land of the Lustrous (Sci-Fi/Fantasy)
    INSERT INTO tac_gia (ten) VALUES ('Haruko Ichikawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Hōseki no Kuni - Vùng Đất Của Các Viên Đá', '978-604-2-163', 'Các sinh vật đá quý chiến đấu chống lại người mặt trăng.', 2012, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-LOL-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-3');

    -- 164. Bokura ga Ita (Shoujo/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Yuki Obata') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bokura ga Ita - Chúng Ta Đã Ở Đó', '978-604-4-164', 'Chuyện tình lãng mạn đầy nước mắt ở trường trung học.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BGI-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ E-20');

    -- 165. Grand Blue (Seinen/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Kenji Inoue') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Grand Blue Dreaming', '978-604-2-165', 'Cuộc sống điên rồ và hài hước của sinh viên trong câu lạc bộ lặn.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GBD-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-4');

    -- 166. School Rumble (Comedy/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Jin Kobayashi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'School Rumble', '978-604-4-166', 'Câu chuyện hài lãng mạn phức tạp trong trường học.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SR-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ L-5');

    -- 167. Code Geass: Lelouch of the Rebellion (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Goro Taniguchi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Code Geass: Lelouch Phản Công', '978-604-2-167', 'Hoàng tử lưu vong lãnh đạo cuộc nổi dậy bằng sức mạnh Geass.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CGR-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-6');

    -- 168. Ghost in the Shell (Sci-Fi/Cyberpunk)
    INSERT INTO tac_gia (ten) VALUES ('Masamune Shirow') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Ghost in the Shell - Vỏ Bọc Ma', '978-604-4-168', 'Thế giới Cyberpunk nơi con người có thể cấy ghép cơ thể máy móc.', 1989, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GITS-01', 'AVAILABLE', CURRENT_DATE, 40000, 'Kệ L-7');

    -- 169. Nichijou (Manga) (Đã có trong list user nhưng là phiên bản Manga để thêm vào)
    -- Tác giả Keiichi Arawi đã có (ID 114)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Keiichi Arawi'), v_nxb_kimdong, 'Nichijou (Đời sống thường nhật) - Manga', '978-604-2-169', 'Manga hài hước siêu thực về cuộc sống học đường.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NJM-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ A-23');

    -- 170. Skip Beat! (Shoujo/Comedy)
    -- Tác giả Yoshiki Nakamura đã có (ID 93)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Yoshiki Nakamura'), v_nxb_tre, 'Skip Beat!', '978-604-4-170', 'Cô gái báo thù người bạn thời thơ ấu bằng cách gia nhập giới giải trí.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Shoujo'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SKB-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ E-21');

    -- 171. Kimi ni Todoke (Manga)
    -- Tác giả Karuho Shiina đã có (ID 88)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Karuho Shiina'), v_nxb_kimdong, 'Kimi ni Todoke - Gửi đến cậu', '978-604-2-171', 'Cô gái Sawako bị hiểu lầm và hành trình kết bạn.', 2006, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KNT-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-22');

    -- 172. Uzaki-chan Wants to Hang Out! (Ecchi/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Take') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Uzaki-chan muốn đi chơi!', '978-604-4-172', 'Cô gái ồn ào cố gắng làm bạn với senpai hướng nội.', 2017, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Ecchi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-UZAKI-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-8');

    -- 173. The Vision of Escaflowne (Fantasy/Mecha)
    INSERT INTO tac_gia (ten) VALUES ('Shoji Kawamori') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Escaflowne', '978-604-2-173', 'Cô gái được đưa đến hành tinh Gaea đầy ma thuật và robot khổng lồ.', 1996, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mecha'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ESCA-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-9');

    -- 174. Legend of the Galactic Heroes (LN)
    INSERT INTO tac_gia (ten) VALUES ('Yoshiki Tanaka') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Huyền Thoại Anh Hùng Ngân Hà (LN)', '978-604-3-174', 'Sử thi không gian về cuộc chiến giữa hai thiên tài quân sự.', 1982, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-LOTGHLN-01', 'AVAILABLE', CURRENT_DATE, 110000, 'Kệ LN-F1');

    -- 175. Kageyama-kun no Himitsu (Shoujo/Romance)
    INSERT INTO tac_gia (ten) VALUES ('Kaori Hoshiya') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bí Mật của Kageyama-kun', '978-604-4-175', 'Tuyển tập truyện ngắn Shoujo lãng mạn.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KHM-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ E-23');

    -- 176. Mushishi (Artbook)
    INSERT INTO tac_gia (ten) VALUES ('Yuki Urushibara') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Mushishi Artbook', '978-604-2-176', 'Tuyển tập tranh minh họa của series Mushishi.', 2008, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Artbook'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MUSA-01', 'AVAILABLE', CURRENT_DATE, 150000, 'Kệ ART-5');

    -- 177. The Melancholy of Haruhi Suzumiya (Manga)
    -- Tác giả Nagaru Tanigawa đã có (ID 57 - LN)
    INSERT INTO tac_gia (ten) VALUES ('Noizi Ito (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Sự U Sầu Của Haruhi Suzumiya (Manga)', '978-604-3-177', 'Phiên bản Manga của series Light Novel nổi tiếng.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-HSMM-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-10');

    -- 178. Gungrave (Action/Sci-Fi)
    INSERT INTO tac_gia (ten) VALUES ('Yasuhiro Nightow (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Gungrave', '978-604-4-178', 'Tình bạn và sự phản bội trong thế giới tội phạm có tổ chức.', 2002, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GG-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-11');

    -- 179. BERSERK (Deluxe Edition)
    -- Tác giả Kentaro Miura đã có (ID 125)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Kentaro Miura'), v_nxb_tre, 'BERSERK (Bản Deluxe - Cỡ lớn)', '978-604-4-179', 'Bản in đặc biệt, bìa cứng, khổ lớn của Berserk.', 1989, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BERSD-01', 'AVAILABLE', CURRENT_DATE, 150000, 'Kệ ART-6');

    -- 180. The Fable (Seinen/Action)
    INSERT INTO tac_gia (ten) VALUES ('Katsuhisa Minami') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'The Fable: Sát thủ huyền thoại', '978-604-2-180', 'Sát thủ số 1 Nhật Bản cố gắng sống một cuộc đời bình thường.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-FBL-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-12');

    -- 181. Angel Beats! - Heaven's Door (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Jun Maeda (2)') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Angel Beats! - Cánh Cửa Thiên Đường', '978-604-3-181', 'Tiền truyện Manga của anime nổi tiếng.', 2010, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-ABHD-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-13');

    -- 182. Bakemonogatari (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Oh! great') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bakemonogatari (Manga)', '978-604-4-182', 'Chuyển thể Manga của Light Novel về các hiện tượng kỳ lạ.', 2018, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Supernatural'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BKMG-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-14');

    -- 183. Nana (Shoujo/Drama)
    -- Tác giả Ai Yazawa đã có (ID 98)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Ai Yazawa'), v_nxb_kimdong, 'Nana (Phiên bản Deluxe)', '978-604-2-183', 'Bản in chất lượng cao hơn của Nana.', 2000, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Drama'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NANAD-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ E-24');

    -- 184. 3x3 Eyes (Fantasy/Action)
    INSERT INTO tac_gia (ten) VALUES ('Yuzo Takada') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, '3x3 Eyes', '978-604-4-184', 'Chàng trai bất tử đi theo cô gái quỷ ba mắt Pai.', 1987, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-3X3-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-15');

    -- 185. Detective School Q (Mystery)
    INSERT INTO tac_gia (ten) VALUES ('Fumiya Sato') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Trường Học Thám Tử Q', '978-604-2-185', 'Các học sinh trường thám tử giải quyết các vụ án phức tạp.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Mystery'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DSQ-01', 'AVAILABLE', CURRENT_DATE, 25000, 'Kệ L-16');

    -- 186. Eden: It's an Endless World! (Sci-Fi/Action)
    INSERT INTO tac_gia (ten) VALUES ('Hiroki Endo') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Eden: Thế Giới Bất Tận', '978-604-4-186', 'Thế giới hậu tận thế bị đe dọa bởi virus.', 1998, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-EDEN-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-17');

    -- 187. The Girl Who Leapt Through Time (LN)
    INSERT INTO tac_gia (ten) VALUES ('Yasutaka Tsutsui') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Cô Gái Vượt Thời Gian (LN)', '978-604-3-187', 'Tiểu thuyết gốc về cô gái phát hiện ra khả năng du hành thời gian.', 1967, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sci-Fi'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GTLT-01', 'AVAILABLE', CURRENT_DATE, 85000, 'Kệ LN-F2');

    -- 188. Great Teacher Onizuka (GTO) - The Early Years (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Tohru Fujisawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'GTO: Shonan Junai Gumi - Thời Tuổi Trẻ của Onizuka', '978-604-4-188', 'Tiền truyện kể về thời trung học của Eikichi Onizuka.', 1990, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-GTOEY-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-18');

    -- 189. Beck: Mongolian Chop Squad (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Harold Sakuishi') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Beck: Ban nhạc Rock (Bản Tái Bản)', '978-604-2-189', 'Bản tái bản Manga về ban nhạc Rock Beck.', 1999, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Slice of Life'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BECK2-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ J-12');

    -- 190. Boku Girl (Gender Bender/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Akira Sugito') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Boku Girl', '978-604-4-190', 'Chàng trai bị biến thành con gái và những tình huống dở khóc dở cười.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Comedy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BGIRL-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ L-19');

    -- 191. Claymore (Bản Deluxe - Giả định)
    -- Tác giả Norihiro Yagi đã có (ID 139)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Norihiro Yagi'), v_nxb_kimdong, 'Claymore (Bản Deluxe)', '978-604-2-191', 'Bản in đặc biệt của Claymore.', 2001, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CLMD-01', 'AVAILABLE', CURRENT_DATE, 60000, 'Kệ D-14');

    -- 192. Karakuri Circus (Shounen/Action)
    INSERT INTO tac_gia (ten) VALUES ('Kazuhiro Fujita') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Karakuri Circus - Rạp Xiếc Karakuri', '978-604-4-192', 'Hành trình của một cậu bé với gia tài khổng lồ và những con rối.', 1997, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Action'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-KARA-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ L-20');

    -- 193. The World God Only Knows (Romance/Comedy)
    INSERT INTO tac_gia (ten) VALUES ('Tamiki Wakaki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Thế Giới Chỉ Có Thần Biết', '978-604-2-193', 'Otaku game hẹn hò phải chinh phục các cô gái đời thực để bắt quỷ.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-TWGOK-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ E-25');

    -- 194. Bokurano: Ours (Sci-Fi/Psychological)
    INSERT INTO tac_gia (ten) VALUES ('Mohiro Kitoh') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Bokurano', '978-604-4-194', '15 đứa trẻ phải lái một con robot khổng lồ để bảo vệ Trái Đất.', 2003, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Psychological'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-BOKR-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ L-21');

    -- 195. Chihayafuru (Sports/Shoujo)
    INSERT INTO tac_gia (ten) VALUES ('Yuki Suetsugu') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_kimdong, 'Chihayafuru', '978-604-2-195', 'Câu chuyện về cô gái đam mê trò chơi bài Karuta.', 2007, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Sports'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-CHFR-01', 'AVAILABLE', CURRENT_DATE, 28000, 'Kệ S-10');

    -- 196. Vinland Saga (Manga - Bản thường)
    -- Tác giả Makoto Yukimura đã có (ID 107)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Makoto Yukimura'), v_nxb_tre, 'Vinland Saga (Bản thường)', '978-604-4-196', 'Bản in Manga tiêu chuẩn của Vinland Saga.', 2005, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Historical'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-VINS-01', 'AVAILABLE', CURRENT_DATE, 30000, 'Kệ G-9');

    -- 197. Mushoku Tensei: Thất nghiệp chuyển sinh (Manga)
    INSERT INTO tac_gia (ten) VALUES ('Yuka Fujikawa') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_ipm, 'Mushoku Tensei: Thất nghiệp chuyển sinh (Manga)', '978-604-3-197', 'Chuyển thể Manga của Light Novel nổi tiếng.', 2014, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-MTM-01', 'AVAILABLE', CURRENT_DATE, 35000, 'Kệ D-15');

    -- 198. Nisekoi: Giả Tình (Manga)
    -- Tác giả Naoshi Komi đã có (ID 91)
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES ((SELECT id FROM tac_gia WHERE ten='Naoshi Komi'), v_nxb_kimdong, 'Nisekoi: Giả Tình (Bản Boxset)', '978-604-2-198', 'Bản Boxset đặc biệt của Nisekoi.', 2011, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Romance'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-NIKBS-01', 'AVAILABLE', CURRENT_DATE, 120000, 'Kệ E-26');

    -- 199. Saint Seiya (Bản Deluxe - Giả định)
    INSERT INTO tac_gia (ten) VALUES ('Masami Kurumada') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Saint Seiya (Bản Deluxe)', '978-604-4-199', 'Bản in đặc biệt, khổ lớn của Saint Seiya.', 1986, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Fantasy'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-SSD-01', 'AVAILABLE', CURRENT_DATE, 50000, 'Kệ D-16');

    -- 200. Dragon Head (Artbook)
	INSERT INTO tac_gia (ten) VALUES ('Minetaro Mochizuki') RETURNING id INTO v_tg_id;
    INSERT INTO sach (tacgia_id, nxb_id, tieu_de, isbn, tom_tat, nam_xb, ngon_ngu)
    VALUES (v_tg_id, v_nxb_tre, 'Dragon Head Artbook', '978-604-4-200', 'Tuyển tập hình minh họa của Dragon Head.', 1999, 'Tiếng Việt') RETURNING id INTO v_sach_id;
    INSERT INTO sach_theloai VALUES (v_sach_id, (SELECT id FROM the_loai WHERE ten='Artbook'));
    INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach) VALUES (v_sach_id, 'MV-DRHA-01', 'AVAILABLE', CURRENT_DATE, 150000, 'Kệ ART-7');

END $$;
