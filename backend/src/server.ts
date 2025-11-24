import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute"; // import đúng cú pháp ESModule
import userServiceRoute from "./routes/userRoute";
import bookRoute from "./routes/bookRoute";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from backend!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/user/service/",userServiceRoute);
// Books API
app.use("/api/books", bookRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
