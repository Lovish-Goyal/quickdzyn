import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const ContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: [String], default: [] },
  },
  { timestamps: true }
);

type ContentType = InferSchemaType<typeof ContentSchema>;

export const Content: Model<ContentType> =
  (mongoose.models.Content as Model<ContentType>) ??
  mongoose.model<ContentType>("Content", ContentSchema);
