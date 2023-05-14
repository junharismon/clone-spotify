const { Playlists, Song, PlaylistSong } = require('../models')
class ControllerPlaylist {
    static async getPlaylist(req, res, next) {
        try {
            const user = req.user.id
            const playlist = await Playlists.findAll({
                where: {
                    UserId: user
                }, include: [Song]
            })
            res.status(200).json(playlist)
        } catch (error) {
            next(error)
        }
    }
    static async create(req, res, next) {
        try {
            const UserId = req.user.id
            const { playlistName } = req.body
            const data = await Playlists.create({ UserId, playlistName })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async update(req, res, next) {
        try {
            const { playlistName } = req.body
            const { playlistId } = req.params
            const data = await Playlists.update({ playlistName }, {
                where: {
                    id: playlistId
                }
            })
            res.status(201).json({
                message: `success change name to ${playlistName}`
            })
        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const id = req.params.playlistId
            const data = await Playlists.destroy({
                where: {
                    id
                }
            })
            res.status(201).json({
                message: "Success delete playlist"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerPlaylist