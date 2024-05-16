'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scrapping_log extends Model {}
  scrapping_log.init({
    Scraping_history_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scrapping_log',
  });
  return scrapping_log;
};