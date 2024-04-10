"use strict";

const faker = require("@faker-js/faker");
// import faker from '@faker-js/faker'
// const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesData = [
      { value: "Fiction" },
      { value: "Non-fiction" },
      { value: "Science" },
      { value: "History" },
      { value: "Biography" },
    ];

    await queryInterface.bulkInsert("Categories", categoriesData, {});
  //   const booksData = [];

  //   for (let i = 0; i < 100; i++) {
  //     const book = {
  //       title: faker.lorem.sentence(),
  //       price: faker.random.number({ min: 10, max: 100, precision: 0.01 }),
  //       available: faker.random.number({ min: 1, max: 50 }),
  //       image: faker.image.imageUrl(),
  //       description: faker.lorem.paragraphs(),
  //       category_id: faker.random.number({ min: 1, max: 5 }),
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //     booksData.push(book);
  //   }

  //   await queryInterface.bulkInsert("Books", booksData, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
