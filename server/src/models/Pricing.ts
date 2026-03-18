import mongoose, { Schema } from "mongoose";

const PricingSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    highlight: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Pricing =
  mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);
