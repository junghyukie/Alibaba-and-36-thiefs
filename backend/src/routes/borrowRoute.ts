import { Router } from "express";
import { BorrowController } from "../controllers/borrowController";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/copy/:id', BorrowController.getByNotReturnedCopy);
router.put('/:id/return', BorrowController.returnBook);
router.get('/user/:userId', verifyToken, staffOnly, BorrowController.getActiveBorrowByUser);

export default router;