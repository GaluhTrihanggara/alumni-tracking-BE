'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumni_Sementara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alumni_Sementara.init({
    program_studi_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    nomor_induk_mahasiswa: DataTypes.INTEGER,
    kontak_telephone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('laki-laki','perempuan'),
    perguruan_tinggi: DataTypes.STRING,
    jenjang: DataTypes.STRING,
    tahun_masuk: DataTypes.STRING,
    status_mahasiswa_saat_ini: DataTypes.STRING,
    pekerjaan_saat_ini: DataTypes.STRING,
    nama_perusahaan: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Alumni_Sementara',
  });
  return Alumni_Sementara;
};