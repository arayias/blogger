import asyncHandler from "express-async-handler";
import passport from "passport";
import User from "../models/user.js";
import Blog from "../models/blog.js";
import { body, validationResult } from "express-validator";

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("author", "username");

  res.json(blogs);
});

const createBlog = [
  passport.authenticate("jwt", { session: false }),
  body("title").trim().isLength({ min: 1, max: 20 }).escape(),
  body("content").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.json({ errors: errors.array() });
    }

    const { title, content, image } = req.body;

    // console.log(image);

    const blog = new Blog({
      title,
      contents: content,
      author: req.user._id,
      image: image.length != 1 ? "" : image,
    });
    await blog.save();
    res.json(blog);
  }),
];
const deleteBlogById = asyncHandler(async (req, res) => {
  res.json({ message: "Blog deleted" });
});
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "username"
  );
  res.json(blog);
});

export { getAllBlogs, createBlog, deleteBlogById, getBlogById };
