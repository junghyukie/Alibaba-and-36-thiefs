import { Router } from "express";
import { PublisherController } from "../controllers/publisherController";

const router = Router();

router.get("/", PublisherController.getAll);
router.get("/:id", PublisherController.getById);

export default router;