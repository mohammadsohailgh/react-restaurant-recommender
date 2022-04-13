import {useState, useEffect} from 'react'

function LargeRecommenderButton({target, title, click, size, colour}) {
    const [cardHeader, setCardHeader] = useState('')

    return (
        <div className={size}>
            <button
              onClick={click}
              className="btn-preferences"
              style={{ background: colour }}
              data-bs-toggle="modal"
              data-bs-target= {target}
            >
                {title}
            </button>
          </div>
    )
}

export default LargeRecommenderButton