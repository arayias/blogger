import express from "express";
import asyncHandler from "express-async-handler";
import blogsRouter from "./routes/blogs.js";
import usersRouter from "./routes/users.js";
import sessionRouter from "./routes/session.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/session", sessionRouter);

app.get("/api", (req, res) => {
  res.json({ count: 25 });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
