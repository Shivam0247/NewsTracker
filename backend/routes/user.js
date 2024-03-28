const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

// ROUTE 1: Get All the users using: GET "/api/auth/user"
router.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a user using: POST "/api/auth/adduser"
router.post("/adduser", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const newUser = await User.create({ username, email, password });
      return res.json({
        message: "User inserted successfully",
        newUser: newUser.toJSON(),
      });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });
  
module.exports = router;
