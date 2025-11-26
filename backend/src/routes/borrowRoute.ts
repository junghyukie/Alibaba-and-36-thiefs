import { Router } from "express";
import { BorrowController } from "../controllers/borrowController";

const router = Router();

router.get('/copy/:id', BorrowController.getByNotReturnedCopy);
router.put('/:id/return', BorrowController.returnBook);

export default router;