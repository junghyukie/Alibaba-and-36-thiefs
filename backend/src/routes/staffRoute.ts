import { Router } from "express";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";
import { activateAccController, addBookController, extendTheController, lateController, listAccountController, listCopiesController, lockAccController, LogControllerforStaff, notificationStaffController, staffBorrowController } from "../controllers/staffController";
import { topBookController } from "../controllers/topBookController";

const router = Router();

router.use(verifyToken, staffOnly);

router.get("/late", lateController);
router.get("/list-account", listAccountController);
router.get("/list-copies", listCopiesController);
router.get("/notifications",notificationStaffController)
router.get("/top-book", topBookController);
router.post("/add-book", addBookController);
router.post("/activate", activateAccController);
router.post("/lock", lockAccController);
router.post("/extend", extendTheController);
router.post("/log", LogControllerforStaff);
router.post("/borrow", staffBorrowController);

export default router;