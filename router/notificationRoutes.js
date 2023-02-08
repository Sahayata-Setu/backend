const express = require('express')
const router = express.Router()

const notificationController = require('../controllers/notificationController')

const auth = require('../middleware/auth')

router.post('/', auth, notificationController.create)
router.get('/:userId', auth, notificationController.getAllNotification)
router.get(
	'/count/:userId',
	auth,
	notificationController.getUnreadNotificationCount
)
router.post('/read/:notificationId', auth, notificationController.markAsRead)

module.exports = router
