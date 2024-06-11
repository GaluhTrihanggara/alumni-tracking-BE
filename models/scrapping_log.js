'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scrapping_Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scrapping_Log.init({
    scrapping_history_id: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Scrapping_Log',
  });
  return Scrapping_Log;
};