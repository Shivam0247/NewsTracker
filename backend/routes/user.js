const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db.js");


// ROUTE 1: Get All the user using: GET "/api/auth/user"

router.get("/user", (req, res, next) => {
  const sql = "SELECT * FROM AUTHOR";
  try {
    db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 2: Add the user using: POST "/api/auth/adduser"

router.post("/adduser", (req, res, next) => {
  const { Author_ID, Lastname, Firstname, Email, City, Country } = req.body;

  // Check if required fields are present in the request body
  if (!Author_ID || !Lastname || !Firstname || !Email || !City || !Country) {
    return res
      .status(400)
      .json({ error: "Missing required fields in request body" });
  }

  const sql =
    "INSERT INTO AUTHOR (Author_ID, Lastname, Firstname, Email, City, Country) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    db.query(
      sql,
      [Author_ID, Lastname, Firstname, Email, City, Country],
      (err, result) => {
        if (err) throw err;
        return res.json({
          message: "User inserted successfully",
          newUser: { Author_ID, Lastname, Firstname, Email, City, Country },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
