const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.json({ count: 25 });
  console.log("Sent count of 25");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
