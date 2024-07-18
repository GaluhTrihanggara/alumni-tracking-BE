'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Alumni_Sementaras', [
      {
        program_studi_id: 1,
        nama: 'John Doe',
        nomor_induk_mahasiswa: 123456,
        kontak_telephone: 628123456789,
        password: 'password123',
        jenis_kelamin: 'laki-laki',
        perguruan_tinggi: 'Universitas Indonesia',
        jenjang: 'S1',
        tahun_masuk: '2015',
        status_mahasiswa_saat_ini: 'Lulus',
        pekerjaan_saat_ini: 'Software Engineer',
        nama_perusahaan: 'Tech Corp',
        status: 'Pending'
      },
      {
        program_studi_id: 2,
        nama: 'Jane Smith',
        nomor_induk_mahasiswa: 654321,
        kontak_telephone: 628987654321,
        password: 'password456',
        jenis_kelamin: 'perempuan',
        perguruan_tinggi: 'Universitas Gadjah Mada',
        jenjang: 'S2',
        tahun_masuk: '2016',
        status_mahasiswa_saat_ini: 'Lulus',
        pekerjaan_saat_ini: 'Data Analyst',
        nama_perusahaan: 'Data Inc',
        status: 'Pending'
      }
      // Tambahkan data lainnya di sini
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Alumni_Sementaras', null, {});
  }
};
