-- Tạo tài khoản ADMIN
INSERT INTO tai_khoan (
    mat_khau_hash, 
    ho_ten, 
    email, 
    dien_thoai, 
    ngay_sinh, 
    dia_chi,
    vai_tro, 
    gioi_han_muon
) VALUES (
    '$2b$10$rcEBmt0VvbJFsonJLNlPAOxsRb99XvG2S92rrjJJd7.E4xtjGadae',
    'Admin User',
    'admin@library.com',
    '0123456789',
    '1990-01-01',
    'Hà Nội',
    'ADMIN',
    20
);

-- Tạo tài khoản NHAN_VIEN
INSERT INTO tai_khoan (
    mat_khau_hash, 
    ho_ten, 
    email, 
    vai_tro, 
    gioi_han_muon
) VALUES (
    '$2b$10$rcEBmt0VvbJFsonJLNlPAOxsRb99XvG2S92rrjJJd7.E4xtjGadae',
    'Staff User',
    'staff@library.com',
    'NHAN_VIEN',
    15
);

-- Tạo một số tài khoản DOC_GIA test
INSERT INTO tai_khoan (
    mat_khau_hash, 
    ho_ten, 
    email, 
    dien_thoai, 
    ngay_sinh, 
    dia_chi,
    vai_tro, 
    gioi_han_muon
) VALUES 
(
    '$2b$10$rcEBmt0VvbJFsonJLNlPAOxsRb99XvG2S92rrjJJd7.E4xtjGadae',
    'Nguyễn Văn A',
    'nguyenvana@test.com',
    '0912345678',
    '2000-01-15',
    '123 Đường Lê Lợi, TP HCM',
    'DOC_GIA',
    5
),
(
    '$2b$10$rcEBmt0VvbJFsonJLNlPAOxsRb99XvG2S92rrjJJd7.E4xtjGadae',
    'Trần Thị B',
    'tranthib@test.com',
    '0923456789',
    '1999-05-20',
    '456 Đường Nguyễn Huệ, Hà Nội',
    'DOC_GIA',
    5
),
(
    '$2b$10$rcEBmt0VvbJFsonJLNlPAOxsRb99XvG2S92rrjJJd7.E4xtjGadae',
    'Lê Văn C',
    'levanc@test.com',
    '0934567890',
    '2001-09-10',
    '789 Đường Trần Hưng Đạo, Đà Nẵng',
    'DOC_GIA',
    5
);
