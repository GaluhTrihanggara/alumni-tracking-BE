'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Admins", [
      {
        name: "Budi",
        email: "Budi01@gmail.com",
        password: "12345"
      },
      {
        name: "Dandi",
        email: "Dandi01@gmail.com",
        password: "12345"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  }
};