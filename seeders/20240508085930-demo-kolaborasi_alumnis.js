'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kolaborasi_alumnis', [{
      nama: 'Alif Maulidanar',
      nomor_induk_mahasiswa: '20200801095',
      kontak_telephone: '081299324121',
      password: 'Alif103',
      jenis_kelamin: 'Laki-Laki',
      perguruan_tinggi: 'Universitas Esa Unggul',
      program_studi: 'Teknik Informatika',
      jenjang: 'S1',
      semester_awal: 'Ganjil 2016',
      status_mahasiswa_saat_ini: 'Lulus',
      pekerjaan_saat_ini: 'Konsultan IT',
      alamat_perusahaan: 'Jl. Harapan Indah Boulevard No.2, Pusaka Rakyat, Kec. Tarumajaya, Kabupaten Bekasi, Jawa Barat 17214'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('kolaborasi_alumnis', null, {});
  }
};
