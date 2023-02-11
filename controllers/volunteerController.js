const VolunteerApplication = require('../models/volunteer_application')

// Apply for volunteer
exports.applyForVolunteer = async (req, res, next) => {
	const { reason } = req.body
	// Check if user already has an pending application
	console.log(req.file)
	const existingApplication = await VolunteerApplication.findOne({
		applicant_id: req.user.id,
	})
	// console.log(req.files);
	if (existingApplication) {
		return res
			.status(400)
			.send({ message: 'You already have a pending application' })
	} else {
		// Create new application
		const newApplication = new VolunteerApplication({
			applicant_id: req.user.id,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			reason,
			images: req.files.map((file) => file.location),
		})

		try {
			await newApplication.save()
			res.status(201).send({ message: 'Application submitted' })
		} catch (error) {
			res.status(400).send({
				message: 'Error submitting application',
				error,
			})
		}
	}
}
