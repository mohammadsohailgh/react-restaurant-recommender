import React from 'react'
import RecommendationItem from "../components/RecommendationItem";
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in

function Reviews() {

  const { recommendations } = useSelector((state) => state.recommendations); //get the user from state.auth
  let reorderedRecommendations = [...recommendations]
  reorderedRecommendations = reorderedRecommendations.reverse();

  return (
    <div>
      

      <section className="heading" style={{ marginBottom: 20 }}>
            <h1>Reviews</h1>
          </section>

      
      {reorderedRecommendations.length > 0 ? (
          <div className="justify-content-center row">
            {recommendations.map((recommendation) => (
              <RecommendationItem key={recommendation._id} recommendation={recommendation} />
            ))}
          </div>
        ) : (
          <h3>You have not set any recommendations</h3>
        )}

    </div>
  )
}

export default Reviews