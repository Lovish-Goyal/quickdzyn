import { Router } from "express";
import {
  getAllContent,
  getContentByKey,
  upsertContent,
} from "../controllers/contentController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getAllContent);
router.get("/:key", getContentByKey);
router.put("/:key", requireAdmin, upsertContent);

export default router;
