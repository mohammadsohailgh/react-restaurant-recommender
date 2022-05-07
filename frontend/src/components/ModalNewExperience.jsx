import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in

function ModelExperienceModal() {

  const { recommendations, isLoading, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth
  const [showLoader, setShowLoader] = useState(true)
  const [showLoaderText, setShowLoaderText] = useState('')

  const recommendation = recommendations[recommendations.length - 1];
  
  useEffect(() => {

    if (isLoading)  {
      setShowLoader(true)
      setShowLoaderText('Getting your location')
  
      setTimeout(function () {
        setShowLoaderText('Finding local restaurants')
      }, 2000);

      setTimeout(function () {
        setShowLoaderText('Removing allergens')
      }, 4000);

      setTimeout(function () {
        setShowLoaderText('Filtering preferences')
      }, 6000);

      setTimeout(function () {
        setShowLoader(false)
      }, 8000);

    } 
  
  }, [isLoading] )

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
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New experience
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {showLoader ? (
                <>
                 <div className="spinner-border" style = {{ width: 80 , height: 80 }} role="status">
                </div>

                <div className="row justify-content-center">
                  <h5 className="mt-4"> {showLoaderText} </h5>
                </div>
                </>
              ) : (null)}

              { !showLoader && isSuccess && message === '' && recommendations.length > 0 ?
                (
                  <>
                    <div><span className="fw-bold">Restaurant: </span>{recommendation.restaurant_name}</div>
                    <div><span className="fw-bold">Cuisine: </span>{recommendation.cuisine}</div>
                    <div><span className="fw-bold">Price range: </span>{recommendation.price_range}</div>
                    <div><span className="fw-bold">Recommended dish: </span>{recommendation.dish_name}</div>
                    <div><span className="fw-bold">Dish description: </span>{recommendation.dish_description}</div>
                    <div><span className="fw-bold">Address: </span>{recommendation.address}</div>
                  </>
                )
                :
                (
                   !showLoader ? ( message ) : (null)
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