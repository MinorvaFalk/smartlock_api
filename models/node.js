'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Room);
    }
  };
  Node.init({
    name: DataTypes.STRING,
    version: DataTypes.INTEGER,
    status: DataTypes.STRING,
    last_check: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};