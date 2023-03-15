const { faker } = require('@faker-js/faker');
'use strict';
/** @type {import('sequelize-cli').Migration} */
let userJSON = [];
let user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: `${faker.name.firstName() + Math.random(0, 1)}@zinza.com.vn`,
  avatar: "",
  gender: true,
  birthday: new Date(),
  phone_number: "0923429464",
  address: "Hà Nội",
  password: "$2a$10$.xT2f8A4JCOlmYn6NIzlVugpCuI/a8wUbTlKLTbTbGK8shToGnbMS",
  becoming_offcial_employee: null,
  join_company: new Date(),
  holidays: 4,
  department_id: 1,
  role_position: 0,
  status: 1,

}

const setUser = (i, lastName, firstName) => {
  return {
    firstname: firstName,
    lastname: lastName,
    email: `${firstName}${i}@zinza.com.vn`,
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "0923429464",
    address: "Hà Nội",
    password: "$2a$10$.xT2f8A4JCOlmYn6NIzlVugpCuI/a8wUbTlKLTbTbGK8shToGnbMS",
    becoming_offcial_employee: null,
    join_company: new Date(),
    holidays: 4,
    department_id: 1,
    role_position: 0,
    status: 1,
  }

}


for (var i = 0; i < 100; i++) {
  lastName = faker.name.lastName()
  firstName = faker.name.firstName()
  userJSON.push(setUser(i, lastName, firstName));
}


module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users',
      [
        ...userJSON,
        {
          ...user,
          firstname: "admin",
          lastname: "admin",
          email: "admin@zinza.com.vn",
          role_position: 2,

        },
        {
          ...user,
          firstname: "leaderOne",
          lastname: "leaderOne",
          email: "lead1@zinza.com.vn",
          role_position: 1,

        },
        {
          ...user,
          firstname: "leaderTwo",
          lastname: "leaderTwo",
          email: "lead2@zinza.com.vn",
          role_position: 1,
          department_id: 2

        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
