import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);

export default router;
