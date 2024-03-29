const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const ArticleCategories = sequelize.define('ArticleCategories', {
    article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'NewsArticles', 
            key: 'article_id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Categories',
            key: 'category_id'
        }
    }
}, {
    tableName: 'ArticleCategories',
    timestamps: false 
});

(async () => {
    await sequelize.sync({ force: false });
})();

module.exports = ArticleCategories;
