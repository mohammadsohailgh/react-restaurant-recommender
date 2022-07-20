import { useState } from "react";
const restaurants = require("../app/food_categories");

const GetLocation = () => {

  const [userLocation, setUserLocation] = useState({
    userLat: 0,
    userLong: 0,
  });

  const { userLat, userLong } = userLocation;

  var x = document.getElementById("demo");

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
  }

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

  return (
    <div>
      <p id="demo">Click the button to get your coordinates:</p>
      <button onClick={getLocation}>Try It</button>

      {/* onChange={(e) => setText(e.target.value)} */}
      <p> Your long: {userLong} </p> 
      <p> Your lat: {userLat} </p> 

    {/* Distance: {distance(userLat, userLong, 51.447364861194764, -2.598244900049596)} */}
    {/* {console.log('Distance: ' + distance(userLat, userLong, 51.447364861194764, -2.598244900049596) + ' Miles')} */}

    {/* { console.log( restaurants.map((el) => Math.pow(el, e) % n) ) } */}
    {/* { console.log( restaurants.map((el) => console.log(el['0000']) )) } */}

    {/* { console.log(JSON.stringify(cuisines) ) } */}

    {/* { console.log( 'cuisines', cuisines ) }
    { console.log('restaurantNames', restaurantNames ) } 
    { console.log('allMenuItemNames', allMenuItemNames ) } 
    { console.log('returnAllBitterItems', returnAllBitterItems ) }  */}


    {/* {getAllBitterItems("000000000010000")} */}

    </div>
  );
};

export default GetLocation;
