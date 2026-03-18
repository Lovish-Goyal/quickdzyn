import { Request, Response } from "express";
import { Content } from "../models/Content";

export async function getAllContent(req: Request, res: Response) {
  try {
    const content = await Content.find().sort({ key: 1 });
    return res.json(content);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch content" });
  }
}

export async function getContentByKey(req: Request, res: Response) {
  try {
    const entry = await Content.findOne({ key: req.params.key });
    if (!entry) {
      return res.status(404).json({ message: "Content not found" });
    }
    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch content" });
  }
}

export async function upsertContent(req: Request, res: Response) {
  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ message: "Title and body are required" });
  }
  try {
    const entry = await Content.findOneAndUpdate(
      { key: req.params.key },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save content" });
  }
}
