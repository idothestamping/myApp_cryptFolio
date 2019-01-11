'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Valid email address required.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Your password should be between 8 and 16 characters in length.'
        }
      }
    },
    username: DataTypes.STRING,
    dob: DataTypes.DATE,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    image: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'Need valid image.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser){
        if(pendingUser){
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function(typedPasword){
    return bcrypt.compareSync(typedPasword, this.password);
  }
  return user;
};