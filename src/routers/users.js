const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    role: req.body.role
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "username exist" });
  }
});

router.post("/login", async (req, res) => {
  // const user = await User.find(
  //   el => el.username === req.body.username && el.password === req.body.password
  // );
  //new RegExp("\b" + req.body.username + "\b", "i"),
  User.findOne(
    {
      username: new RegExp("\\b" + req.body.username + "\\b", "i"),
      password: req.body.password
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  // if (user) {
  //   res.json(user);
  // } else {
  //   res.json({ message: "error" });
  // }
});

router.put("/:id", getUsers, async (req, res) => {
  res.user.username = req.body.username;
  res.user.role = req.body.role;
  try {
    const update = await res.user.save();
    res.json(update);
  } catch (err) {
    res.status(400).json({ message: "username exist" });
  }
});

router.delete("/:id", getUsers, async (req, res) => {
  await res.user.remove();
  res.json({ message: "removed" });
});

async function getUsers(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(400).json({ message: "error message" });
    }
  } catch (err) {
    return res.status(500).json({ message: "error message" });
  }

  res.user = user;
  next();
}

module.exports = router;
