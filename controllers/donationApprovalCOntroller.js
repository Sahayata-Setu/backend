const Verify = require('../models/verify')
const User = require('../models/user')
const Donation = require('../models/donation')
const Request = require('../models/request')
const NeedRequest = require("../models/needRequest")

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



//Create Neeed Request
exports.createNeedRequest = async (req, res) => {
	const donorId = req.user.id
	let donor_name, reciever_name
	const { recieverId, needPostId } = req.body
	console.log(recieverId)

	const requests = await NeedRequest.find({
		donorId: donorId,
		receiverId: recieverId,
		needPostId: needPostId,
	})
	// console.log('Requests', requests)
	if (requests.length > 0) {
		res.send({
			message: 'Request already exists',
		})
	} else {
		const need = await Request.findById(needPostId)
		console.log("Need By ID",need);
		const user = await User.findById(donorId)
		if (need.beneficiary_id == recieverId ) {
			// console.log("Hello");
			reciever_name = need.beneficiary_name
			donor_name = user.firstName + ' ' + user.lastName
		}

		const needReq = await NeedRequest.create({
			donor_name: donor_name,
			reciever_name: reciever_name,
			donorId: donorId,
			receiverId: recieverId,
			needPostId: needPostId,
			donor_status: 'false',
			reciever_status: 'false',
			needTitle: need.title,
		})

		if (needReq) {
			res.send({
				message: 'success',
			})
		} 
		// res.send({message: "Error Occured"})
	}
}




//change reciever or donation status
exports.changeRequestOrDonationStatusOfNeed = async (req, res) => {
	const userId = req.user.id
	const needId = req.body.needId
	console.log(userId)
	//Fetch the request with reciver id and donor id same
	const needRequests = await NeedRequest.find({
		$or: [{ donorId: userId }, { receiverId: userId }],
	})
	console.log('Requests', needRequests)
	needRequests.map((request) => {
		if (request.donorId == userId && request.needPostId == needId) {
			request.donor_status = 'donated'
			request.save()
			res.send({ message: 'Donor Status Changed' })
		} else if (request.receiverId == userId && request.needPostId == needId) {
			request.reciever_status = 'recieved'
			request.save()
			res.send({ message: 'Reciever Status Changed' })
		}
	})
}


//Change the need post status
exports.changeStatusOfNeedPost = async (req, res) => {
	const userId = req.user.id
	// const donationPostId = req.body.donationPostId;
	// console.log(userId);

	try {
		const needRequests = await NeedRequest.find({
			$or: [{ donorId: userId }, { receiverId: userId }],
			// $and: [{ donationPostId: donationPostId }],
		})
		// console.log('Requests', requests)

		//For Deleting the post which is already donated
		needRequests.map(async (request) => {
			if (
				request.donor_status == 'donated' &&
				request.reciever_status == 'recieved'
			) {
				const needPost = await Request.findById(request.needPostId)
				needPost.status = 'donated'
				needPost.save()
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



//Get all requests by the user for need
exports.getAllRequestsByUserForNeed = async (req, res) => {
	const userId = req.user.id

	const requests = await NeedRequest.find({
		$or: [{ donorId: userId }, { receiverId: userId }],
	})
	res.send({ body: requests })
}