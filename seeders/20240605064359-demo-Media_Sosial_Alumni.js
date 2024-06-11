'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Media_Sosial_Alumnis", [
      {
        alumni_id: "1",
        media_sosial_id: "4",
        link: "https://www.linkedin.com/in/sbr-novrianta/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=id"
      },
      {
        alumni_id: "2",
        media_sosial_id: "4",
        link: "https://www.linkedin.com/in/galuh-trihanggara-803a33260/"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Media_Sosial_Alumnis", null, {});
  }
};
