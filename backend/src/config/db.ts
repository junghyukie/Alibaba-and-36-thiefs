import { Pool } from 'pg'
import env from "dotenv"

// Load environment variables from the backend/.env file (default behavior)
env.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});

export default pool;


//giỏ sách , mượn sách , trả sách
//Danh sách người mượn sách quá hạn xếp theo độ trễ
// + Danh sách account
// + Quy trình đặt chỗ (query)
// + lịch sử mượn trả của từng account
