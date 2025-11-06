import { Router } from "express";
import { AuthorController } from "../controllers/authorController";

const router = Router();

router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getById);

export default router;