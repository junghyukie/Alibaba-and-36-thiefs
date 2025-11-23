import { Router } from "express";
import { BorrowController } from "../controllers/borrowController";

const router = Router();

router.put('/:id/return', BorrowController.returnBook);

export default router;