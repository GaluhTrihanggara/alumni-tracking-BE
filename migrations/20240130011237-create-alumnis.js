'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Program_Studi_ID: {
        type: Sequelize.INTEGER
      },
      Nama: {
        type: Sequelize.STRING
      },
      Nomor_Induk_Mahasiswa: {
        type: Sequelize.INTEGER
      },
      Kontak_Telephone: {
        type: Sequelize.INTEGER
      },
      Password: {
        type: Sequelize.STRING
      },
      Jenis_Kelamin: {
        type: Sequelize.STRING
      },
      Perguruan_Tinggi: {
        type: Sequelize.STRING
      },
      Jenjang: {
        type: Sequelize.STRING
      },
      Semester_Awal: {
        type: Sequelize.INTEGER
      },
      Status_Mahasiswa_Saat_ini: {
        type: Sequelize.STRING
      },
      Pekerjaan_Saat_Ini: {
        type: Sequelize.STRING
      },
      Nama_Perusahaan: {
        type: Sequelize.STRING
      },
      Alamat_perusahaan: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnis');
  }
};