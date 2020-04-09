const express = require("express");
const db = require("./database");

const hostName = "21.0.0.1";
const PORT = 5000;

const server = express();

server.use(express.json());

// GET requests
server.get("/", (req, res) => {
  res.json({ msg: "Welcome to NODE API PROJECT" });
});

server.get("/api/users/", (req, res) => {
  const users = db.getUsers();

  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ errorMessage: "User not found" });
  }
});

// POST requests
server.post("/api/users/", (req, res) => {
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  if (!req.body.name) {
    return res.status(400).json({ errorMessage: "User needs a name" });
  } else if (!req.body.bio) {
    return res.status(400).json({ errorMessage: "User needs a bio" });
  } else {
    res.status(201).json(newUser);
  }
});

// Listen Event
server.listen(PORT, () => {
  console.log(`Server started on ${hostName}:${PORT}`);
});
