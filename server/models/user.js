import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

userSchema.virtual("url").get(function () {
  return `/api/users/${this._id}`;
});

const User = model("User", userSchema);
export default User;
