'use strict';
module.exports = (sequelize, DataTypes) => {
  const cointype = sequelize.define('cointype', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    statuses: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  cointype.associate = function(models) {
    // associations can be defined here
  };
  return cointype;
};