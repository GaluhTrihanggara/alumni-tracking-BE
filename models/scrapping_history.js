'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scrapping_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Scrapping_History.belongsTo(models.Admin, {
        foreignKey: 'admin_id'
      });
    }
  }
  Scrapping_History.init({
    alumni_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Scrapping_History',
  });
  return Scrapping_History;
};