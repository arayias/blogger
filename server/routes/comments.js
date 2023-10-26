import express from "express";
import {
  createComment,
  getAllCommentsByBlogId,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", createComment);

router.get("/:id", getAllCommentsByBlogId);

export default router;
