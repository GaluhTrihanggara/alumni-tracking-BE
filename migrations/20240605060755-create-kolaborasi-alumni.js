'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kolaborasi_Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_studi_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      nomor_induk_mahasiswa: {
        type: Sequelize.INTEGER
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
      semester_awal: {
        type: Sequelize.STRING
      },
      status_mahasiswa_saat_ini: {
        type: Sequelize.STRING
      },
      pekerjaan_saat_ini: {
        type: Sequelize.STRING
      },
      nama_perusahaan: {
        type: Sequelize.STRING
      },
      alamat_perusahaan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kolaborasi_Alumnis');
  }
};