import express from "express";
import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {})
);

router.post(
  "/",
  asyncHandler(async (req, res) => {})
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {})
);

export default router;
