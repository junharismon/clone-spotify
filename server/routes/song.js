const express = require('express')
const ControllerSong = require('../controllers/controllerSong')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

router.get('/', ControllerSong.getSongSearch)
router.get('/likedsong', authentication, ControllerSong.likedSong)
router.get('/:songId', ControllerSong.getSong)
router.post('/:songId', authentication, ControllerSong.addSong)
router.delete('/:songId', authentication, ControllerSong.deleteSong)

module.exports = router