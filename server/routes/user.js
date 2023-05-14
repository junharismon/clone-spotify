const express = require('express')
const ControllerUser = require('../controllers/controllerUser')
const { authenticationAdmin } = require('../middleware/authentication')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.get('/', ControllerUser.getUser)
router.post('/sign-google', ControllerUser.google)
router.get('/profil', authentication, ControllerUser.getUserDetail)
router.patch('/subscribe', authentication, ControllerUser.subscribe)
router.post('/generate-token-midtrans', authentication, ControllerUser.generateToken)
router.use(authenticationAdmin)
router.get('/:userId', ControllerUser.userDetail)

module.exports = router