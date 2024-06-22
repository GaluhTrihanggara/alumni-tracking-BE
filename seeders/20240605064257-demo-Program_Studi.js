'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Program_Studis", [
      {
        name: "Teknik Informatika"
      },
      {
        name: "Sistem Informasi"
      },
      {
        name: "Desain Komunikasi Visual"
      },
      {
        name: "Desain Produk"
      },
      {
        name: "Desain Interior"
      },
      {
        name: "Humas"
      },
      {
        name: "Jurnalistik"
      },
      {
        name: "Ilmu Hukum"
      },
      {
        name: "Broadcasting"
      },
      {
        name: "Akutansi"
      },
      {
        name: "Fisioterapi"
      },
      {
        name: "Psikologi"
      },
      {
        name: "Farmasi"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Program_Studis", null, {});
  }
};
