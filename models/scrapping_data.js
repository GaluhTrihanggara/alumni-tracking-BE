'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scrapping_data extends Model {}
  scrapping_data.init({
    Nama: DataTypes.STRING,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scrapping_data',
  });
  return scrapping_data;
};