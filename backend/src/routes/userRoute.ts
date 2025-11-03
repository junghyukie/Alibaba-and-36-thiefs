import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { insertBookController } from "../controllers/userController";
const router = Router();

router.post("/insert-book" , verifyToken,insertBookController);

export default router;