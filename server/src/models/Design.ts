import mongoose, { Schema } from "mongoose";

const DesignSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Design =
  mongoose.models.Design || mongoose.model("Design", DesignSchema);
