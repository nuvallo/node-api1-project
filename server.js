const express = require("express");
const db = require("./database");

const hostName = "21.0.0.1";
const PORT = 5000;

const server = express();

server.get("/", (req, res) => {
  res.json({ msg: "Hello from server.js" });
});

server.listen(PORT, () => {
  console.log(`Server started on ${hostName}:${PORT}`);
});
