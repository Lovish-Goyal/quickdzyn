import mongoose, { Schema } from "mongoose";

const ContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Content =
  mongoose.models.Content || mongoose.model("Content", ContentSchema);
