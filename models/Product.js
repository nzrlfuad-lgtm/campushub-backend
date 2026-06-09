const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  type: DataTypes.STRING,
  
  image: {
    type: DataTypes.STRING,
  },

  sellerName: {
    type: DataTypes.STRING,
  },

  sellerRealName: {
    type: DataTypes.STRING,
  },
  
});

module.exports = Product;