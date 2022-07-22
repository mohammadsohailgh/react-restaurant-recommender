const asyncHandler = require("express-async-handler");

// const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const Restaurants = require("../models/restaurants.json");
const Recommendation = require("../models/recommendationModel");

// @desc Get recommendations
// @route Get /api/recommendations
// @access Private
const getRecommendations = asyncHandler(async (req, res) => {
  // const recommendations = await Recommendation.find({}, { user: req.user.id, review: null }).limit(3); //used to get only last 3 items
  const recommendations = await Recommendation.find({ user: req.user.id });
  res.status(200).json(recommendations);
});

// @desc Set recommendation
// @route POST /api/recommendations
// @access Private
const setRecommendation = asyncHandler(async (req, res) => {
  const { long, lat, feelingType, userPreference } = req.body;

  if (!lat || !long || !feelingType || !userPreference) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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

  console.log('lat', lat, ' long: ', long)

  // calculate distance between current user location and all restaurants
  const distanceCalculated = Restaurants.map((restaurant) => ({
    ...restaurant,
    distance: distance(restaurant.lat, restaurant.long, lat, long),
  }));

  // filter restaurants within 3 mile radius
  const localRestaurants = distanceCalculated.filter(
    restaurant => restaurant.distance <= 15)
  
  console.log('restaurant length within 3 miles ', localRestaurants.length)

  // for (var r of localRestaurants) {
  //   console.log(r.restaurant_name, 'menu length:', r.menu.length);
  // }

  // for (var r of localRestaurants) {
  //   console.log('\n restaurant menu within distance, ', r.restaurant_name, r.menu)
  // }

  for (const restaurant of localRestaurants) {
    // console.log(restaurant )
    if (restaurant.menu.length > 0) {
    const filtered = restaurant.menu.filter(
      function (menuItem) {
        var matched = true;
        menuItem.tasteMatchCount = 0;
        for (var i = 0; i < menuItem.dish_key.length; i++) {
          
          // Firstly filtering the correct dish types for time of day:
          if (i < 2) {
            // recommend breakfast dishes
            if (userPreference.slice(0, 2) == "00") {
              if (
                menuItem.dish_key.slice(0, 2) != "00" || menuItem.dish_key.slice(0, 2) != "10"
                // && menuItem.dish_key.slice(0, 2) != "01"
              ) {
                console.log("matched=false, food type breakfast");
                matched = false;
              }
            }
            // recommend lunch dishes
            else if (userPreference.slice(0, 2) == "10") {
              if (
                menuItem.dish_key.slice(0, 2) != "10" ||
                menuItem.dish_key.slice(0, 2) != "11"
              ) {
                console.log("matched=false, food type lunch");
                matched = false;
              }
            }
            // recommend dinner dishes
            else if (userPreference.slice(0, 2) == "01") {
              if (
                menuItem.dish_key.slice(0, 2) != "11" ||
                menuItem.dish_key.slice(0, 2) != "01"
              ) {
                console.log("matched=false, food type dinner");
                matched = false;
              }
            }
            // skip this iteration to seek 3rd char of loop (dish_key)
            i++;
          }

          // Secondly filtering dietary preference:
          else if (i < 6) {
            if (userPreference[i] === "1" && menuItem.dish_key[i] !== "1") {
              matched = false;
              console.log("matched=false, dietary preference");
            }
          }

          // Thirdly filtering allergens preference:
          else if (i < 10) {
            if (userPreference[i] === "1" && menuItem.dish_key[i] === "1") {
              matched = false;
              console.log('matched false: 4' )
            }
          }

          // Fourthly filtering taste group
          // spice[10] bitter[11], sweet[12], sour[13], salty[14], savoury[15]
          else if (i <= 15) {
            // exclude food items if user preference is 0 and food item has some level inside (medium'1' or high'2')
            if (userPreference[i] === "0" && menuItem.dish_key[i] !== "0") {
              // matched = false;
              console.log('matched false: 5' )
            }

            // feelingType 0=adventurous, 1=safe
            if (feelingType === "0") {
              // if user preference loves (2) food taste category and food item has high (2) trace of taste, then increment likliness count of user will like
              if (userPreference[i] === "1" && menuItem.dish_key[i] === "1") {
                menuItem.tasteMatchCount++;
                // matched
              }
            } else if (feelingType === "1") {
              // if user preference willing to try (1) food taste category and food item has medium (1) trace of taste, then increment likliness count of user willingness to try
              if (userPreference[i] === "2" && menuItem.dish_key[i] === "2") {
                menuItem.tasteMatchCount++;
                // matched
              }
            }
          }
        }

        if (matched === true) {
          console.log("matched=true, dish name:", menuItem.dish_name, "tasteMatchCount: ", menuItem.tasteMatchCount);
          return menuItem;
        }
      }
    );
    restaurant.menu = filtered;
    }
  }

  // filter and only store restaurants which have menu items matching user preferences
  const recommendations = localRestaurants.filter(
    (restaurant) => restaurant.menu.length > 0
  );

  console.log("recommendations length:", recommendations.length);
  if (recommendations.length === 0) {
    res.status(204);
    throw new Error("0 recommendations found");
  }

  // tournament selection
  // REDUCE LOOPS, INCREASE EFFICIENCY
  let singleRecommendation = recommendations[0].menu[0]
  var sumOfFitness = 0

  for (const restaurant of recommendations) {
    for (const menuItem of restaurant.menu) {
      sumOfFitness += menuItem.tasteMatchCount
    }
  }

  let picker = Math.floor(Math.random() * sumOfFitness)
  console.log('sum of fitness:', sumOfFitness)
  console.log('random picker number:', picker)

  tournamentLoop:
  for (const restaurant of recommendations) {
    for (const menuItem of restaurant.menu) {
      picker = picker - menuItem.tasteMatchCount

      if (picker <= 0) {
        singleRecommendation = restaurant
        singleRecommendation.menu = menuItem
        console.log('recommended item from tournament selection: ', menuItem)

        break tournamentLoop
      }
    }
  }

  const recommendation = await Recommendation.create({
    user: req.user.id,
    restaurant_name: singleRecommendation.restaurant_name,
    cuisine: singleRecommendation.cuisine,
    price_range: singleRecommendation.price_range,
    address: singleRecommendation.address,
    lat: singleRecommendation.lat,
    long: singleRecommendation.long,
    dish_uid: singleRecommendation.menu.dish_uid,
    dish_key: singleRecommendation.menu.dish_key,
    dish_name: singleRecommendation.menu.dish_name,
    dish_description: singleRecommendation.menu.dish_description,
    tasteMatchCount: singleRecommendation.menu.tasteMatchCount,
    userFeelingType: feelingType,
    distance: singleRecommendation.distance
  }); 

  // FIGURE OUT A WAY TO EXTRACT ONLY ONE MENU ITEM FROM RECOMMENDED RESTAURANT
  console.log("response 200 sent recommendation");
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

  const updatedRecommendation = await Recommendation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

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
