'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission_Change extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Submission_Change.belongsTo(models.Alumni, { 
      foreignKey: 'alumni_id' 
    });
    }
  }
  Submission_Change.init({
    alumni_id: DataTypes.INTEGER,
    changes: DataTypes.JSON,
    status: DataTypes.ENUM('Pending', 'Approved', 'Rejected')
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Submission_Change',
  });
  return Submission_Change;
};