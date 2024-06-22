'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alumni.belongsTo(models.Program_Studi, {
        foreignKey: 'program_studi_id'
      });
      Alumni.hasMany(models.Media_Sosial_Alumni, {
        foreignKey: 'alumni_id'
      });
    }
  }
  Alumni.init({
    program_studi_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    nomor_induk_mahasiswa: DataTypes.STRING,
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
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    modelName: 'Alumni',
  hooks: {
      beforeCreate: async (alumni) => {
        if (alumni.password) {
          const hash = await bcrypt.hash(alumni.password, 10);
          alumni.password = hash;
        }
      },
      beforeUpdate: async (alumni) => {
        if (alumni.password) {
          const hash = await bcrypt.hash(alumni.password, 10);
          alumni.password = hash;
        }
      }
    }
  });
  return Alumni;
};