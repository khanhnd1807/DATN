"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      becoming_offcial_employee: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      join_company: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      holidays: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      department_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      role_position: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 0
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
