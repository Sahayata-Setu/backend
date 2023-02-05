//Package Imports
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
// const io = new Server(server);
var io = require('socket.io')(server, { pingTimeout: 60000 })

//Local Imports
const authRoutes = require('./router/authRoutes')
const userRoutes = require('./router/userRoutes')
const adminRoutes = require('./router/adminRoutes')
const volunteerRoutes = require('./router/volunteerRoutes')
const messageRoutes = require('./router/messageRoutes')
// const searchRoutes = require('./router/searchRoutes')
// const dashboardRoutes = require('./router/dashboardRoutes')
// const User = require('./models/user')

// const upload = require('./utils')
let messages = []
const activeUsers = new Set()
let users = []

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(upload.array('files', 5))

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/volunteer', volunteerRoutes)
// app.use('/api/search', searchRoutes)
// app.use('/api/dashboard', dashboardRoutes)

//Socket connection for messaging
io.on('connection', (socket) => {
	socket.on('connect-new-user', function name(data) {
		users[data] = socket.id
		activeUsers.add(data)
		io.emit('connect-new-user', [...activeUsers])
	})

	//Send message to the specific user
	socket.on('send-message-to-specific-user', function name(msg) {
		io.to(users[msg.reciever]).emit('send-message-to-specific-user', msg)
		io.to(users[msg.sender]).emit('send-message-to-specific-user', msg)
	})

	//On disconnect
	socket.on('disconnet', function name(data) {
		if (activeUsers.has(data)) {
			activeUsers.delete(data)
			io.emit('user-disconnected', [...activeUsers])
		} else {
			// console.log(data);
			console.log('Not')
		}
	})
	console.log('a user connected')
})

mongoose
	.connect(process.env.MONGO_URL)
	.then((res) => {
		server.listen(process.env.PORT)
		console.log(`DB connected and listening on port ${process.env.PORT}`)
	})
	.catch((err) => {
		console.log(err)
	})
