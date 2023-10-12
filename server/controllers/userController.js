import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const createUser = asyncHandler(async (req, res) => {
  console.log("create user called");
  // res.sendStatus(200);
  res.json("success");
});

export { createUser };
