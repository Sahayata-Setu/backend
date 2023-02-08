const Notification = require('../models/notification')

// Create a new notification
exports.create = async (req, res) => {
	try {
		const { userId, createdBy, message, link } = req.body

		const notification = await Notification.create({
			userId,
			createdBy,
			message,
			link,
		})
		res.status(201).json({
			message: 'Notification created',
			body: notification,
		})
	} catch (error) {
		res.status(400).json({
			error: error.message,
		})
	}
}

// Get notifications for a user
exports.getAllNotification = async (req, res) => {
	try {
		// Extract receiver from params
		const { userId } = req.params

		// Find all notifications for the receiver
		const notifications = await Notification.find({ userId })

		// Count unread notifications
		const unreadCount = await Notification.countDocuments({
			userId,
			read: false,
		})

		// Return notifications
		res.status(200).json({
			message: 'Notifications of user ' + userId,
			body: notifications,
			count: {
				read: notifications.length - unreadCount,
				unread: unreadCount,
				total: notifications.length,
			},
		})
	} catch (error) {
		res.status(400).json({
			error: error.message,
		})
	}
}

// Get unread notification count for a user
exports.getUnreadNotificationCount = async (req, res) => {
	try {
		// Extract receiver from params
		const { userId } = req.params

		// Count unread notifications
		const unreadCount = await Notification.countDocuments({
			userId,
			read: false,
		})

		// Return notifications
		res.status(200).json({
			message: 'Unread Notification count of user ' + userId,
			unread: unreadCount,
		})
	} catch (error) {
		res.status(400).json({
			error: error.message,
		})
	}
}

// Mark a notification as read
exports.markAsRead = async (req, res) => {
	try {
		// Extract notification id from params
		const { notificationId } = req.params

		// Find notification
		const notification = await Notification.findById(notificationId)

		// Mark as read
		notification.read = true

		// Save notification
		await notification.save()

		// Return notification
		res.status(200).json({
			message: 'Notification marked as read',
			body: notification,
		})
	} catch (error) {
		res.status(400).json({
			error: error.message,
		})
	}
}
