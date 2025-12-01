const app = require("./app");
require("dotenv").config();
const cors = require("cors");
const express = require("express");

app.use(cors());
app.use(express.json());

// Default route for health check
app.get("/", (req, res) => {
  res.send("API running");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
