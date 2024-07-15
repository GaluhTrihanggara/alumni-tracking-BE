'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_studi_id: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      nomor_induk_mahasiswa: {
        type: Sequelize.STRING
      },
      kontak_telephone: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('laki-laki','perempuan'),
        defaultValue: 'laki-laki'
      },
      perguruan_tinggi: {
        type: Sequelize.STRING
      },
      jenjang: {
        type: Sequelize.STRING
      },
      tahun_masuk: {
        type: Sequelize.STRING
      },
      status_mahasiswa_saat_ini: {
        type: Sequelize.STRING
      },
      pekerjaan_saat_ini: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnis');
  }
};