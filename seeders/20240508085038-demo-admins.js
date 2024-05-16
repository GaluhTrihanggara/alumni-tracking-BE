'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admins', [{
      nama: 'Bagus Iskandar',
      email: 'Bagus01@gmail.com',
      password: 'Bagus01'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('admins', null, {});
  }
};