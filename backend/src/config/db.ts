
// import mysql from "mysql2";

// export const connection = mysql.createConnection({
//     host : 'localhost',
//     port : 3307,
//     user : 'root',
//     password : '123456',
//     database : 'library_sys',
// });

import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",          // tên user trong DBeaver
  host: "localhost",         // hoặc 127.0.0.1
  database: "LibraryManagement",  // tên DB bạn đã tạo (vd: librarydb)
  password: "123456", // mật khẩu bạn đặt khi cài PostgreSQL
  port: 5432,                // cổng mặc định của PostgreSQL
});

export default pool;


