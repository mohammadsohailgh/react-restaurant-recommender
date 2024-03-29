import { useDispatch } from 'react-redux'
import { updateRecommendation } from '../features/recommendation/recommendationSlice'
import RadarChartTaste from './RadarChartTaste'


import 'react-svg-radar-chart/build/css/index.css'
import { FaHeart, FaThumbsUp, FaTrash } from "react-icons/fa";

function OrderItem({ recommendation }) {

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(updateRecommendation({ id: recommendation._id, review: e.target.value }))
    }

    const spiceColour = recommendation.dish_key[10] === "0" ? "green" : recommendation.dish_key[10] === "1" ? "orange" : "red"
    // console.log('yeet"', recommendation.dish_key[9], recommendation.dish_name)


    return (
        <>
            <div className="card mb-3" style={{ maxWidth: 600 }}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-4  ">
                        <RadarChartTaste
                            taste_group={recommendation.dish_key.slice(11)}
                            size={130}
                            colour={spiceColour}
                        />
                        {recommendation.dish_key.slice(10)}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-start">
                            <h5 className="card-title"><div>{recommendation.restaurant_name}</div>
                            </h5>
                            <div><span className="fw-bold">Cuisine: </span>{recommendation.cuisine}</div>
                            <div><span className="fw-bold">Price range: </span>{recommendation.price_range}</div>
                            <div><span className="fw-bold">Recommended dish: </span>{recommendation.dish_name}</div>
                            <div><span className="fw-bold">Dish description: </span>{recommendation.dish_description}</div>
                            <div><span className="fw-bold">Address: </span>{recommendation.address}</div>
                            <p className="card-text">
                                <small className="text-muted">Recommended at {new Date(recommendation.createdAt).toLocaleString('en-US')}</small>
                            </p>
                        </div>
                    </div>


                    {recommendation.review === null || recommendation.review === undefined ? (
                        <div className="row g-0 mb-3">

                            <small className="text-muted">Please only review if you've tried the dish</small>

                            <div className="col mx-2">
                                <button onClick={(e) => onSubmit(e)} value={2} type='submit' className="btn btn-success btn-sm btn-block ">
                                    <FaHeart style={{ color: "yellowgreen" }} />
                                    Loved it
                                </button>
                            </div>

                            <div className="col mx-2">
                                <button onClick={(e) => onSubmit(e)} value={1} type='submit' className="btn btn-warning btn-sm btn-block ">
                                    <FaThumbsUp />
                                    Willing to try again
                                </button>
                            </div>

                            <div className="col mx-2">
                                <button onClick={(e) => onSubmit(e)} value={0} type='submit' className="btn btn-danger btn-sm btn-block">
                                    <FaTrash />
                                    Hated it
                                </button>
                            </div>
                        </div>

                    ) : ( 
                        <div> Your review for this dish was:

                            <strong>
                               {recommendation.review === 0 ? " Hated it" : 
                               recommendation.review === 1 ? " Willing to try again" :  
                               " Loved it"} 
                            </strong>
                               </div>
                    ) }


                </div>
            </div>
        </>
    )
}

export default OrderItem