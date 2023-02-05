const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/adminController')
const campaignController = require('../controllers/campaignController')

router.get('/donations/:status', auth, adminController.getAllDonationsByStatus)
router.post('/donation/approve/:id', auth, adminController.approveDonation)
router.post('/donation/reject/:id', auth, adminController.rejectDonation)

router.get('/requests/:status', auth, adminController.getAllRequestsByStatus)
router.post('/request/approve/:id', auth, adminController.approveRequest)
router.post('/request/reject/:id', auth, adminController.rejectRequest)

// Volunteers
router.get('/volunteers', auth, adminController.getAllVolunteers)
router.get(
	'/volunteer/application/:id',
	auth,
	adminController.getVolunteerApplication
)
router.get(
	'/volunteer/pending',
	auth,
	adminController.getPendingVolunteerRequests
)
router.post(
	'/volunteer/approve/:id',
	auth,
	adminController.approveVolunteerRequest
)
router.post(
	'/volunteer/reject/:id',
	auth,
	adminController.rejectVolunteerRequest
)

router.get('/numbers', auth, adminController.getNumbers)

// Campaigns
router.get('/campaigns/:status', auth, campaignController.getCampaignsByStatus)
router.post(
	'/campaigns/:id/:status',
	auth,
	campaignController.changeStatusofCampaign
)

// Promote to admin
router.post('/promote/:id', auth, adminController.promoteToAdmin)

// Search donations
router.get('/search/donations/:query', auth, adminController.searchDonations)

// Search requests
router.get('/search/requests/:query', auth, adminController.searchRequests)

// Search volunteers
router.get('/search/volunteers/:query', auth, adminController.searchVolunteers)

module.exports = router
