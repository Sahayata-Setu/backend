const express = require('express')
const router = express.Router()

const donationApprovalController = require('../controllers/donationApprovalCOntroller')

const auth = require('../middleware/auth')

router.post('/create-request', auth, donationApprovalController.createRequest);
router.post('/change-status-donation', auth, donationApprovalController.changeStatusOfDonationPost)
router.post('/change-request-status', auth, donationApprovalController.changeRequestOrDonationStatus)
router.get('/get-all-requests', auth, donationApprovalController.getAllRequestsByUser)




//For creating need post donate request 
router.post('/create-need-request', auth, donationApprovalController.createNeedRequest);
router.post('/change-request-status-need', auth, donationApprovalController.changeRequestOrDonationStatusOfNeed)
router.post('/change-status-need', auth, donationApprovalController.changeStatusOfNeedPost)
router.get('/get-all-requests-need', auth, donationApprovalController.getAllRequestsByUserForNeed)


module.exports = router
