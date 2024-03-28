const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// ROUTE 1: Get All the Category  using: GET "/api/category/getcategory"

router.get('/getcategory', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ROUTE 2: Add an Category using: POST "/api/Category/addcategory"

router.post('/addcategory', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
