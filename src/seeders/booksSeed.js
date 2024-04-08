"use strict";

import jsonData from '../../data/data.json'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = Object.key(jsonData)
    const categoriesData = categories.map(category => ({
      value: category,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert("Categories", categoriesData, {});

    // const booksData = jsonData.map((item) => ({
    //   id: item.upc,
    //   title: item.bookTitle,
    //   price: item.bookPrice,
    //   available: item.noAvailable,
    //   image: item.imageUrl,
    //   description: item.bookDescription,
    //   category_id: categoriesData.id,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }));
    // await queryInterface.bulkInsert("Books", booksData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

    // await queryInterface.bulkDelete('Books', null, {});
  },
};
