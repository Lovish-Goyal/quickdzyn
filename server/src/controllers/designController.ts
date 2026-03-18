import { Request, Response } from "express";
import { Design } from "../models/Design";

export async function getDesigns(req: Request, res: Response) {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    return res.json(designs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch designs" });
  }
}

export async function getDesignBySlug(req: Request, res: Response) {
  try {
    const design = await Design.findOne({ slug: req.params.slug });
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    return res.json(design);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch design" });
  }
}

export async function createDesign(req: Request, res: Response) {
  const { title, slug, price, image, images, description } = req.body || {};
  if (!title || !slug || !price || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const resolvedImages = Array.isArray(images) ? images : typeof images === "string" ? [images] : [];
  const primaryImage = image || resolvedImages[0] || "";

  if (!primaryImage) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    const design = await Design.create({
      title,
      slug,
      price,
      image: primaryImage,
      images: resolvedImages,
      description,
      features: req.body.features || [],
      categories: req.body.categories || [],
    });
    return res.status(201).json(design);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create design" });
  }
}

export async function updateDesign(req: Request, res: Response) {
  try {
    const { image, images } = req.body || {};
    const resolvedImages = Array.isArray(images) ? images : typeof images === "string" ? [images] : [];
    const primaryImage = image || resolvedImages[0];

    const updatePayload: any = { ...req.body };

    if (resolvedImages.length > 0) {
      updatePayload.images = resolvedImages;
    }
    if (primaryImage) {
      updatePayload.image = primaryImage;
    }

    const design = await Design.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
    });
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    return res.json(design);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update design" });
  }
}

export async function deleteDesign(req: Request, res: Response) {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    return res.json({ message: "Design deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete design" });
  }
}
