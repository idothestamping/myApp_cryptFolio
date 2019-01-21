'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.STRING
      },
      Url: {
        type: Sequelize.STRING
      },
      ImageUrl: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Symbol: {
        type: Sequelize.STRING
      },
      CoinName: {
        type: Sequelize.STRING
      },
      FullName: {
        type: Sequelize.STRING
      },
      Algorithm: {
        type: Sequelize.STRING
      },
      ProofType: {
        type: Sequelize.STRING
      },
      FullyPremined: {
        type: Sequelize.STRING
      },
      TotalCoinSupply: {
        type: Sequelize.STRING
      },
      BuiltOn: {
        type: Sequelize.STRING
      },
      SmartContractAddress: {
        type: Sequelize.TEXT
      },
      PreMinedValue: {
        type: Sequelize.STRING
      },
      TotalCoinsFreeFloat: {
        type: Sequelize.STRING
      },
      SortOrder: {
        type: Sequelize.STRING
      },
      Sponsored: {
        type: Sequelize.BOOLEAN
      },
      IsTrading: {
        type: Sequelize.BOOLEAN
      },
      TotalCoinsMined: {
        type: Sequelize.STRING
      },
      BlockNumber: {
        type: Sequelize.INTEGER
      },
      NetHashesPerSecond: {
        type: Sequelize.DECIMAL
      },
      BlockReward: {
        type: Sequelize.INTEGER
      },
      BlockTime: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('coins');
  }
};