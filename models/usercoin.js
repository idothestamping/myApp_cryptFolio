'use strict';
module.exports = (sequelize, DataTypes) => {
  const userCoin = sequelize.define('userCoin', {
    coinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  userCoin.associate = function(models) {
    // associations can be defined here
  };
  return userCoin;
};