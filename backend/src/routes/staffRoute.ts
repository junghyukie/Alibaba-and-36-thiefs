import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { lateController, listAccountController } from "../controllers/staffController";

const router = Router();
router.get("/late", verifyToken,lateController);
router.get("/list-account", verifyToken,listAccountController);
export default router;