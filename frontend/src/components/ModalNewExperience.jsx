import LargeRecommenderButton from './LargeRecommenderButton'
import GetLocation from './GetLocation'

function ModelExperienceModal() {
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <GetLocation />

              <p> Choose meal time </p>

              <div className="container">
                <div className="row justify-content-md-center">
                  <LargeRecommenderButton target="#staticBackdrop" title="Breakfast" size="col-sm-4" colour="#ACDAED" />
                  <LargeRecommenderButton target="#staticBackdrop" title="Lunch" size="col-sm-4" colour="#F4BB67" />
                  <LargeRecommenderButton target="#staticBackdrop" title="Dinner" size="col-sm-4" colour="#CA5555" />
                </div>
              </div>
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

export default ModelExperienceModal