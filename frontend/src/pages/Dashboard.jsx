import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import RecommendationItem from "../components/RecommendationItem";
import LargeRecommenderButton from "../components/LargeRecommenderButton";
import ModalNewExperience from "../components/ModalNewExperience";
import ToastGetLocation from "../components/ToastGetLocation";

import { getPreference, setFeelingType } from "../features/preference/preferenceSlice";
import { getRecommendations } from "../features/recommendation/recommendationSlice";
import { toast } from 'react-toastify'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, } = useSelector((state) => state.auth); //get the user from state.auth
  const { recommendations, isError, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth

  const locationToast = () =>
    toast.warn("Please enable location for full application features", 
    {autoClose: false })
  

  useEffect(() => {
    
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getRecommendations())
    dispatch(getPreference())

  }, [user, navigate, isError, message, dispatch]);

  const recommendationTypeOnChange = (e) => {
    // setLocalFeelingType(e.target.id)
    console.log('recommendationTypeOnChange hit!', typeof(e.target.id) ) 
    // if (e.target.id) {
    dispatch(setFeelingType(e.target.id ))
  }

  return (
    <>

      <ToastGetLocation/>
      
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>{" "}
        {/* if user exists then display user.name */}
        <p>Recommendations Dashboard</p>
      </section>

      <div className="container">
  
          <p> Choose how you are feeling </p>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group" onChange={recommendationTypeOnChange}>
            <input type="radio" className="btn-check" name="btnradio" id="0" autoComplete="off" defaultChecked />
            <label className="btn btn-outline-primary" htmlFor="0">Adventurous</label>

            <input type="radio" className="btn-check" name="btnradio" id="1" autoComplete="off"/>
            <label className="btn btn-outline-primary" htmlFor="1">Safe</label>

            <br/>
          </div>


        <div className="row justify-content-md-center mt-3">

          <p> Choose meal time </p>

          <div className="container">
            <div className="row justify-content-md-center">
              <LargeRecommenderButton target="#staticBackdrop" title="Breakfast" foodGroup="00" size="col-sm-4" colour="#ACDAED" />
              <LargeRecommenderButton target="#staticBackdrop" title="Lunch" foodGroup="10" size="col-sm-4" colour="#F4BB67" />
              <LargeRecommenderButton target="#staticBackdrop" title="Dinner" foodGroup="01" size="col-sm-4" colour="#CA5555" />
            </div>
          </div>

        </div>
      </div>

      <ModalNewExperience />


      <div className="container ">
        <section className="heading mt-4">
          <h1>Previous three recommendations</h1>{" "}
        </section>

        {recommendations.length > 0 ? (
          <div className="justify-content-center row">
            { recommendations.slice(0,3).map((recommendation) => (
              <RecommendationItem key={recommendation._id} recommendation={recommendation} />
            ))}
          </div>
        ) : (
          <h3>You have not set any recommendations</h3>
        )}

      </div>
    </>
  );


}

export default Dashboard;
