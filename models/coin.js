'use strict';
module.exports = (sequelize, DataTypes) => {
  const coin = sequelize.define('coin', {
    Id: DataTypes.STRING,
    Url: DataTypes.STRING,
    ImageUrl: DataTypes.STRING,
    Name: DataTypes.STRING,
    Symbol: DataTypes.STRING,
    CoinName: DataTypes.STRING,
    FullName: DataTypes.STRING,
    Algorithm: DataTypes.STRING,
    ProofType: DataTypes.STRING,
    FullyPremined: DataTypes.STRING,
    TotalCoinSupply: DataTypes.STRING,
    BuiltOn: DataTypes.STRING,
    SmartContractAddress: DataTypes.TEXT,
    PreMinedValue: DataTypes.STRING,
    TotalCoinsFreeFloat: DataTypes.STRING,
    SortOrder: DataTypes.STRING,
    Sponsored: DataTypes.BOOLEAN,
    IsTrading: DataTypes.BOOLEAN,
    TotalCoinsMined: DataTypes.STRING,
    BlockNumber: DataTypes.INTEGER,
    NetHashesPerSecond: DataTypes.DECIMAL,
    BlockReward: DataTypes.INTEGER,
    BlockTime: DataTypes.INTEGER
  }, {});
  coin.associate = function(models) {
    models.coin.belongsToMany(models.user, {through: "userCoin"});
    // associations can be defined here
  };
  return coin;
};