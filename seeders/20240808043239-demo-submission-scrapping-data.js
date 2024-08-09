'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Submission_Scrapping_Data', [
    {
        name: 'John Doe',
        pddiktiInfo: `{
          "nomor_induk_mahasiswa": "123456789",
          "program_studi_id": 1,
          "kontak_telephone": "081234567890",
          "jenis_kelamin": "laki-laki",
          "perguruan_tinggi": "Universitas Esa Unggul",
          "jenjang": "S1",
          "tahun_masuk": "2015",
          "status_mahasiswa_saat_ini": "Lulus"
        }`,
        linkedInProfile: `{
          "jobTitle": "Software Engineer",
          "companyName": "Tech Company"
        }`,
        status: 'pending'
      },
      {
        name: 'Jane Smith',
        pddiktiInfo: `{
          "nomor_induk_mahasiswa": "987654321",
          "program_studi_id": 2,
          "kontak_telephone": "081234567891",
          "jenis_kelamin": "perempuan",
          "perguruan_tinggi": "Universitas Esa Unggul",
          "jenjang": "S2",
          "tahun_masuk": "2016",
          "status_mahasiswa_saat_ini": "Lulus"
        }`,
        linkedInProfile: `{
          "jobTitle": "Data Scientist",
          "companyName": "Analytics Company"
        }`,
        status: 'pending'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Submission_Scrapping_Data', null, {})
  }
};
