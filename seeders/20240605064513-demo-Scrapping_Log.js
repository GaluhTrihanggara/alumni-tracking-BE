'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Scrapping_Logs", [
      {
        scrapping_history_id: 1
      },
      {
        scrapping_history_id: 2
      },
      {
        scrapping_history_id: 3
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Scrapping_Logs", null, {});
  }
};
