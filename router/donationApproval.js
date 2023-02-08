const express = require('express')
const router = express.Router()

const donationApprovalController = require('../controllers/donationApprovalCOntroller')

const auth = require('../middleware/auth')

router.post('/create-request', auth, donationApprovalController.createRequest);
router.post('/change-status-donation', auth, donationApprovalController.changeStatusOfDonationPost)
router.post('/change-request-status', auth, donationApprovalController.changeRequestOrDonationStatus)
router.get('/get-all-requests', auth, donationApprovalController.getAllRequestsByUser)

module.exports = router
