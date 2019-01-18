'use strict';
module.exports = (sequelize, DataTypes) => {
  const coin = sequelize.define('coin', {
    base: DataTypes.STRING,
    target: DataTypes.STRING,
    price: DataTypes.STRING,
    volume: DataTypes.STRING,
    change: DataTypes.STRING
  }, {});
  coin.associate = function(models) {
    // associations can be defined here
    models.coin.hasMany(models.market);
  };
  return coin;
};