const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/adminController')

router.get('/donations/:status', auth, adminController.getAllDonationsByStatus)

module.exports = router
