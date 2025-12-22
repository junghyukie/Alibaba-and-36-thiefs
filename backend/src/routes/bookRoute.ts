import { Router } from "express";
import { BookController } from "../controllers/bookController";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";
import { topBookController } from "../controllers/topBookController";
const router = Router();

router.get("/", BookController.getAll);
router.get("/top-book", topBookController);
router.get("/:id(\\d+)", BookController.getBookById);
router.post("/", BookController.create);
router.put("/:id", BookController.update);
router.delete("/:id", verifyToken, staffOnly, BookController.delete);

router.get("/:id/copies", BookController.getAllCopies);
router.get("/:id/num_copies", BookController.getNumCopies);

export default router;
