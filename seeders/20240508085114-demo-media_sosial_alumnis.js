'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('media_sosial_alumnis', [{
      alumni_ID: '1',
      media_sosial_ID: '1',
      link: 'https://www.youtube.com/channel/UC318Dxel2CGJfBmiRJhNQQA'
    }]);
  },

  async down (queryInterface, Sequelize) {
  return queryInterface.bulkDelete('media_sosial_alumnis', null, {});
  }
};