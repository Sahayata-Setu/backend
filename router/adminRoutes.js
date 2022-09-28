const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/adminController')

router.get('/status/:status', auth, adminController.getPostsByStatus)
router.post('/update-status', auth, adminController.updatePostStatus)
router.post('/assign-reward-point', auth, adminController.assignRewardPoints)

module.exports = router
