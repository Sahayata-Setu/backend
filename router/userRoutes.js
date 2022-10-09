const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const volunteerController = require('../controllers/volunteerController')
const upload = require('../middleware/multer')
const auth = require('../middleware/auth')

// Donation routes
router.post(
	'/donation/create',
	auth,
	upload.array('images', 5),
	userController.createDonation
)
router.get('/donation/all', auth, userController.getAllDonations)
router.get('/donation/:id', auth, userController.getSingleDonation)
router.patch('/donation/:id', auth, userController.updateDonation)
router.delete('/donation/:id', auth, userController.deleteDonation)
router.get('/donation/user/:id', auth, userController.getDonationsByUser)
router.get('/donation/city/:city', auth, userController.getDonationsByCity)

// Request routes
router.post(
	'/request/create',
	auth,
	upload.array('images', 5),
	userController.createRequest
)
router.get('/request/all', auth, userController.getAllRequests)
router.get('/request/:id', auth, userController.getSingleRequest)
router.patch('/request/:id', auth, userController.updateRequest)
router.delete('/request/:id', auth, userController.deleteRequest)
router.get('/request/user/:id', auth, userController.getRequestsByUser)
router.get('/request/city/:city', auth, userController.getRequestsByCity)

// User routes
router.get('/profile/:id', auth, userController.getUserProfile)
router.put('/profile/:id', auth, userController.updateUserProfile)
router.patch('/profile/city/:id', auth, userController.updateUserCity)
router.patch('/profile/password/:id', auth, userController.updateUserPassword)

// Apply for volunteer
router.post(
	'/volunteer/apply',

	auth,
	upload.array('images', 2),
	volunteerController.applyForVolunteer
)

router.get('/download', userController.downloadImage)
module.exports = router
