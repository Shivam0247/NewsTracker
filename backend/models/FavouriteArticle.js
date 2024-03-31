const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const FavoriteNews = sequelize.define("favorite_news", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
},
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
},{
    tableName: 'FavoriteNews',
    timestamps: false 
});

(async () => {
    await sequelize.sync({ force: false });
})();

module.exports = FavoriteNews;
