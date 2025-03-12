const express = require("express");
const router = express.Router();

const User = require("../userModel.js");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.put("/user/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "User deleted successfully" });
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    console.log("deleted user", deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;