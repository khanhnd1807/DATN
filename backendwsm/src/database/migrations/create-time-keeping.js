"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Timekeepings", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      create_at: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATEONLY,
      },
      check_in: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      check_out: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Timekeepings");
  },
};
