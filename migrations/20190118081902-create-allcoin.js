'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('allcoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      coinname: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      imgurl: {
        type: Sequelize.STRING
      },
      totalcoinsupply: {
        type: Sequelize.STRING
      },
      algorithm: {
        type: Sequelize.STRING
      },
      prooftype: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('allcoins');
  }
};