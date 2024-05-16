'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('feedbacks', [{
      alumni_ID: '1',
      isi_feedback: 'Sistem sudah bagus dalam melakukan pelacakan alumni'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('feedbacks', null, {});
  }
};