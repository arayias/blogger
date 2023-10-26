import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlogById,
  getBlogById,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/", createBlog);

router.delete("/:id", deleteBlogById);

export default router;
