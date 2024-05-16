'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('scrapping_histories', [{
      admin_ID: '1',
      nama: 'Penambahan data pada bagian kontak telephone',
      waktu: '1 oktober 2024'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('scrapping_histories', null, {});
  }
};