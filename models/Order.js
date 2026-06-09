const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {

  nim: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  buyerName: {
  type: DataTypes.STRING,
  allowNull: true,
},

  buyerRealName: {
  type: DataTypes.STRING,
},

 sellerName: {
  type: DataTypes.STRING,
},

sellerRealName: {
  type: DataTypes.STRING,
},

  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  building: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  room: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
  type: DataTypes.STRING,
  defaultValue: "Menunggu"
},

  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  copies: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  color: {
  type: DataTypes.STRING,
  allowNull: true,
},

paperSize: {
  type: DataTypes.STRING,
  allowNull: true,
},

});

module.exports = Order;