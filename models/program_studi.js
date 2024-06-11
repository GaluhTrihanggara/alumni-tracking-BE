'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_Studi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Program_Studi.hasOne(models.Alumni, {
        foreignKey: 'program_studi_id'
      });
    }
  }
  Program_Studi.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Program_Studi',
  });
  return Program_Studi;
};