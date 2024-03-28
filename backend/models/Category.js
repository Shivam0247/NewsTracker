const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Categories',
    timestamps: false 
});

(async () => {
    await sequelize.sync({ force: false });
  })();

module.exports = Category;
