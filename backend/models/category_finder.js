const Restaurants = require('./restaurants.json')

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

const userPreference = "000000000011111"

// calculate distance between current user location and all restaurants
const distanceCalculated = Restaurants.map(restaurant => ({ ...restaurant, distance: distance(restaurant.lat, restaurant.long, 51.497340347715436, -2.5596941886176428) }))
// sort restaurants based on ascending order (closest restaurants first in list)
distanceCalculated.sort((a, b) => a.distance - b.distance);
// get 5 nearest restaurants
const nearestFiveRestaurants = [...distanceCalculated].slice(0, 5)

for (const restaurant of nearestFiveRestaurants) {
    const filtered = restaurant.menu.filter(
      // menuItem => menuItem.key === "123456789123456"
      function(menuItem) {
        var matched = true
        for (var i = 0; i < menuItem.key.length; i++) { 
          if(i < 2) {
            // recommend breakfast dishes 
            if(userPreference.slice(0,2) == "00") {
              if (menuItem.key.slice(0,2) != "00" && menuItem.key.slice(0,2) != "01" ) {
                matched = false
              }
            }
            // recommend lunch dishes 
            else if(userPreference.slice(0,2) == "10") {
              if (menuItem.key.slice(0,2) != "01" && menuItem.key.slice(0,2) != "11" ) {
                matched = false
              }
            }
            // recommend dinner dishes 
            else if(userPreference.slice(0,2) == "01") {
              if (menuItem.key.slice(0,2) != "11" && menuItem.key.slice(0,2) != "01" ) {
                matched = false
              }
            }
            // skip this iteration to seek 3rd char of loop
            i++
          }
          // dietary preference: 
          else if(i< 10) {
            if (userPreference[i] === "1" && menuItem.key[i] !== "1") {
              matched = false
            } 
          }
          // taste group
          else if(i<=14) {
            // bitter[10], sweet[11], sour[12], salty[13], savoury[14]
            // exclude food items if user rating is 0 and food item has some level inside (medium'1' or high'2')
            if (userPreference[i] === "0" && menuItem.key[i] !== "0") {
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

const recommendations = nearestFiveRestaurants.filter( restaurant => restaurant.menu.length > 0 )

// recommendations.forEach(e => console.log(e))
console.log(recommendations[0])
 
