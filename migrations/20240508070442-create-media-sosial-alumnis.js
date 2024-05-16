'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Media_Sosial_Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Alumni_ID: {
        type: Sequelize.INTEGER
      },
      Media_Sosial_ID: {
        type: Sequelize.INTEGER
      },
      Link: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Media_Sosial_Alumnis');
  }
};