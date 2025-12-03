import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { addBanSaoController, addBookController, lateController, listAccountController } from "../controllers/staffController";

const router = Router();
router.get("/late", verifyToken,lateController);
router.get("/list-account", verifyToken,listAccountController);
router.post("/add-book",verifyToken,addBookController)
router.post("/add-ban-sao",verifyToken,addBanSaoController)
export default router;