'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kolaborasi_Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kolaborasi_Alumni.init({
    program_studi_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    nomor_induk_mahasiswa: DataTypes.INTEGER,
    kontak_telephone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('laki-laki','perempuan'),
    perguruan_tinggi: DataTypes.STRING,
    jenjang: DataTypes.STRING,
    semester_awal: DataTypes.STRING,
    status_mahasiswa_saat_ini: DataTypes.STRING,
    pekerjaan_saat_ini: DataTypes.STRING,
    nama_perusahaan: DataTypes.STRING,
    alamat_perusahaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kolaborasi_Alumni',
  });
  return Kolaborasi_Alumni;
};