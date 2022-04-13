'use strict';
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up (queryInterface, Sequelize) {   
    await queryInterface.bulkInsert("Users", [{
      firstName: "Admin",
      lastName: "Admin",
      username: "admin",
      password: await bcrypt.hash("admin", saltRounds),
      role:"admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
