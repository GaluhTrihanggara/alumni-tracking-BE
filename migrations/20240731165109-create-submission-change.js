'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submission_Changes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alumni_id: {
        type: Sequelize.INTEGER
      },
      changes: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Submission_Changes');
  }
};