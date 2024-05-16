'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kolaborasi_alumni extends Model {}
  kolaborasi_alumni.init({
    nama: DataTypes.STRING,
    nomor_induk_mahasiswa: DataTypes.INTEGER,
    kontak_telephone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    perguruan_tinggi: DataTypes.STRING,
    program_studi: DataTypes.STRING,
    jenjang: DataTypes.STRING,
    semester_awal: DataTypes.INTEGER,
    status_mahasiswa_saat_ini: DataTypes.STRING,
    pekerjaan_saat_ini: DataTypes.STRING,
    nama_perusahaan: DataTypes.STRING,
    alamat_perusahaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kolaborasi_alumni',
  });
  return kolaborasi_alumni;
};