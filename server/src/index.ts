import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import adminRoutes from "./routes/adminRoutes";
import designRoutes from "./routes/designRoutes";
import blogRoutes from "./routes/blogRoutes";
import pricingRoutes from "./routes/pricingRoutes";
import contentRoutes from "./routes/contentRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config({ path: path.resolve(__dirname, "..", "server.env") });

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/content", contentRoutes);
app.use("/api", uploadRoutes);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });
