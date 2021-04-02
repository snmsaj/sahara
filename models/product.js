'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.hasMany(models.Cart, {as:'cartItems', foreignKey:'productId'})
      // Product.hasMany(models.Cart, {as:'cartItems', foreignKey:'productId'})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};