const asyncHandler = require("express-async-handler");

// const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const Restaurants = require('../models/restaurants.json')
const Recommendation = require('../models/recommendationModel')

// @desc Get recommendations
// @route Get /api/recommendations
// @access Private
const getRecommendations = asyncHandler(async (req, res) => {
  // const recommendations = await Recommendation.find({}, { user: req.user.id, review: null }).limit(3); //used to get only last 3 items
  const recommendations = await Recommendation.find({ user: req.user.id });
  res.status(200).json(recommendations);
});

// @desc Set recommendations
// @route POST /api/recommendations
// @access Private
const setRecommendation = asyncHandler(async (req, res) => {
  const { long, lat, userPreference } = req.body

  if (!lat || !long || !userPreference) {
    res.status(400);
    throw new Error("Please add all fields");
  }



  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::                                                                         :::
  //:::  This routine calculates the distance between two points (given the     :::
  //:::  latitude/longitude of those points). It is being used to calculate     :::
  //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  //:::                                                                         :::
  //:::  Definitions:                                                           :::
  //:::    South latitudes are negative, east longitudes are positive           :::
  //:::                                                                         :::
  //:::  Passed to function:                                                    :::
  //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  //:::    unit = the unit you desire for results                               :::
  //:::           where: 'M' is statute miles (default)                         :::
  //:::                  'K' is kilometers                                      :::
  //:::                  'N' is nautical miles                                  :::
  //:::                                                                         :::
  //:::  Worldwide cities and other features databases with latitude longitude  :::
  //:::  are available at https://www.geodatasource.com                         :::
  //:::                                                                         :::
  //:::  For enquiries, please contact sales@geodatasource.com                  :::
  //:::                                                                         :::
  //:::  Official Web site: https://www.geodatasource.com                       :::
  //:::                                                                         :::
  //:::               GeoDataSource.com (C) All Rights Reserved 2022            :::
  //:::                                                                         :::
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  // calculate distance between current user location and all restaurants
  const distanceCalculated = Restaurants.map(restaurant => ({ ...restaurant, distance: distance(restaurant.lat, restaurant.long, lat, long) }))
  // sort restaurants based on ascending order (closest restaurants first in list)
  distanceCalculated.sort((a, b) => a.distance - b.distance);
  // get 5 nearest restaurants
  const nearestFiveRestaurants = [...distanceCalculated].slice(0, 5)

  for (const restaurant of nearestFiveRestaurants) {
    const filtered = restaurant.menu.filter(
      // menuItem => menuItem.dish_key === "123456789123456"
      function (menuItem) {
        var matched = true
        for (var i = 0; i < menuItem.dish_key.length; i++) {
          if (i < 2) {
            // recommend breakfast dishes 
            if (userPreference.slice(0, 2) == "00") {
              if (menuItem.dish_key.slice(0, 2) != "00" && menuItem.dish_key.slice(0, 2) != "01") {
                matched = false
              }
            }
            // recommend lunch dishes 
            else if (userPreference.slice(0, 2) == "10") {
              if (menuItem.dish_key.slice(0, 2) != "01" && menuItem.dish_key.slice(0, 2) != "11") {
                matched = false
              }
            }
            // recommend dinner dishes 
            else if (userPreference.slice(0, 2) == "01") {
              if (menuItem.dish_key.slice(0, 2) != "11" && menuItem.dish_key.slice(0, 2) != "01") {
                matched = false
              }
            }
            // skip this iteration to seek 3rd char of loop
            i++
          }
          // dietary preference: 
          else if (i < 6) {
            if (userPreference[i] === "1" && menuItem.dish_key[i] !== "1") {
              matched = false
            }
          }
          // allergens preference: 
          else if (i < 10) {
            if (userPreference[i] === "1" && menuItem.dish_key[i] === "1") {
              matched = false
            }
          }
          // taste group
          else if (i <= 14) {
            // bitter[10], sweet[11], sour[12], salty[13], savoury[14]
            // exclude food items if user rating is 0 and food item has some level inside (medium'1' or high'2')
            if (userPreference[i] === "0" && menuItem.dish_key[i] !== "0") {
              matched = false
            }
          }
        }

        if (matched === true) {
          return menuItem
        }
      }
    )
    restaurant.menu = filtered
  }

  const recommendations = nearestFiveRestaurants.filter(restaurant => restaurant.menu.length > 0)
  const singleRecommendation = recommendations[0]

  if (!singleRecommendation) {
    res.status(200).json('No food available for desired preferences within your location');
  }

  const recommendation = await Recommendation.create({
    user: req.user.id,
    restaurant_name: singleRecommendation.restaurant_name,
    cuisine: singleRecommendation.cuisine,
    price_range: singleRecommendation.price_range,
    address: singleRecommendation.address,
    lat: singleRecommendation.lat,
    long: singleRecommendation.long,
    dish_key: singleRecommendation.menu[0].dish_key,
    dish_name: singleRecommendation.menu[0].dish_name,
    dish_description: singleRecommendation.menu[0].dish_description
  }); // getting goal by id

  // FIGURE OUT A WAY TO EXTRACT ONLY ONE MENU ITEM FROM RECOMMENDED RESTAURANT
  res.status(200).json(recommendation);
});

// @desc Update recommendations
// @route PUT /api/recommendations/:id
// @access Private
const updateRecommendation = asyncHandler(async (req, res) => {
  const recommendation = await Recommendation.findById(req.params.id); // getting goal by id

  if (!recommendation) {
    // checking if recommendation exists
    res.status(400);
    throw new Error("Recommendation not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the order user
  if (recommendation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  const updatedRecommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedRecommendation);
});

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

module.exports = {
  getRecommendations,
  setRecommendation,
  updateRecommendation,
  //   deleteOrder,
};
