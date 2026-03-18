import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

type BlogType = InferSchemaType<typeof BlogSchema>;

export const Blog: Model<BlogType> =
  (mongoose.models.Blog as Model<BlogType>) ?? mongoose.model<BlogType>("Blog", BlogSchema);
