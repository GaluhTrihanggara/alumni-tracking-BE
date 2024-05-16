'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('media_sosials', [{
      nama: 'Facebook,youtube,twitter,instagram'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('media_sosials', null, {});
  }
};