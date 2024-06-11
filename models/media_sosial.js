'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media_Sosial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media_Sosial.hasMany(models.Media_Sosial_Alumni, {
        foreignKey: 'media_sosial_id'
      });
    }
  }
  Media_Sosial.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Media_Sosial',
  });
  return Media_Sosial;
};