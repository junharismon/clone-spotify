'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.PlaylistSong, { foreignKey: "SongId" })
      Song.belongsTo(models.Album, { foreignKey: "AlbumId" })
      Song.belongsToMany(models.Playlists, { through: models.PlaylistSong, foreignKey: "SongId" })
      Song.belongsToMany(models.User, { through: models.UserSong, foreignKey: "SongId" })
      Song.hasMany(models.UserSong, { foreignKey: "SongId" })
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        }, notEmpty: {
          msg: "Title is required"
        }
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "artist is required"
        }, notEmpty: {
          msg: "artist is required"
        }
      }
    },
    AlbumId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    link: DataTypes.STRING,
    preview: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};