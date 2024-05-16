'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media_sosial extends Model {}
  media_sosial.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media_sosial',
  });
  return media_sosial;
};