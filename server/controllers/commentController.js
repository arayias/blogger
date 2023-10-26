import asyncHandler from "express-async-handler";
import Comment from "../models/comment.js";
import passport from "passport";
import { body, validationResult } from "express-validator";

const getAllCommentsByBlogId = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blog: req.params.id }).populate(
    "author"
  );
  res.json(comments);
});

const createComment = [
  passport.authenticate("jwt", { session: false }),
  body("comment", "comment must not be empty")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.json({ errors: errors.array() });
    }

    const comment = new Comment({
      content: req.body.comment,
      author: req.user.id,
      blog: req.params.id,
      date: Date.now(),
    });

    console.log(comment);

    await comment.save();
    res.json(comment);
  }),
];

export { getAllCommentsByBlogId, createComment };
