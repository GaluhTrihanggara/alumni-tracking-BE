'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media_Sosial_Alumni extends Model {}
  Media_Sosial_Alumni.init({
    Alumni_ID: DataTypes.INTEGER,
    Media_Sosial_ID: DataTypes.INTEGER,
    Link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Media_Sosial_Alumni',
  });
  return Media_Sosial_Alumni;
};