//Package Imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

//Local Imports
// const userRoutes = require('./router/userRoutes')
// const adminRoutes = require('./router/adminRoutes')
const authRoutes = require('./router/authRoutes')
// const searchRoutes = require('./router/searchRoutes')
// const dashboardRoutes = require('./router/dashboardRoutes')
// const User = require('./models/user')

// const upload = require('./utils')

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(upload.array('files', 5))

//Routes
app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/admin', adminRoutes)
// app.use('/api/search', searchRoutes)
// app.use('/api/dashboard', dashboardRoutes)

mongoose
	.connect(process.env.MONGO_URL)
	.then((res) => {
		app.listen(process.env.PORT)
		console.log(`DB connected and listening on port ${process.env.PORT}`)
	})
	.catch((err) => {
		console.log(err)
	})
