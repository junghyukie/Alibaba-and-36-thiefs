import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { borrowBookController,
         inforBookinCartController,
         deleteBookFromCartController,
         insertBookController,
         LogController,
         theInforController,
         extendBookController,
         notificationUserController,
         getMyFines 
} from "../controllers/userController";
import { reserveController } from "../controllers/reserveBookController";
import { topBookController } from "../controllers/topBookController";
import { changePassWordController } from "../controllers/authController";
const router = Router();
router.use(verifyToken);

router.post("/insert-book" , insertBookController);
router.post("/borrow-book", borrowBookController);
router.post("/cart-items", inforBookinCartController);
router.post("/log", LogController);
router.post("/reserve-book", reserveController);
router.post("/change-password", changePassWordController);
router.post("/extend-book", extendBookController);

router.delete("/delete-book/:id_sach", deleteBookFromCartController);
router.get("/the-infor", theInforController);
router.get("/top-book", topBookController);
router.get("/fines", getMyFines);

router.get("/notifications",notificationUserController)
export default router;