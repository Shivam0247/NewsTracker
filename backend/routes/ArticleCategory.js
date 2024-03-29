const express = require('express');
const router = express.Router();
const ArticleCategories = require('../models/ArticleCategory');

router.get('/getarticlecategories', async (req, res) => {
    try {
        const articleCategories = await ArticleCategories.findAll();
        res.json(articleCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addarticlecategories', async (req, res) => {
    const { article_id, category_id } = req.body;
    try {
        const existingCategory = await ArticleCategories.findOne({ where: { article_id, category_id } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Article category already exists' });
        }

        const newArticleCategory = await ArticleCategories.create({ article_id, category_id });
        res.status(201).json(newArticleCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
