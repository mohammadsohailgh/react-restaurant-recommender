import React from 'react'

function Spinner({loadText}) {
  return (
    <div>
    <div className="loadingSpinnerContainer pb-5 mb-5">
        <div className="loadingSpinner ">
        </div>
    </div>
        <h1 className='mt-5' > {loadText} </h1>
    </div>
  )
}

export default Spinner