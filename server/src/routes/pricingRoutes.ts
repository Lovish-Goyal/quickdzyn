import { Router } from "express";
import {
  getPricing,
  createPricing,
  updatePricing,
  deletePricing,
} from "../controllers/pricingController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getPricing);
router.post("/", requireAdmin, createPricing);
router.put("/:id", requireAdmin, updatePricing);
router.delete("/:id", requireAdmin, deletePricing);

export default router;
