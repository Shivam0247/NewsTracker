const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at' 
  }
}, {
  tableName: 'Users',
  timestamps: false 
});

(async () => {
  await sequelize.sync({ force: false });
})();

module.exports = User;
