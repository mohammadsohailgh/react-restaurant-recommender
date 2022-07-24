import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import { createRecommendation } from "../features/recommendation/recommendationSlice.js";

function LargeRecommenderButton({ target, title, foodGroup, size, colour }) {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth); //get the user from state.auth
  const { isError, message } = useSelector((state) => state.recommendations); //get the user from state.auth
  const { globalStatePreference, feelingType } = useSelector((state) => state.globalStatePreference); //get the user from state.auth

  const [userLocation, setUserLocation] = useState({
    userLat: null,
    userLong: null,
  });

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
      console.log("Geolocation is not supported by this browser.")
    }
  }

  function showPosition(position) {
    dispatch(createRecommendation({ lat: position.coords.latitude, long: position.coords.longitude, feelingType: feelingType, userPreference: foodGroup + globalStatePreference }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    getLocation()
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (userLocation.userLat !== null) {
      console.log({ userLocation })
    }

  }, [user, isError, message, dispatch, userLocation]);

  return (
    <div className={size}>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="btn-preferences"
          style={{ background: colour }}
          data-bs-toggle="modal"
          data-bs-target={target}
        >
          {title}
        </button>
      </form>
    </div>
  )
}

export default LargeRecommenderButton