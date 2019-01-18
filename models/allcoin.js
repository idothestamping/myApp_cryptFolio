'use strict';
module.exports = (sequelize, DataTypes) => {
  const allcoin = sequelize.define('allcoin', {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    coinname: DataTypes.STRING,
    url: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    totalcoinsupply: DataTypes.STRING,
    algorithm: DataTypes.STRING,
    prooftype: DataTypes.STRING
  }, {});
  allcoin.associate = function(models) {
    // associations can be defined here
  };
  return allcoin;
};