import React from 'react'
import RecommendationItem from "../components/RecommendationItem";
import { useSelector } from "react-redux"; // used to grab user from state to see if theyre logged in
import { useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import { getRecommendations } from "../features/recommendation/recommendationSlice";
import { useEffect, useState } from "react"; //

function History() {
  const dispatch = useDispatch();

  const { recommendations, isSuccess } = useSelector((state) => state.recommendations); //get the user from state.auth
  const [filteredRecommendations, setFilteredRecommendations] = useState([])

  useEffect(() => {
    dispatch(getRecommendations())

  }, [dispatch])

  useEffect(() => {
    if (isSuccess) {
      setFilteredRecommendations(recommendations)
    }
  }, [isSuccess, recommendations])

  const changeFilter = (e) => {
    if (e.target.id === "all") {
      setFilteredRecommendations(recommendations)
    } else if (e.target.id === "reviewed") {
      setFilteredRecommendations(recommendations.filter(i => i.hasOwnProperty('review')))
    } else if (e.target.id === "unreviewed") {
      setFilteredRecommendations(recommendations.filter(i => !i.hasOwnProperty('review')))
    }

    console.log('filteed items', filteredRecommendations)
  }


  return (
    <div>

      <section className="heading" style={{ marginBottom: 20 }}>
        <h1>History</h1>
      </section>

      <p> Filter</p>
      <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group" onChange={changeFilter} >
        <input type="radio" className="btn-check" name="btnradio" id="all" autoComplete="off" defaultChecked />
        <label className="btn btn-outline-primary" htmlFor="all">All recommendations ({recommendations.length}) </label>

        <input type="radio" className="btn-check" name="btnradio" id="reviewed" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="reviewed">Reviewed ({recommendations.filter(e => e.hasOwnProperty('review')).length}) </label>

        <input type="radio" className="btn-check" name="btnradio" id="unreviewed" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="unreviewed">Unreviewed ({recommendations.filter(e => !e.hasOwnProperty('review')).length}) </label>
      </div>


      {recommendations.length > 0 ? (
        <div className="justify-content-center row">
          {filteredRecommendations.map((recommendation) => (
            <RecommendationItem key={recommendation._id} recommendation={recommendation} />
          ))}
        </div>
      ) : (
        <h3>You have not set any recommendations</h3>
      )}

    </div>
  )
}

export default History