import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

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

type DesignType = InferSchemaType<typeof DesignSchema>;

export const Design: Model<DesignType> =
  (mongoose.models.Design as Model<DesignType>) ??
  mongoose.model<DesignType>("Design", DesignSchema);
