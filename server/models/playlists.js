'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlists.hasMany(models.PlaylistSong, { foreignKey: "PlaylistId" })
      Playlists.belongsToMany(models.Song, { through: models.PlaylistSong, foreignKey: "PlaylistId" })
    }
  }
  Playlists.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        }, notEmpty: {
          msg: "UserId is required"
        }
      }
    },
    playlistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PlaylistName is required"
        }, notEmpty: {
          msg: "PlaylistName is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Playlists',
  });
  return Playlists;
};