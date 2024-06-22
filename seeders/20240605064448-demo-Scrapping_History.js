'use strict';

const alumni = require('../models/alumni');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Scrapping_Histories", [
      {
        alumni_id: 1, 
        name: "Penamabahan Data Baru Alumni",
        Waktu: new Date('2022-01-01T00:00:00.000Z')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Scrapping_Histories", null, {});
  }
};
