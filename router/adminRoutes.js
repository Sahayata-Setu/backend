const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/adminController')

router.get('/donations/:status', auth, adminController.getAllDonationsByStatus)
router.post('/donation/approve/:id', auth, adminController.approveDonation)
router.post('/donation/reject/:id', auth, adminController.rejectDonation)

router.get('/requests/:status', auth, adminController.getAllRequestsByStatus)
router.post('/request/approve/:id', auth, adminController.approveRequest)
router.post('/request/reject/:id', auth, adminController.rejectRequest)

router.get('/numbers', auth, adminController.getNumbers)

module.exports = router
