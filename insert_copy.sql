DO $$
DECLARE
    v_sach_id INT;
    v_num_copies INT;
    v_copy_index INT;
    v_ma_vach_prefix TEXT; -- Sẽ chứa 'S' + ID sách
    v_gia_tri_ban_sao NUMERIC;
    v_ke_sach_prefix TEXT;
    v_ke_sach_suffix TEXT;
    v_ke_sach TEXT;
BEGIN

    -- 2. LÀM SẠCH DỮ LIỆU BẢN SAO VÀ MƯỢN TRẢ CŨ
    DELETE FROM ban_sao;
    RAISE NOTICE 'Đã làm sạch các bảng ban_sao và muon_tra.';

    -- 3. TẠO CÁC BẢN SAO NGẪU NHIÊN VỚI TRẠNG THÁI 'AVAILABLE'
    FOR v_sach_id IN (SELECT id FROM sach ORDER BY id) LOOP
        
        -- FIX MÃ VẠCH: Sử dụng ID Sách để đảm bảo tính duy nhất
        -- Tiền tố cố định 'S' + ID sách (đệm 0 thành 3 chữ số)
        v_ma_vach_prefix := 'S' || LPAD(v_sach_id::TEXT, 3, '0');

        -- Số lượng bản sao ngẫu nhiên (từ 1 đến 5 bản)
        v_num_copies := 1 + floor(random() * 5)::INT;

        -- Xác định kệ sách (giữ logic phân loại kệ sách)
        IF v_sach_id <= 40 THEN v_ke_sach_prefix := 'S'; v_ke_sach_suffix := (v_sach_id % 10) + 1;
        ELSIF v_sach_id <= 80 THEN v_ke_sach_prefix := 'F'; v_ke_sach_suffix := (v_sach_id % 10) + 1;
        ELSIF v_sach_id <= 120 THEN v_ke_sach_prefix := 'E'; v_ke_sach_suffix := (v_sach_id % 10) + 1;
        ELSIF v_sach_id <= 160 THEN v_ke_sach_prefix := 'D'; v_ke_sach_suffix := (v_sach_id % 10) + 1;
        ELSIF v_sach_id <= 200 THEN v_ke_sach_prefix := 'L'; v_ke_sach_suffix := (v_sach_id % 10) + 1;
        ELSE v_ke_sach_prefix := 'Z'; v_ke_sach_suffix := (v_sach_id % 20) + 1; 
        END IF;

        v_ke_sach := v_ke_sach_prefix || '-' || v_ke_sach_suffix;


        FOR v_copy_index IN 1..v_num_copies LOOP
            
            -- TẠO GIÁ TRỊ NGẪU NHIÊN TRỰC TIẾP CHO BẢN SAO (25,000 đến 120,000 VND)
            v_gia_tri_ban_sao := ROUND(25000 + (random() * 95000));
            
            -- Insert bản sao với trạng thái cố định là 'AVAILABLE'
            INSERT INTO ban_sao (sach_id, ma_vach, trang_thai, ngay_mua, gia_tri, ke_sach)
            VALUES (
                v_sach_id, 
                v_ma_vach_prefix || '-' || LPAD(v_copy_index::TEXT, 2, '0'), -- Mã vạch mới: SXXX-YY
                'AVAILABLE', 
                CURRENT_DATE - (floor(random() * 365) || ' days')::INTERVAL, 
                v_gia_tri_ban_sao, 
                v_ke_sach
            );
            
        END LOOP;
    END LOOP;

    RAISE NOTICE 'Hoàn tất việc tạo lại bản sao. Mã vạch hiện được tạo dựa trên ID Sách, đảm bảo tính duy nhất.';

END $$;