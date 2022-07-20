import LargeRecommenderButton from './LargeRecommenderButton'
import { useState, useEffect } from 'react'

function ChooseRestaurantModal() {

  return (
    <div>
        {/* /* <!-- Modal --> */} 
      <div
        className="modal fade centered"
        id="restaurantRecommender"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title w-100" id="staticBackdropLabel">
                New recommendation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              <div className="content">
                <p> Select restaurant</p>
                <select
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option >Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <section className="content py-3">
                <p> Choose meal type</p>

                <div className="container">
                  <div className="row justify-content-md-center">
                    <LargeRecommenderButton
                      onClick=''
                      title="Breakfast"
                      size="col-sm-4"
                      colour="#ACDAED"
                    />
                    <LargeRecommenderButton
                      onClick=''
                      title="Lunch"
                      size="col-sm-4"
                      colour="#F4BB67"
                    />
                    <LargeRecommenderButton
                      onClick=''
                      title="Dinner"
                      size="col-sm-4"
                      colour="#CA5555"
                    />

                    {/* {{recommendationSelected}} */}

                  </div>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}

export default ChooseRestaurantModal