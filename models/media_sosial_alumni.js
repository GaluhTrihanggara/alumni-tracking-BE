'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media_Sosial_Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media_Sosial_Alumni.belongsTo(models.Media_Sosial, {
        foreignKey: 'media_sosial_id'
      });
      Media_Sosial_Alumni.belongsTo(models.Alumni, {
        foreignKey: 'alumni_id'
      });
    }
  }
  Media_Sosial_Alumni.init({
    alumni_id: DataTypes.STRING,
    media_sosial_id: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Media_Sosial_Alumni',
  });
  return Media_Sosial_Alumni;
};