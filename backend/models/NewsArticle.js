const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const NewsArticle = sequelize.define('NewsArticle', {
    article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    published_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    source_id: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    source_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'NewsArticles',
    timestamps: false
});

(async () => {
    await sequelize.sync({ force: false });
  })();

  
module.exports = NewsArticle;
