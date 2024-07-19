'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345', 10);
    await queryInterface.bulkInsert("Admins", [
      {
        name: "Budi",
        email: "Budi01@gmail.com",
        password: hashedPassword
      },
      {
        name: "Dandi",
        email: "Dandi01@gmail.com",
        password: hashedPassword
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  }
};