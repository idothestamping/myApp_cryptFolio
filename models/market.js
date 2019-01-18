'use strict';
module.exports = (sequelize, DataTypes) => {
  const market = sequelize.define('market', {
    market: DataTypes.STRING,
    price: DataTypes.STRING,
    volume: DataTypes.INTEGER
  }, {});
  market.associate = function(models) {
    models.market.belongsTo(models.coin);
  };
  return market;
};