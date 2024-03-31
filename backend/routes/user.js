const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const fetchuser = require("../Middleware/FetchUser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shivamisagoodb$oy';


// ROUTE 1: Get All the users info: POST "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    console.log('Decoded Token:', req.user); // Log the decoded token
    const userId = req.user.user_id; // Assign user_id to userId
    console.log('User ID:', userId); // Log the user ID for debugging
    const user = await User.findOne({
      where: { user_id: userId },
      attributes: { exclude: ['password'] } // Exclude password from the result
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 2: Add a user using: POST "/api/auth/adduser"
router.post("/adduser", [
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({ username, email, password: hashedPassword });
    const data = {
      newUser: {
        user_id: newUser.user_id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({ authtoken })
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});



// ROUTE 3: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Log user data for debugging
    console.log("Retrieved User:", user);

    // Check if password matches
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const data = {
      user: {
        user_id: user.user_id
      }
    };
    const authtoken = jwt.sign(data,JWT_SECRET);

    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
