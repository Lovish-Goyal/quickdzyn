import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${timestamp}-${safeName}`);
    },
  }),
});

// Accept multiple files and return accessible URLs
router.post("/upload", upload.array("files"), (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const urls = files.map((file) => `${baseUrl}/uploads/${file.filename}`);
  res.json({ urls });
});

export default router;
