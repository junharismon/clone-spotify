'use strict';
const axios = require('axios')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: 'a' },
        headers: {
          'X-RapidAPI-Key': '159f5e6cafmshce3552094cff361p1dda56jsndb8406552046',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      })

      // console.log(data.data[0]);
      const albums = data.data.map((el) => {
        return {
          id: el.album.id,
          title: el.album.title,
          artist: el.artist.name,
          releaseDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrl: el.album.cover,
        };
      });
      // console.log(albums[0]);
      const songs = data.data.map((el) => {
        return {
          id: el.id,
          title: el.title,
          artist: el.artist.name,
          AlbumId: el.album.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrl: el.artist.picture,
          link: el.link,
          preview: el.preview
        };
      });

      // console.log(songs);
      await queryInterface.bulkInsert('Albums', albums, {})
      await queryInterface.bulkInsert('Songs', songs, {})


    } catch (err) {
      console.log(err)
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
