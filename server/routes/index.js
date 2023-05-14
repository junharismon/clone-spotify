const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerPlaylist = require('./playlist')
const routerSong = require('./song')
const routerAlbum = require('./album')
const { authentication } = require('../middleware/authentication')

router.use('/users', routerUser)
router.use('/songs', routerSong)
router.use('/albums', routerAlbum)
router.use(authentication)
router.use('/playlist', routerPlaylist)

module.exports = router