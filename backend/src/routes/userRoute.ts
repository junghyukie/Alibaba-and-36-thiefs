import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { borrowBookController, inforBookinCartController, insertBookController, LogController, theInforController } from "../controllers/userController";
import { reserveController } from "../controllers/reserveBookController";
const router = Router();

router.post("/insert-book" , verifyToken,insertBookController);
router.post("/borrow-book", verifyToken,borrowBookController);
router.post("/cart-items", verifyToken,inforBookinCartController);
router.post("/log", verifyToken,LogController);
router.post("/reserve-book", verifyToken,reserveController);
router.post("/the-infor", verifyToken,theInforController);

export default router;