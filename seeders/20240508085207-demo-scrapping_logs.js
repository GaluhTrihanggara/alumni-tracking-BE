'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('scrapping_logs', [{
      scrapping_history_ID: '1'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('scrapping_logs', null, {});
  }
};