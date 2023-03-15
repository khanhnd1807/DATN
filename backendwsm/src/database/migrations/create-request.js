"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Requests", {
      request_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      detail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email_leader: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null
      },
      email_user: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      time_start: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      time_end: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      notify_status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      status_exist: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Requests");
  },
};
