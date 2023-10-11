import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

const getAllBlogs = asyncHandler(async (req, res) => {
  // const blogs = await Blog.find({});
  // res.json(blogs);
  res.json({ message: "Blogs found" });
});
const createBlog = asyncHandler(async (req, res) => {
  res.json({ message: "Blog created" });
});
const deleteBlogById = asyncHandler(async (req, res) => {
  res.json({ message: "Blog deleted" });
});
const getBlogById = asyncHandler(async (req, res) => {
  // const blogs = await Blog.find({});
  // res.json(blogs);
  res.json({ message: "Blog found" });
});

export { getAllBlogs, createBlog, deleteBlogById, getBlogById };
