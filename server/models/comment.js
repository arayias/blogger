import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  edited: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.virtual("url").get(function () {
  return `/api/comments/${this._id}`;
});

const Comment = model("Comment", commentSchema);
export default Comment;
