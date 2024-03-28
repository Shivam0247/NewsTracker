const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const db = require("../db.js");

router.get("/user", (req, res, next) => { 
    const sql = "SELECT * FROM AUTHOR";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router; 
