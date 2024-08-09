'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submission_Scrapping_Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      pddiktiInfo: {
        type: Sequelize.TEXT
      },
      linkedInProfile: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Submission_Scrapping_Data');
  }
};