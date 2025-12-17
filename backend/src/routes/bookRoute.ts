import { Router } from "express";
import { BookController } from "../controllers/bookController";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.post("/", BookController.create);
router.put("/:id", BookController.update);
router.delete("/:id", verifyToken, staffOnly, BookController.delete);

router.get("/:id/copies", BookController.getAllCopies);
router.get("/:id/num_copies", BookController.getNumCopies);

export default router;
