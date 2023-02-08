const Verify = require('../models/verify')
const User = require('../models/user')
const Donation = require('../models/donation')

//Creates request for check the donation status
exports.createRequest = async (req, res) => {
	const recieverId = req.user.id
	console.log(recieverId)
	let donor_name, reciever_name
	const { donor_id, donationPostId } = req.body

	const requests = await Verify.find({
		donorId: donor_id,
		receiverId: recieverId,
		donationPostId: donationPostId,
	})
	console.log('Requests', requests)
	if (requests.length > 0) {
		res.send({
			message: 'Request already exists',
		})
	} else {
		const donation = await Donation.findById(donationPostId)
		const user = await User.findById(recieverId)
		if (donation.donor_id == donor_id) {
			donor_name = donation.donor_name
			reciever_name = user.firstName + ' ' + user.lastName
		}

		const verify = await Verify.create({
			donor_name: donor_name,
			reciever_name: reciever_name,
			donorId: donor_id,
			receiverId: recieverId,
			donationPostId: donationPostId,
			donor_status: 'false',
			reciever_status: 'false',
			donationTitle: donation.title,
		})

		if (verify) {
			res.send({
				message: 'success',
			})
		}
	}
}

// Checks the status of the donation
exports.changeStatusOfDonationPost = async (req, res) => {
	const userId = req.user.id
	// const donationPostId = req.body.donationPostId;
	// console.log(userId);

	try {
		const requests = await Verify.find({
			$or: [{ donorId: userId }, { receiverId: userId }],
			// $and: [{ donationPostId: donationPostId }],
		})
		// console.log('Requests', requests)

		//For Deleting the post which is already donated
		requests.map(async (request) => {
			if (
				request.donor_status == 'donated' &&
				request.reciever_status == 'recieved'
			) {
				const donationPost = await Donation.findById(request.donationPostId)
				donationPost.status = 'donated'
				donationPost.save()
				// console.log("Post Status Changed");
				res.send({ message: 'Post Status Changed Sucessfully' })
			} else {
				//Error HTTP Headers already sent
				// res.send({ message: 'Post Status Not Changed' })
			}
		})
	} catch (err) {
		// console.log(err);
		res.send({ message: 'Error' })
	}
}

//change reciever or donation status
exports.changeRequestOrDonationStatus = async (req, res) => {
	const userId = req.user.id
	const donationId = req.body.donationId
	console.log('HE')
	//Fetch the request with reciver id and donor id same
	const requests = await Verify.find({
		$or: [{ donorId: userId }, { receiverId: userId }],
	})
	console.log('Requests', requests)
	requests.map((request) => {
		if (request.donorId == userId && request.donationPostId == donationId) {
			request.donor_status = 'donated'
			request.save()
			res.send({ message: 'Donor Status Changed' })
		} else if (request.receiverId == userId && request.donationPostId == donationId) {
			request.reciever_status = 'recieved'
			request.save()
			res.send({ message: 'Reciever Status Changed' })
		}
	})
}

//Get all requests by the user
exports.getAllRequestsByUser = async (req, res) => {
	const userId = req.user.id

	const requests = await Verify.find({
		$or: [{ donorId: userId }, { receiverId: userId }],
	})
	res.send({ body: requests })
}
