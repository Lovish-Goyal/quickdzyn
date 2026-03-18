import { Request, Response } from "express";
import { Pricing } from "../models/Pricing";

export async function getPricing(req: Request, res: Response) {
  try {
    const pricing = await Pricing.find().sort({ createdAt: 1 });
    return res.json(pricing);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch pricing" });
  }
}

export async function createPricing(req: Request, res: Response) {
  const { name, price, description } = req.body || {};
  if (!name || !price || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const plan = await Pricing.create(req.body);
    return res.status(201).json(plan);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create plan" });
  }
}

export async function updatePricing(req: Request, res: Response) {
  try {
    const plan = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.json(plan);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update plan" });
  }
}

export async function deletePricing(req: Request, res: Response) {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    return res.json({ message: "Plan deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete plan" });
  }
}
