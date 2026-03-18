import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secret = process.env.ADMIN_JWT_SECRET || "";
    if (!secret) {
      return res.status(500).json({ message: "Server misconfiguration" });
    }
    jwt.verify(token, secret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
