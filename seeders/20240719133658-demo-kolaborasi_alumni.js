'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kolaborasi_Alumnis', [
      { 
        program_studi_id: 1,
        nama: "Ahmad",
        nomor_induk_mahasiswa: "20160801001",
        kontak_telephone: "081234567890",
        password: "hashedPassword1",
        jenis_kelamin: "laki-laki",
        perguruan_tinggi: "Universitas ABC",
        jenjang: "S1",
        tahun_masuk: "2016",
        status_mahasiswa_saat_ini: "Lulus",
        pekerjaan_saat_ini: "Engineer",
        nama_perusahaan: "Tech Corp",
        status: "Pending",
        media_sosial_data: JSON.stringify([
          { media_sosial_id: '1', link: 'https://facebook.com/johndoe' },
          { media_sosial_id: '2', link: 'https://twitter.com/johndoe' }
        ])
      },
      {
        program_studi_id: 2,
        nama: "Siti",
        nomor_induk_mahasiswa: "20160801002",
        kontak_telephone: "081234567891",
        password: "hashedPassword2",
        jenis_kelamin: "perempuan",
        perguruan_tinggi: "Universitas XYZ",
        jenjang: "S1",
        tahun_masuk: "2016",
        status_mahasiswa_saat_ini: "Lulus",
        pekerjaan_saat_ini: "Analyst",
        nama_perusahaan: "Data Inc",
        status: "Approved",
        media_sosial_data: JSON.stringify([
          { media_sosial_id: '1', link: 'https://facebook.com/johndoe' },
          { media_sosial_id: '2', link: 'https://twitter.com/johndoe' }
        ])
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kolaborasi_Alumnis', null, {});
  }
};
