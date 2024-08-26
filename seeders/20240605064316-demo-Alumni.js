'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert("Alumnis", [
      {
        program_studi_id: 1,
        nama: "Novrianta Zuhry Sembiring",
        nomor_induk_mahasiswa: "20160801252",
        kontak_telephone: "1234567890",
        password: await bcrypt.hash("Novrianta1", salt),
        jenis_kelamin: 'laki-laki',
        perguruan_tinggi: 'Universitas Esa Unggul',
        jenjang: 'Sarjana',
        tahun_masuk: '2016',
        status_mahasiswa_saat_ini: 'Lulus',
        pekerjaan_saat_ini: 'Software Engineer',
        nama_perusahaan: 'Tech Company Inc.',
        lama_menunggu_pekerjaan: 6,  // 6 bulan
        gaji_pertama: 7000000 // Rp 7.000.000
      },
      {
        program_studi_id: 2,
        nama: 'Galuh Trihanggara',
        nomor_induk_mahasiswa: "20200901239",
        kontak_telephone: "9876543210",
        password: await bcrypt.hash('Galuh01', salt),
        jenis_kelamin: 'laki-laki',
        perguruan_tinggi: 'Universitas Esa Unggul',
        jenjang: 'Sarjana',
        tahun_masuk: '2020',
        status_mahasiswa_saat_ini: 'Belum Lulus',
        pekerjaan_saat_ini: 'Data Analyst',
        nama_perusahaan: 'Data Insights Ltd.',
        lama_menunggu_pekerjaan: 6,  // 6 bulan
        gaji_pertama: 7000000 // Rp 7.000.000
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Alumnis", null, {});
  }
};