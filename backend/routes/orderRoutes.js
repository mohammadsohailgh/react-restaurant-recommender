const express = require('express')
const router = express.Router()
const {getOrders, setOrder, updateOrder, deleteOrder} = require('../controllers/orderController')

const {protect} = require('../middleware/authMiddleware') //adding protect as first paramter doesnt allow anyone to access route without auth token

router.route('/').get(protect, getOrders).post(protect, setOrder) //single line of code which calls getOrders and setOrder route controllers
router.route('/:id').delete(protect, deleteOrder).put(protect, updateOrder) //single line of code which calls getO rders and setOrder route controllers

module.exports = router