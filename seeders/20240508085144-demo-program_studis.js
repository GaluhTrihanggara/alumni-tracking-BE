'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('program_studis', [{
      nama: 'Teknik Informatika, Sistem Informasi, Hukum, Fisiotrapi'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('program_studis', null, {});
  }
};