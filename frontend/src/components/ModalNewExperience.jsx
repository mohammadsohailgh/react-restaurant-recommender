import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // used to grab user from state to see if theyre logged in
import Map from "../components/Map.jsx";

function ModelExperienceModal() {

  const { recommendations, isLoading, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth

  // Used for loading text when getting recommendation. forced load
  const [showLoader, setShowLoader] = useState(true)
  const [showLoaderText, setShowLoaderText] = useState('')

  const recommendation = recommendations[0];

  // Everytime isLoading variable is refreshed, excute this useEffect function. Purpose: shows loading messages to user, delays recommendation on screen
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
      setShowLoaderText('Getting your location')

      setTimeout(function () {
        setShowLoaderText('Finding local restaurants')
      }, 2000);

      setTimeout(function () {
        setShowLoaderText('Filtering preferences')
      }, 6000);

      setTimeout(function () {
        setShowLoader(false)
      }, 8000);
    }
  }, [isLoading])

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade centered"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New recommendation
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {showLoader ? (
                <>
                  <div className="spinner-border" style={{ width: 80, height: 80 }} role="status">
                  </div>

                  <div className="row justify-content-center">
                    <h5 className="mt-4"> {showLoaderText} </h5>
                  </div>
                </>
              ) : (null)}

              {!showLoader && isSuccess && message === '' && recommendations.length > 0 ?
                (
                  <>
                    <Map mapHeight={150} lat={recommendation.lat} long={recommendation.long} popupText={recommendation.restaurant_name} />

                    <div className="list-group">
                      <div className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex  w-100 justify-content-between">
                          <h5 className=" text-start mb-1"> {recommendation.restaurant_name} <small className="text-muted"> {recommendation.cuisine} </small> </h5>
                          <small className="text-end">{Number((recommendation.distance).toFixed(1))} miles away</small>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                          <p className="text-start mb-1">  {recommendation.dish_name}  <span className="badge bg-primary rounded-pill">Recommended dish</span>  </p>
                        </div>

                        <p className="d-flex text-start mb-1">Description: {recommendation.dish_description} </p>
                        <p className="text-start mb-2"> Price range: {recommendation.price_range} </p>
                        <small className="d-flex">Address: {recommendation.address}</small>
                      </div>
                    </div>
                  </>
                ) : (
                  !showLoader ? (message) : (null)
                )
              }

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelExperienceModal