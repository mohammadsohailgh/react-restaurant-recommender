import { FaHeart, FaThumbsUp, FaTrash } from 'react-icons/fa'
import {useState} from 'react'

function Card({title, description, image, }) {
    const [cardHeader, setCardHeader] = useState('you liked this')

    const changeCardHeader = () => { 
        // switch(e) {
        //     case 1:
        //       // code block
        //       setCardHeader("You will get this more often")
        //       break;
        //     case 2:
        //         setCardHeader("You will never get this")
        //         break;
        //     case 3:
        //         setCardHeader("You're open to trying this")
        //         break;
        //     default:
        //         break
        //   }
        //   console.log(cardHeader)
    }
    return (
            <div className="card text-center" style={{ width: "90%" }} >
             {/* <div className="card text-center" > */}
                <div className="card-header">
                    <div style={{ fontSize: 13}} > {cardHeader}</div>
                </div>
                {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                <img class="card-img-top" src={image} alt="Card" style= {{ width: "100%", height: 150}} />

                <div className="card-body">
                    {/* <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description} </p> */}
                    <h3>
                    <FaHeart style={{ margin: 15, color: 'yellowgreen', cursor: 'pointer' }} onClick={changeCardHeader()} />
                    <FaThumbsUp style={{ margin: 15, color: 'dodgerblue', cursor: 'pointer' }} onClick={changeCardHeader()}/>
                    <FaTrash style={{ margin: 15, color: 'red', cursor: 'pointer' }} onClick={changeCardHeader()} />
                    </h3>
                </div>

                {/* <div class="card" style= {{ width:"400px" }}>
                    <img class="card-img-top" src="" alt="Card" style= {{ width: "100%"}} />
                    <div class="card-body">
                    <h4 class="card-title">John Doe</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>

                    <h3>
                    <FaHeart style={{ margin: 15, color: 'yellowgreen', cursor: 'pointer' }} onClick={changeCardHeader()} />
                    <FaThumbsUp style={{ margin: 15, color: 'dodgerblue', cursor: 'pointer' }} onClick={changeCardHeader()}/>
                    <FaTrash style={{ margin: 15, color: 'red', cursor: 'pointer' }} onClick={changeCardHeader()} />
                    <button></button>
                    </h3>

                    </div>
                </div> */}

            </div>

    )
}

export default Card