const express = require("express");
const fs = require("fs");
const db = require("./database");

const hostName = "21.0.0.1";
const PORT = process.env.PORT || 5000;

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
    res
      .status(400)
      .json({ msg: "The user with the specified ID does not exist." });
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

// DELETE Requests
server.delete("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      msg: "The user with the specified ID does not exist.",
    });
  }
});

// PUT Requests
server.put("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (!user.name) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name for the user." });
  } else if (!user.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide bio for the user." });
  } else {
    if (user) {
      const updatedUser = db.updateUser(user.id, {
        name: req.body.name || user.name,
        bio: req.body.bio || user.bio,
      });

      res.json(updatedUser);
    } else {
      res.status(404).json({
        msg: "The user with the specified ID does not exist.",
      });
    }
  }
});

// Listen Event
server.listen(PORT, () => {
  console.log(`Server started on ${hostName}:${PORT}`);
});
