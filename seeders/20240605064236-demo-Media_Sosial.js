'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Media_Sosials", 
    [
      {
        name: "Instagram"
      },
      {
        name: "Twitter"
      },
      {
        name: "Youtube"
      },
      {
        name: "Linkedin"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Media_Sosials", null, {});
  }
};
