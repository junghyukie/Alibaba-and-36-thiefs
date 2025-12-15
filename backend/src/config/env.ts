// src/config/env.ts
import dotenv from "dotenv";
import path from "path";

// Load đúng file .env ở backend/
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Debug tạm (xong việc thì xóa)
// console.log("ENV LOADED:", process.env.PG_PASSWORD);

