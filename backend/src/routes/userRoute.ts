import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { borrowBookController, insertBookController } from "../controllers/userController";
const router = Router();

router.post("/insert-book" , verifyToken,insertBookController);
router.post("/borrow-book", verifyToken,borrowBookController);
export default router;