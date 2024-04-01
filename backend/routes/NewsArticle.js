const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');
const fetchuser = require('../Middleware/FetchUser');

// ROUTE 1: Get All the Article  using: GET "/api/newsarticle/getarticle"
router.get('/getarticle', async (req, res) => {
  try {
    const newsArticles = await NewsArticle.findAll();
    res.json(newsArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ROUTE 2: Add an Article using: POST "/api/newsarticle/addarticle"

router.post('/addarticle', async (req, res) => {
  const { title, description, content, author, published_at, source_id, source_name, url, image_url } = req.body;
  try {
    // Check if an article with the same title already exists
    const existingArticle = await NewsArticle.findOne({ where: { title } });
    if (existingArticle) {
      return res.status(400).json({ error: 'Article with the same title already exists' });
    }

    // If the article does not exist, create a new one
    const newNewsArticle = await NewsArticle.create({
      title,
      description,
      content,
      author,
      published_at,
      source_id,
      source_name,
      url,
      image_url
    });
    res.status(201).json(newNewsArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
