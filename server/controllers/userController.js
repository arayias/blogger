import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

const createUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .custom(async (value) => {
      const exists = await User.findOne({ username: value });
      if (exists) {
        return Promise.reject("Username already exists");
      }
      return Promise.resolve();
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .escape(),
  asyncHandler(async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
      const user = await User.create({
        username: req.body.username,
        passwordHash: hashedPassword,
      });
      res.json({ message: "User created" });
    });
  }),
];

export { createUser };
