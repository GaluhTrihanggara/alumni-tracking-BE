'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_Studi extends Model {}
  Program_Studi.init({
    Nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Program_Studi',
  });
  return Program_Studi;
};