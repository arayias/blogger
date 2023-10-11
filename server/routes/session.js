import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    res.json({ message: "Login successful" });
  })
);

router.delete(
  "/logout",
  asyncHandler(async (req, res) => {})
);

export default router;
