const express = require('express')
const ControllerAlbum = require('../controllers/controllerAlbum')
const router = express.Router()

router.get('/', ControllerAlbum.getAlbum)
router.get('/:albumId', ControllerAlbum.albumDetail)

module.exports = router