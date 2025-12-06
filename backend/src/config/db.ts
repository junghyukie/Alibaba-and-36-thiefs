import { Pool } from 'pg'
import env from "dotenv"

// Load environment variables from the backend/.env file (default behavior)
env.config({ path: './src/.env' });

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
    ssl: {
        rejectUnauthorized: false,
    }
});

export default pool;


//giỏ sách , mượn sách , trả sách
//+Danh sách người mượn sách quá hạn xếp theo độ trễ : xét bảng chi tiết phiếu mượn , if status = chưa trả và getdate() > han_trả,
// lấy getdate() - hạn trả ?? lấy theo thứ tự cao đến thấp kiểu gì ?? hay thêm 1 cột muôn , nếu muộn thì nó tự tính ngày bên cạnh và trả về dữ liệu???
// + Danh sách account : liệt kê account , 20 tài khoản 1 page , ấn trang gửi request , lấy tổng số bản ghi kiểu gì rowCount ?? cứ web nhỏ 
// + Quy trình đặt chỗ (query) : nếu bản sao available = 0 , đặt chỗ , thêm bảng đặt_chỗ , lưu id_acc và sách đặt chỗ và số thứ tự và làm thế nào để số thự tự giảm khi có người mượn
//khi mượn thì xóa như nào ?? đoạn xử lý khi có sách thì xử lý như nào
// + lịch sử mượn trả của từng account : cầm thêm database log?? , lưu lịch sử mượn , hạn trả, và trả thực tiễn có trùng với phiếu mượn chi tiết ko???
//đặt chỗ , nếu có người đặt chỗ , trả sách chuyển sang reserve, nếu mượn thì chuyển sang borrowed, thêm sách cx vậy