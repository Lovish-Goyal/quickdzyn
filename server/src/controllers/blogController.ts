import { Request, Response } from "express";
import { Blog } from "../models/Blog";

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
}

export async function getBlogBySlug(req: Request, res: Response) {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blog" });
  }
}

export async function createBlog(req: Request, res: Response) {
  const { title, slug, summary, image, date } = req.body || {};
  if (!title || !slug || !summary || !image || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog" });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update blog" });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ message: "Blog deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete blog" });
  }
}
