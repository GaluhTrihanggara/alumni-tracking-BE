'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Alumnis", [
      {
        program_studi_id: 1, // Assuming there is a Program Studi with ID 1
        nama: "Novrianta Zuhry Sembiring",
        nomor_induk_mahasiswa: 20160801252,
        kontak_telephone: 1234567890,
        password: "Novrianta1", // Note: Do not store plain-text passwords in a real application
        jenis_kelamin: 'laki-laki',
        perguruan_tinggi: 'Universitas Esa Unggul',
        jenjang: 'S1',
        tahun_masuk: '2016',
        status_mahasiswa_saat_ini: 'Lulus',
        pekerjaan_saat_ini: 'Software Engineer',
        nama_perusahaan: 'Tech Company Inc.',
      },
      {
        program_studi_id: 2, // Assuming there is a Program Studi with ID 2
        nama: 'Galuh Trihanggara',
        nomor_induk_mahasiswa: 20200801139,
        kontak_telephone: 9876543210,
        password: 'Galuh01', // Note: Do not store plain-text passwords in a real application
        jenis_kelamin: 'laki-laki',
        perguruan_tinggi: 'Universitas Esa Unggul',
        jenjang: 'S1',
        tahun_masuk: '2020',
        status_mahasiswa_saat_ini: 'Belum Lulus',
        pekerjaan_saat_ini: 'Data Analyst',
        nama_perusahaan: 'Data Insights Ltd.',
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Alumnis", null, {});
  }
};
