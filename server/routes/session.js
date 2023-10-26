import express from "express";
import {
  sessionLogin,
  sessionLogout,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/login", sessionLogin);

router.delete("/logout", sessionLogout);

export default router;
