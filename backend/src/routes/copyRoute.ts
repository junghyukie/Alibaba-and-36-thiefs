import { Router } from "express";
import { CopyController } from "../controllers/copyController";
import { staffOnly, verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/barcode/:barcode", CopyController.getByBarcode)
router.get("/:id", CopyController.getById);
router.post("/", CopyController.create);
router.put("/:id", CopyController.update);
router.delete("/:id", verifyToken, staffOnly, CopyController.delete);

export default router;
