import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Spinner from "../components/Spinner";

function ModelExperienceModal() {

  const { recommendations, isLoading, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth
  const [showLoader, setShowLoader] = useState(true)
  const [showLoaderText, setShowLoaderText] = useState('')
  const [animFinished, setAnimFinished] = useState(false)

  const recommendation = recommendations[recommendations.length - 1];
  
  useEffect(() => {

    if (isLoading)  {
      setShowLoader(true)
      setShowLoaderText('Getting your location')
  
      setTimeout(function () {
        // setShowLoader(false)
        setShowLoaderText('Finding local restaurants')
      }, 2000);

      // timeout(2000, function() {setShowLoaderText('loading 2')} )

      setTimeout(function () {
        // setShowLoader(false)
        setShowLoaderText('Removing foods with allergens')
      }, 4000);

      // timeout(3000, function() {setShowLoaderText('loading 3')} )

      setTimeout(function () {
        // setShowLoader(false)
        setShowLoaderText('Preference filtering')
      }, 6000);

      setTimeout(function () {
        console.log('TIMEOUUUT Large recommender button hit delayed!!!!!')
        setShowLoader(false)
      }, 8000);

      // timeout(4000, function() { setShowLoader(false) } )

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
                 {/* <Spinner loadText = {showLoaderText}/> */}

                 {/* <div class="spinner-grow" style = {{ width: 100 , height: 100 }}   role="status">
                </div> */}

                 <div class="spinner-border" style = {{ width: 100 , height: 100 }} role="status">
                  {/* <div class="spinner-grow" style = {{ width: 97 , height: 97 }}   role="status"> </div> */}
                </div>

                <div className="row justify-content-center">
                  <h1 className="display-4"> {showLoaderText} </h1>
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