'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alumni extends Model {}
  alumni.init({
    Program_Studi_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nomor_Induk_Mahasiswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Kontak_Telephone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Jenis_Kelamin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Perguruan_Tinggi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Jenjang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Semester_Awal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Status_Mahasiswa_Saat_ini: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pekerjaan_Saat_Ini: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nama_Perusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Alamat_Perusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'alumni',
  });
  return alumni;
};