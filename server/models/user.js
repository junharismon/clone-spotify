'use strict';
const {
  Model
} = require('sequelize');
const { formatHash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Playlists, { foreignKey: "UserId" })
      User.hasMany(models.UserSong, { foreignKey: "UserId" })
      User.belongsToMany(models.Song, { through: models.UserSong, foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        }, notEmpty: {
          msg: "Username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        }, notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        }, notEmpty: {
          msg: "Password is required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Member"
    },
    isSubscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    imageUrl: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = formatHash(user.password)
  })
  return User;
};