'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Program_Studis", [
      {
        nama: "Teknik Informatika"
      },
      {
        nama: "Sistem Informasi"
      },
      {
        nama: "Desain Komunikasi Visual"
      },
      {
        nama: "Desain Produk"
      },
      {
        nama: "Desain Interior"
      },
      {
        nama: "Humas"
      },
      {
        nama: "Jurnalistik"
      },
      {
        nama: "Ilmu Hukum"
      },
      {
        nama: "Broadcasting"
      },
      {
        nama: "Akutansi"
      },
      {
        nama: "Fisioterapi"
      },
      {
        nama: "Psikologi"
      },
      {
        nama: "Farmasi"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Program_Studis", null, {});
  }
};
