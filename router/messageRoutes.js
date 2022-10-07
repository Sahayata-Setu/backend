const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messageController')

const auth = require('../middleware/auth')

router.post('/', auth, messageController.create)
router.get('/receiver/:receiver', auth, messageController.getAllMessage)
router.get('/connected-users', auth, messageController.getAllConnectedUser)

module.exports = router
