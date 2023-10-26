import express from "express";
import asyncHandler from "express-async-handler";
import blogsRouter from "./routes/blogs.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import sessionRouter from "./routes/session.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import logger from "./middleware/logger.js";
import { passportConfig } from "./config/passport.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(passport.initialize());
passportConfig(passport);

app.use(express.json({ limit: "52428800" }));
app.use(express.urlencoded({ extended: false, limit: "52428800" }));

app.use(logger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/session", sessionRouter);
app.use("/api/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
