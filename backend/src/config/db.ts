
import mysql from "mysql2";

export const connection = mysql.createConnection({
    host : 'localhost',
    port : 3307,
    user : 'root',
    password : '123456',
    database : 'library_sys',
});
