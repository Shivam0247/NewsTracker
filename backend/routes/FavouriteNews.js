const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/FetchUser");
const FavoriteNews = require("../models/FavouriteArticle");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the FavNews using: GET "/api/favnews/getfavnews". Login required
router.get("/getfavnews", fetchuser, async (req, res) => {
  try {
    const news = await FavoriteNews.findAll({ where: { user_id: req.user.user_id } });
    res.json(news);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new FavNews using: POST "/api/favnews/addfavnews". Login required
router.post("/addfavnews",fetchuser, async (req, res) => {
    try {
      const { title, description,content,author,published_at,source_id,source_name,url,image_url } = req.body;

      const news = new FavoriteNews({
        title,
        description,
        content,
        author,
        published_at,
        source_id,
        source_name,
        url,
        image_url,
        user_id: req.user.user_id,
      });
      const savedNews = await news.save();

      res.json(savedNews);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
