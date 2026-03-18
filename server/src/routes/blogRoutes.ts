import { Router } from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", requireAdmin, createBlog);
router.put("/:id", requireAdmin, updateBlog);
router.delete("/:id", requireAdmin, deleteBlog);

export default router;
