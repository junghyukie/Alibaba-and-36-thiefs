import { Router } from "express";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";
import { activateAccController, addBookController, extendTheController, lateController, listAccountController, listCopiesController, lockAccController, LogControllerforStaff } from "../controllers/staffController";

const router = Router();

router.use(verifyToken, staffOnly);

router.get("/late", lateController);
router.get("/list-account", listAccountController);
router.get("/list-copies", listCopiesController);
router.post("/add-book", addBookController);
router.post("/activate", activateAccController);
router.post("/lock", lockAccController);
router.post("/extend", extendTheController);
router.post("/log", LogControllerforStaff);

export default router;