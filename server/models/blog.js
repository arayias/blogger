import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  contents: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.virtual("url").get(function () {
  return `/api/blogs/${this._id}`;
});

const Blog = model("Blog", blogSchema);

export default Blog;
