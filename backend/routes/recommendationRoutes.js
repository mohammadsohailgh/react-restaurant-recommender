const express = require('express')
const router = express.Router()
// const {getRecommendation, setRecommendation, deleteRecommendation, updateRecommendation} = require('../controllers/recommendationController')
const { setRecommendation } = require('../controllers/recommendationController')
const {protect} = require('../middleware/authMiddleware') //adding protect as first paramter doesnt allow anyone to access route without auth token

// router.route('/').get(protect, getRecommendation).post(protect, setRecommendation) //single line of code which calls getOrders and setOrder route controllers
// router.route('/:id').delete(protect, deleteRecommendation).put(protect, updateRecommendation) //single line of code which calls getO rders and setOrder route controllers

// router.route('/').get(protect, getRecommendation).post(protect, setRecommendation) //single line of code which calls getOrders and setOrder route controllers

// router.post('/', setRecommendation )
// router.post('/', getRecommendations )
// router.post('/', registerUser) // /api/users when we hit this route we hit controller function registerUser
// router.post('/login', loginUser) // /api/users when we hit this route we hit controller function registerUser
// router.get('/me', protect, getMe) // /api/users when we hit this route we hit controller function registerUser


module.exports = router