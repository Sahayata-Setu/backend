const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/adminController')

module.exports = router
