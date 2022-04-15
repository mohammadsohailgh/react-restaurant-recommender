import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Card from "../components/Card.jsx";
import OrderForm from "../components/OrderForm";
import Spinner from "../components/Spinner";
import OrderItem from "../components/OrderItem";
import Map from "../components/Map.jsx";
import LargeRecommenderButton from "../components/LargeRecommenderButton";
import ModalNewExperience from "../components/ModalNewExperience";
import ModalChooseRestaurant from "../components/ModalChooseRestaurant";
import { getOrders, reset } from "../features/orders/orderSlice";
import { getPreference } from "../features/preference/preferenceSlice";
import { toast } from 'react-toastify'


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess } = useSelector((state) => state.auth); //get the user from state.auth
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders); //get the user from state.auth
  const { globalStatePreference } = useSelector((state) => state.globalStatePreference); //get the user from state.auth

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getOrders()); //RERENDERS THE PAGE THREE TIMES, FIGURE OUT WHY
    dispatch(getPreference())


    return () => {
      dispatch(reset());
    };

    
  }, [user, navigate, isError, message, dispatch]);


  return (
    <>
      {/* {distance(51.489280, -2.570609, 51.49978637338046, -2.548983093114162, "M")} */}

      <section className="heading">
        <h1>Welcome {user && user.name}</h1>{" "}
        {/* if user exists then display user.name */}
        <p>Recommendations Dashboard</p>
        {globalStatePreference}
      </section>


      {/* <div>
      <input type="submit" value="Search" onClick={onClick} />
      { showResults ? <p> hello </p> : null }
        </div> */}

      <div className="container">
        <div className="row justify-content-md-center">
          <LargeRecommenderButton target="#restaurantRecommender" title="Choose a specific restaurant" size="col-sm-6" colour="#A60027" />
          <LargeRecommenderButton target="#staticBackdrop" title="Recommend a new experience" size="col-sm-6" colour="#FF033E" />
        </div>
      </div>

      <ModalNewExperience />
      <ModalChooseRestaurant />

      <section className="heading py-3">
        <h1>Previous three recommendations</h1>{" "}
      </section>

      <section className="content">

        <OrderForm />
        {orders.length > 0 ? (
          <div className="orders">
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <h3>You have not set any orders</h3>
        )}
        {/* <Map /> */}
      </section>
    </>
  );


}

export default Dashboard;
