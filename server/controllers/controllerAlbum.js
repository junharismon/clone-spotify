const { Album, Song } = require('../models')

class ControllerAlbum {
    static async getAlbum(req, res, next) {
        try {
            const data = await Album.findAll({
                include: [Song]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async albumDetail(req, res, next) {
        try {
            const { albumId } = req.params
            const data = await Album.findByPk(albumId)
            if (!data) {
                throw { name: "notFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerAlbum