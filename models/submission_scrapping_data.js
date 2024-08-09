'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission_Scrapping_Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submission_Scrapping_Data.init({
    name: DataTypes.STRING,
    pddiktiInfo: DataTypes.TEXT,
    linkedInProfile: DataTypes.TEXT,
    status: DataTypes.ENUM('Pending', 'Approved', 'Rejected')
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Submission_Scrapping_Data',
  });
  return Submission_Scrapping_Data;
};