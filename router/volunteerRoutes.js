const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const upload = require('../middleware/multer')
const campaignController = require('../controllers/campaignController')

router.post(
	'/campaign/create',
	auth,
	upload.array('images', 5),
	campaignController.createCampaign
)
// router.put(
// 	'/campaign/update/:id',
// 	auth,
// 	upload.array('images', 5),
// 	campaignController.updateCampaign
// )

module.exports = router
