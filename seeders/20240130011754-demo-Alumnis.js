'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Alumnis', [{
      program_studi_ID: '1',
      nama: 'Novrianta Zuhry Sembiring',
      nomor_induk_mahasiswa: '20160801252',
      kontak_telephone: '081299324165',
      password: 'Novrianta01',
      jenis_kelamin: 'Laki-Laki',
      perguruan_tinggi: 'Universitas Esa Unggul',
      jenjang: 'S1',
      semester_awal: 'Ganjil 2016',
      status_mahasiswa_saat_ini: 'Lulus',
      pekerjaan_saat_ini: 'Karyawan',
      alamat_perusahaan: 'Jl. Harapan Indah Boulevard No.2, Pusaka Rakyat, Kec. Tarumajaya, Kabupaten Bekasi, Jawa Barat 17214'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Alumnis', null, {});
  }
};
