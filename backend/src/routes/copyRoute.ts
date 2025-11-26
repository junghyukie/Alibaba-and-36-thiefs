import { Router } from "express";
import { CopyController } from "../controllers/copyController";

const router = Router();

router.get("/barcode/:barcode", CopyController.getByBarcode)
router.get("/:id", CopyController.getById);
router.post("/", CopyController.create);
router.put("/:id", CopyController.update);
router.delete("/:id", CopyController.delete);

export default router;
