import { Router } from "express";
import { adminLogin } from "../controllers/adminController";

const router = Router();

// Support both `/api/admin/login` and `/api/admin` for ease of use.
router.post(["/", "/login"], adminLogin);

export default router;
