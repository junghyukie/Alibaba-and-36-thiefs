import { Router } from "express";
import {FineController} from "../controllers/fineController";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/user/:userId/", verifyToken, staffOnly, FineController.getFinesByUser);
router.put("/:id/pay", verifyToken, staffOnly, FineController.payFine);

export default router;