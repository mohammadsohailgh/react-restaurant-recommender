import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/recommendation/recommendationSlice'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TasteRadarChart from './TasteRadarChart'


import 'react-svg-radar-chart/build/css/index.css'
import { FaHeart, FaThumbsUp, FaTrash } from "react-icons/fa";

function OrderItem({ recommendation }) {
    const dispatch = useDispatch()

    return (
        <>
            <div className="card mb-3" style={{ maxWidth: 600 }}>

                <div className="row g-0 align-items-center">
                    <div className="col-md-4  ">
                        <TasteRadarChart
                            taste_group={recommendation.dish_key.slice(9)}
                            size={130}
                            colour='green'
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-start">
                            <h5 className="card-title"><div>{recommendation.restaurant_name}</div>
                            </h5>
                            {/* <p className="card-text"> */}
                            <div><span className="fw-bold">Cuisine: </span>{recommendation.cuisine}</div>
                            <div><span className="fw-bold">Price range: </span>{recommendation.price_range}</div>
                            <div><span className="fw-bold">Recommended dish: </span>{recommendation.dish_name}</div>
                            <div><span className="fw-bold">Dish description: </span>{recommendation.dish_description}</div>
                            <div><span className="fw-bold">Address: </span>{recommendation.address}</div>
                            {/* </p> */}
                            <p className="card-text">
                                <small className="text-muted">Recommended at {new Date(recommendation.createdAt).toLocaleString('en-US')}</small>
                            </p>
                        </div>
                    </div>

                    <div className="row g-0 mb-3" >
                        <small className="text-muted">Please only review if you've tried the dish</small>

                        <div className="col mx-2">
                            <button type="button" className="btn btn-success  btn-sm  btn-block ">
                                <FaHeart style={{ color: "yellowgreen" }} />
                                Loved it
                            </button>
                        </div>

                        <div className="col mx-2">

                            <button type="button" className="btn btn-warning btn-sm btn-block ">
                                <FaThumbsUp />
                                Willing to try again
                            </button>
                        </div >

                        <div className="col mx-2">

                            <button type="button" className="btn btn-danger  btn-sm btn-block">
                                <FaTrash />
                                Hated it
                            </button>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderItem