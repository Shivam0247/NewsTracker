const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');

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
