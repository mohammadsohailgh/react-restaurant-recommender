import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Spinner from "../components/Spinner";


function ModelExperienceModal() {

  const { recommendations, isLoading, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth

  // if (recommendations.length > 0) {
  const recommendation = recommendations[recommendations.length - 1];
  // }

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


              {isLoading ? (
                <Spinner />
              ) : (null)}

              {isSuccess && message === '' && recommendations.length > 0 ?
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
                (message)
              }




              {/* <p>Cuisine: {recommendation.cuisine}</div>
                <p>Dish name: {recommendation.dish_name}</div>
                <div>Dish description:{recommendation.description}</div> */}
              {/* <div className="">{new Date(recommendation.createdAt).toLocaleString('en-US')}</div> */}




              {/* <div className="container">
                <div className="row justify-content-md-center">
                  
                </div>
              </div> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Understood
              </button> */}
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}

export default ModelExperienceModal