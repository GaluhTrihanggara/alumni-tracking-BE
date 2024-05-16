'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scrapping_history extends Model {}
  scrapping_history.init({
    Admin_ID: DataTypes.INTEGER,
    Nama: DataTypes.STRING,
    Waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'scrapping_history',
  });
  return scrapping_history;
};