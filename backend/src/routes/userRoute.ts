import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { borrowBookController, inforBookinCartController, deleteBookFromCartController, insertBookController, LogController, theInforController } from "../controllers/userController";
import { reserveController } from "../controllers/reserveBookController";
import { topBookController } from "../controllers/topBookController";
const router = Router();

router.post("/insert-book" , verifyToken,insertBookController);
router.post("/borrow-book", verifyToken,borrowBookController);
router.post("/cart-items", verifyToken,inforBookinCartController);
router.post("/log", verifyToken,LogController);
router.post("/reserve-book", verifyToken,reserveController);
router.delete("/delete-book/:id_sach", verifyToken,deleteBookFromCartController);
router.get("/the-infor", verifyToken,theInforController);
router.get("/top-book", verifyToken,topBookController);

export default router;