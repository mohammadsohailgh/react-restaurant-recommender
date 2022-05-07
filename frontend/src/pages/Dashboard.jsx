import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import RecommendationItem from "../components/RecommendationItem";
import Map from "../components/Map.jsx";
import LargeRecommenderButton from "../components/LargeRecommenderButton";
import ModalNewExperience from "../components/ModalNewExperience";
import { getOrders } from "../features/orders/orderSlice";
import { getPreference } from "../features/preference/preferenceSlice";
import { getRecommendations } from "../features/recommendation/recommendationSlice";
import { toast } from 'react-toastify'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, } = useSelector((state) => state.auth); //get the user from state.auth
  const { orders } = useSelector((state) => state.orders); //get the user from state.auth
  const { recommendations, isError, isSuccess, message } = useSelector((state) => state.recommendations); //get the user from state.auth
  const [feelingType, setFeelingType] = useState(0)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isError) {
      toast.error(message)
      console.log(message)
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getOrders()); //RERENDERS THE PAGE THREE TIMES, FIGURE OUT WHY
    dispatch(getRecommendations())
    dispatch(getPreference())
    // dispatch(set())

    // return () => {
    //   dispatch(reset());
    // };


  }, [user, navigate, isError, message, dispatch]);

  const recommendationTypeOnChange = (e) => {
    setFeelingType(e.target.id)
    console.log(feelingType) 
  }

  return (
    <>

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
          {/* <LargeRecommenderButton target="#restaurantRecommender" title="Choose a specific restaurant" size="col-sm-6" colour="#A60027" />
          <LargeRecommenderButton target="#staticBackdrop" title="Recommend a new experience" size="col-sm-6" colour="#FF033E" /> */}


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

      {/* <ModalChooseRestaurant /> */}

      <div className="container ">
        <section className="heading mt-4">
          <h1>Previous three recommendations</h1>{" "}
        </section>

        {recommendations.length > 0 ? (
          <div className="justify-content-center row">
            {recommendations.slice(0,3).map((recommendation) => (
              <RecommendationItem key={recommendation._id} recommendation={recommendation} />
            ))}
          </div>
        ) : (
          <h3>You have not set any recommendations</h3>
        )}

      </div>

      <section className="content">

        {/* <OrderForm />
        {orders.length > 0 ? (
          <div className="orders">
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <h3>You have not set any orders</h3>
        )} */}
      </section>
    </>
  );


}

export default Dashboard;
