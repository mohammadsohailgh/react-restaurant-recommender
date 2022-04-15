import { useState } from "react";
const restaurants = require("../app/food_categories");

const GetLocation = () => {

  const [userLocation, setUserLocation] = useState({
    userLat: 0,
    userLong: 0,
  });

  const { userLat, userLong } = userLocation;

  var x = document.getElementById("demo");

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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        showPosition,
        // Error function
        null,
        // Options. See MDN for details.
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };

  function showPosition(position) {
    console.log(
      "Your Latitude: " +
        position.coords.latitude +
        " \nYour Longitude: " +
        position.coords.longitude
    );

    setUserLocation({
      userLat: position.coords.latitude,
      userLong: position.coords.longitude,
    });
    // long = position.coords.longitude
    // lat = position.coords.latitude
  }

const cuisines = restaurants.cuisines.map( n => n.cuisine)
const restaurantNames = restaurants.cuisines.map(n => n.restaurants.map(restaurant => restaurant.restaurantName ))
const allMenuItemNames = restaurants.cuisines.flatMap(n => n.restaurants.flatMap(restaurant => restaurant.menu.map( menuItem => menuItem.itemName ) ))
const returnAllBitterItems = (restaurants.cuisines.map(n => n.restaurants).filter(restaurants => restaurants))

const shallowRestaurants = {...restaurants}



const getAllBitterItems = (userPreferences) => {
  const allBitterItems = restaurants.cuisines.flatMap(n => n.restaurants.flatMap(restaurant => restaurant.menu.map( menuItem => menuItem.itemName ) ))
}

const findNearestFiveRestaurants = restaurants.cuisines.map(n => n.restaurants.map(restaurant => [restaurant.lat, restaurant.long] ))

const filterRes = restaurants.cuisines.filter(n => n.restaurants.filter(restaurant => restaurant.restaurantName === 'Cod & Caper' ))


  return (
    <div>
      <p id="demo">Click the button to get your coordinates:</p>
      <button onClick={getLocation}>Try It</button>

      {/* onChange={(e) => setText(e.target.value)} */}
      <p> Your long: {userLong} </p> 
      <p> Your lat: {userLat} </p> 

    Distance: {distance(userLat, userLong, 51.447364861194764, -2.598244900049596)}

  


    {/* {getAllBitterItems("000000000010000")} */}

    </div>
  );
};

export default GetLocation;
