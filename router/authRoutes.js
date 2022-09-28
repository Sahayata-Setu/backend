const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const authController = require('../controllers/authController')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
// router.post('/forgot-password', authController.askResetPassword)
// router.post('/reset-password', authController.resetPassword)
// router.post('/logout', authController.postLogout)
// router.get('/username-available', authController.isUserNameAvailable)

module.exports = router
