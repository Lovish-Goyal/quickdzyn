import { Router } from "express";
import {
  getDesigns,
  getDesignBySlug,
  createDesign,
  updateDesign,
  deleteDesign,
} from "../controllers/designController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getDesigns);
router.get("/:slug", getDesignBySlug);
router.post("/", requireAdmin, createDesign);
router.put("/:id", requireAdmin, updateDesign);
router.delete("/:id", requireAdmin, deleteDesign);

export default router;
