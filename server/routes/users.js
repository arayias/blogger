import express from "express";
import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

export default router;
