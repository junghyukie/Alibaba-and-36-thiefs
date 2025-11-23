import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute"; // import đúng cú pháp ESModule
import userServiceRoute from "./routes/userRoute";
// import authRoute from "./routes/authRoute";
import bookRoute from "./routes/bookRoute";
import categoryRoute from "./routes/categoryRoute";
import authorRoute from "./routes/authorRoute";
import publisherRoute from "./routes/publisherRoute";
import borrowRoute from "./routes/borrowRoute"
import { errorHandler } from "./middleware/errorHandler";

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
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/author", authorRoute);
app.use("/api/publisher", publisherRoute);
app.use("/api/borrow", borrowRoute)

app.use(errorHandler); // must come last

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
