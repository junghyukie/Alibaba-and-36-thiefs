-- Script thiết lập database cho Library Management System
-- Chạy script này sau khi đã kết nối PostgreSQL thành công

-- 1. Tạo database
DROP DATABASE IF EXISTS LibraryManagement;
CREATE DATABASE LibraryManagement;

-- 2. Kết nối đến database
\c LibraryManagement

-- 3. Import schema từ seed.sql
\i 'd:/GT-DS/New folder/Alibaba/Alibaba-and-36-thiefs/seed.sql'

-- 4. Import test accounts
\i 'd:/GT-DS/New folder/Alibaba/Alibaba-and-36-thiefs/insert_test_accounts.sql'

-- 5. Import books (optional)
-- \i 'd:/GT-DS/New folder/Alibaba/Alibaba-and-36-thiefs/insert_book.sql'

-- 6. Import copies (optional)
-- \i 'd:/GT-DS/New folder/Alibaba/Alibaba-and-36-thiefs/insert_copy.sql'

-- Kiểm tra kết quả
SELECT 'Database setup completed!' as status;
SELECT COUNT(*) as total_accounts FROM tai_khoan;
SELECT COUNT(*) as total_books FROM sach;
