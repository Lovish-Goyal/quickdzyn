import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

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

type PricingType = InferSchemaType<typeof PricingSchema>;

export const Pricing: Model<PricingType> =
  (mongoose.models.Pricing as Model<PricingType>) ??
  mongoose.model<PricingType>("Pricing", PricingSchema);
