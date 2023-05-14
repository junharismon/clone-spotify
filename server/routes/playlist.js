const express = require('express')
const ControllerPlaylist = require('../controllers/controllerPlaylist')
const { authorizationPlaylist } = require('../middleware/authorization')
const ControllerSong = require('../controllers/controllerSong')
const router = express.Router()

router.get('/', ControllerPlaylist.getPlaylist)
router.post('/', ControllerPlaylist.create)
router.put('/:playlistId', authorizationPlaylist, ControllerPlaylist.update)
router.delete('/:playlistId', authorizationPlaylist, ControllerPlaylist.delete)
router.post('/:playlistId/songs/:songId', authorizationPlaylist, ControllerSong.add)
router.delete('/:playlistId/songs/:songId', authorizationPlaylist, ControllerSong.delete)
router.get('/:playlistId/songs', authorizationPlaylist, ControllerSong.playlistSong)


module.exports = router