import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { activateAccController, addBanSaoController, addBookController, extendTheController, lateController, listAccountController, lockAccController, LogControllerforStaff } from "../controllers/staffController";


const router = Router();
router.get("/late", verifyToken,lateController);
router.get("/list-account", verifyToken,listAccountController);
router.post("/add-book",verifyToken,addBookController);
router.post("/add-ban-sao",verifyToken,addBanSaoController);
router.post("/activate",verifyToken,activateAccController);
router.post("/lock",verifyToken,lockAccController);
router.post("/extend",verifyToken,extendTheController);
router.post("/log",verifyToken,LogControllerforStaff);
export default router;