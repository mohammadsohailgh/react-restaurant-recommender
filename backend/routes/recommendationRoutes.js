const express = require('express')
const router = express.Router()
// const {getRecommendation, setRecommendation, deleteRecommendation, updateRecommendation} = require('../controllers/recommendationController')
const { setRecommendation, getRecommendations } = require('../controllers/recommendationController')
const {protect} = require('../middleware/authMiddleware') //adding protect as first paramter doesnt allow anyone to access route without auth token

router.route('/').get(protect, getRecommendations).post(protect, setRecommendation) //single line of code which calls getOrders and setOrder route controllers


module.exports = router