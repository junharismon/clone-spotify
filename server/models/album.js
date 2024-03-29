'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Song, { foreignKey: "AlbumId" })
    }
  }
  Album.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    releaseDate: {
      type: DataTypes.STRING,
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  })
  return Album;
};