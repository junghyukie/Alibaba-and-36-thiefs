import { Router } from "express";
import { changeReturnDate } from "../controllers/borrowedController";
const router = Router();
// Gia hạn ngày trả
router.put("/change-return-date", changeReturnDate);

export default router;

