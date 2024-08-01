'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Submission_Changes', [
      {
        alumni_id: 1,
        changes: JSON.stringify({
          nama: 'John Doe',
          kontak_telephone: '08123456789'
        }),
        status: 'Pending'
      },
      {
        alumni_id: 2,
        changes: JSON.stringify({
          pekerjaan_saat_ini: 'Software Engineer',
          nama_perusahaan: 'Tech Corp'
        }),
        status: 'Pending'
      },
      {
        alumni_id: 3,
        changes: JSON.stringify({
          jenjang: 'Magister',
          perguruan_tinggi: 'University of Technology'
        }),
        status: 'Pending'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Submission_Changes', null, {});
  }
};