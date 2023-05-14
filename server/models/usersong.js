'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSong.belongsTo(models.User, { foreignKey: "UserId" })
      UserSong.belongsTo(models.Song, { foreignKey: "SongId" })
    }
  }
  UserSong.init({
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'UserSong',
  });
  return UserSong;
};