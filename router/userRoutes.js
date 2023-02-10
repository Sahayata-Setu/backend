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
router.put('/donation/:id', auth, userController.updateDonation)
router.delete('/donation/:id', auth, userController.deleteDonation)
router.get('/donation/user/:id', auth, userController.getDonationsByUser)
router.get('/donation/city/:city', auth, userController.getDonationsByCity)
router.get(
	'/donation/status/:status',
	auth,
	userController.getDonationsByStatus
)
router.get(
	'/donation/category/:category',
	auth,
	userController.getDonationsByCategory
)

// Request routes
router.post(
	'/request/create',
	auth,
	upload.array('images', 5),
	userController.createRequest
)
router.get(
	'/request/category/:category',
	auth,
	userController.getRequestsByCategory
)
router.get('/request/:id', auth, userController.getSingleRequest)
router.put('/request/:id', auth, userController.updateRequest)
router.delete('/request/:id', auth, userController.deleteRequest)

// get requests by user
router.get('/request/user/:id', auth, userController.getRequestsByUser)
router.get('/request/city/:city', auth, userController.getRequestsByCity)

// User routes
router.get('/profile/:id', auth, userController.getUserProfile)
router.put('/profile/:id', auth, userController.updateUserProfile)
router.put('/profile/city/:id', auth, userController.updateUserCity)
router.put('/profile/password/:id', auth, userController.updateUserPassword)

// Certificate
router.get(
	'/certificate/eligible',
	auth,
	userController.isEligableForCertificate
)
// Generate certificate
router.get('/certificate/generate', auth, userController.generateCertificate)

// Apply for volunteer
router.post(
	'/volunteer/apply',

	auth,
	upload.array('images', 2),
	volunteerController.applyForVolunteer
)

// Explore
router.get('/explore/donations', auth, userController.exploreDonations)
router.get('/explore/requests', auth, userController.exploreRequests)
router.get(
	'/explore/requests/:category',
	auth,
	userController.exploreRequestsByCategory
)
router.get(
	'/explore/donations/:category',
	auth,
	userController.exploreDonationsByCategory
)
router.get('/explore/campaigns', auth, userController.exploreCampaigns)
router.get('/campaigns/:id', auth, userController.getSingleCampaigns)

// Search donations
router.get('/search/donations/:query', auth, userController.searchDonations)

// Search requests
router.get('/search/requests/:query', auth, userController.searchRequests)

// Search Campaigns
router.get('/search/campaigns/:query', auth, userController.searchCampaigns)

// Combined search (donations, requests, campaigns)
router.get('/search/:query', auth, userController.search)

// create donation location
router.post('/donation-location', auth, userController.createDonationLocation)

module.exports = router
