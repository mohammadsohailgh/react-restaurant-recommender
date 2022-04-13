const asyncHandler = require("express-async-handler");

const Recommendation = require("../models/recommendationModel");
const User = require("../models/userModel");

// @desc Get recommendations
// @route Get /api/recommendations
// @access Private
const getRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await Recommendation.find({}, { user: req.user.id, review: null }).limit(3);
  res.status(200).json(recommendations);
});

// @desc Set recommendations
// @route POST /api/recommendations
// @access Private
const setRecommendation = asyncHandler(async (req, res) => {
  const { user, recommendation, review, role } = req.body
  if (!req.body.recommendation) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // const { name, email, password, role } = req.body
  // if (!name || !email || !password || !role) {
  //     res.status(400)
  //     throw new Error('Please add all fields')
  // }

  const setRecommendation = await Recommendation.create({
    user: req.user.id,
    recommendation: req.review.id,
    review:  req.review.id 
  });
  res.status(200).json(setRecommendation);
});

// // @desc Update recommendations
// // @route PUT /api/recommendations/:id
// // @access Private
// const updateOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id); // getting goal by id

//   if (!order) {
//     // checking if goal exists
//     res.status(400);
//     throw new Error("Order not found");
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   // Make sure the logged in user matches the order user
//   if (order.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorised");
//   }

//   const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json(updatedOrder);
// });

// // @desc Delete recommendations
// // @route DELETE /api/recommendations/:id
// // @access Private
// const deleteOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     res.status(400);
//     throw new Error("Order not found");
//   }

//   if (!order) {
//     // checking if goal exists
//     res.status(400);
//     throw new Error("Order not found");
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   // Make sure the logged in user matches the order user
//   if (order.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not authorised");
//   }

//   await order.remove();

//   res.status(200).json({ id: req.params.id });
// });

// module.exports = {
  getRecommendations,
  setRecommendation
//   updateOrder,
//   deleteOrder,
// };
