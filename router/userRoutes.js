const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const uploads = require('../utils')
const auth = require('../middleware/auth')

// Donation routes
router.post('/donation/create', auth, userController.createDonation)
router.get('/donation/all', auth, userController.getAllDonations)
router.get('/donation/:id', auth, userController.getSingleDonation)
router.patch('/donation/:id', auth, userController.updateDonation)
router.delete('/donation/:id', auth, userController.deleteDonation)

// Request routes
router.post('/request/create', auth, userController.createRequest)

// router.get('/get-all-posts', userController.getAllPosts)
// // router.get("/get-single-user", userController.getSingleUser);
// router.post('/add-post', auth, userController.createPost)
// router.get('/getpost/:postId', userController.getEditPost)
// router.post('/editpost/:postId', auth, userController.postEditPost)
// router.post('/delete-post', auth, userController.postDeletePost)
// router.post('/upvote-post', auth, userController.upVote)
// router.post('/downvote-post', auth, userController.downVote)
// router.post('/solution', auth, userController.postSolution)
// router.post('/upvote-solution', auth, userController.upVoteSolution)
// router.post('/downvote-solution', auth, userController.downVoteSolution)
// router.post('/comment', auth, userController.postComment)
// router.post(
// 	'/update-solution-status',
// 	auth,
// 	userController.updateSolutionStatus
// )
// router.get(
// 	'/unredeemed-points',
// 	auth,
// 	userController.getAcceptedUnRedeemedPosts
// )
// router.post('/accept-solution', auth, userController.acceptSolution)
// router.get('/solution/:postId', auth, userController.getSolutionByPostId)
// router.get('/:userId', auth, userController.getUser) // Always keep at the bottom
module.exports = router
