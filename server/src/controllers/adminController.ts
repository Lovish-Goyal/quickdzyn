import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_JWT_SECRET || "";

  if (!adminEmail || !adminPassword || !secret) {
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "7d" });
  return res.json({ token });
}
