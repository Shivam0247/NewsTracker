const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 8800

app.get("/", (req, res) => {
    return res.json("From Backend Side");
});

app.use('/api/auth', require('./routes/user'))
app.use('/api/newsarticle', require('./routes/NewsArticle'))
app.use('/api/category', require('./routes/Category'))
app.use('/api/articlecategory', require('./routes/ArticleCategory'))
app.use('/api/favnews', require('./routes/FavouriteNews'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
