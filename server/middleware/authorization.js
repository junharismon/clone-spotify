const { Playlists } = require('../models')

module.exports = {
    authorizationPlaylist: async (req, res, next) => {
        try {
            const id = req.params.playlistId
            const user = req.user.id
            const playlist = await Playlists.findByPk(id)
            if (!playlist) {
                throw { name: "notFound" }
            }
            if (user == playlist.UserId) {
                next()
            } else {
                throw { name: "forbiddenError" }
            }
        } catch (error) {
            next(error)
        }
    }
}