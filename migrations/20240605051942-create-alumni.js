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
        type: Sequelize.INTEGER,
        references: {
          model: 'Program_Studis',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nama: {
        type: Sequelize.STRING
      },
      nomor_induk_mahasiswa: {
        type: Sequelize.STRING,
        unique: true
      },
      kontak_telephone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Laki-laki','Perempuan'),
        defaultValue: 'Laki-laki'
      },
      perguruan_tinggi: {
        type: Sequelize.STRING,
        defaultValue: 'Universitas Esa Unggul'
      },
      jenjang: {
        type: Sequelize.STRING
      },
      tahun_masuk: {
        type: Sequelize.STRING
      },
      status_mahasiswa_saat_ini: {
        type: Sequelize.STRING,
        defaultValue: 'Lulus'
      },
      pekerjaan_saat_ini: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: true
      },
       lama_menunggu_pekerjaan: {
        type: Sequelize.INTEGER,
      },
      gaji_pertama: {
        type: Sequelize.BIGINT,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnis');
  }
};