'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('scrapping_datas', [{
      nama: 'Bradley Andrew Ercole',
      status: 'Penambahan data'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('scrapping_datas', null, {});
  }
};