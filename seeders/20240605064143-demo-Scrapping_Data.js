'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Scrapping_Data",
    [
      { 
        name: "Penambahan data baru",
        status: "Berhasil" 
      },
      { 
        name: "Update data",
        status: "Tidak Berhasil"
      }
    ], {});
  },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Scrapping_Data", null, {});
  }
};
