const { Op } = require('sequelize')
const { Song, PlaylistSong, Playlists, Album, UserSong } = require('../models')

class ControllerSong {
    static async add(req, res, next) {
        try {
            const { playlistId, songId } = req.params
            const findData = await PlaylistSong.findOne({
                where: {
                    PlaylistId: playlistId,
                    SongId: songId
                }
            })
            if (findData) {
                throw { name: "alreadyExist" }
            }
            const song = await Song.findByPk(songId)
            if (!song) {
                throw { name: "notFound" }
            }

            const data = await PlaylistSong.create({ PlaylistId: playlistId, SongId: songId })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const { playlistId, songId } = req.params
            const data = await PlaylistSong.findOne({
                where: {
                    PlaylistId: playlistId,
                    SongId: songId
                }
            })
            if (!data) {
                throw { name: "notFound" }
            }

            const song = await PlaylistSong.destroy({
                where: {
                    PlaylistId: playlistId,
                    SongId: songId
                }
            })
            res.status(200).json({
                message: "Success remove song of playlist"
            })
        } catch (error) {
            next(error)
        }
    }
    static async playlistSong(req, res, next) {
        try {
            const { playlistId } = req.params
            const data = await Playlists.findOne({
                where: {
                    id: playlistId
                }, include: [Song]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getSong(req, res, next) {
        try {
            const { songId } = req.params
            const data = await Song.findOne({
                where: {
                    id: songId
                }, include: [Album]
            })
            if (!data) {
                throw { name: "notFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getSongSearch(req, res, next) {
        try {
            const { title } = req.query
            const filter = title ? { title: { [Op.iLike]: `%${title}%` } } : null
            const data = await Song.findAll({
                where: filter,
                include: [Album]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addSong(req, res, next) {
        try {

            const UserId = req.user.id
            const music = req.body
            console.log(music);
            const findAlbum = await Album.findByPk(music.album.id)
            let album = findAlbum
            if (!findAlbum) {
                album = await Album.create({
                    id: music.album.id,
                    title: music.title,
                    artist: music.artist.name,
                    imageUrl: music.album.cover_medium
                })
            }
            let song = await Song.findByPk(music.id)
            if (!song) {
                song = await Song.create({
                    id: music.id,
                    title: music.title,
                    artist: music.artist.name,
                    AlbumId: album.id,
                    imageUrl: music.artist.picture,
                    link: music.link,
                    preview: music.preview
                })
            }
            let usersong = await UserSong.findOne({ where: { SongId: song.id } })
            if (usersong) {
                throw { name: "alreadyExist" }
            }
            const data = await UserSong.create({ UserId, SongId: song.id })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async likedSong(req, res, next) {
        try {
            const UserId = req.user.id
            const data = await UserSong.findAll({
                where: {
                    UserId
                }, include: [Song]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteSong(req, res, next) {
        try {
            const SongId = req.params.songId
            const UserId = req.user.id
            console.log(SongId, UserId, "<<<<<<");
            const song = await Song.findByPk(SongId)
            if (!song) {
                throw { name: "notFound" }
            }
            await UserSong.destroy({
                where: {
                    UserId, SongId
                }
            })
            res.status(200).json({
                message: `Succes remove ${song.title}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerSong