'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Departments', [{
      lead: 102,
      name: "Divison 1",
      sign: "D1",
      status: 1,
    },
    {
      lead: 101,
      name: "Support group",
      sign: "SG",
      status: 1,
    }

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
