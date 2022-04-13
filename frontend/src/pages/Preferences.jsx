import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner";
import { getOrders, reset } from "../features/orders/orderSlice";
import OrderItem from "../components/OrderItem.jsx";
import { FaHeart, FaThumbsUp, FaTrash } from "react-icons/fa";
import React from "react";
import { setPreference } from "../features/preference/preferenceSlice.js";
import { getUserData } from "../features/auth/authSlice.js";

function Preferences() {

  // const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allPreferences = "0000001000000";

  const [userPreferences, setUserPreferences] = useState([
    { name: "Vegetarian", value: 0, position: 0 },
    { name: "Vegan", value: 0, position: 1 },
    { name: "Halal", value: 0, position: 2 },
    { name: "Kosher", value: 0, position: 3 },

    { name: "Dairy", value: 0, position: 4 },
    { name: "Fish", value: 0, position: 5 },
    { name: "Gluten", value: 0, position: 6 },
    { name: "Nuts", value: 0, position: 7 },

    { name: "Bitter", value: 1, position: 8 },
    { name: "Sweet", value: 1, position: 9 },
    { name: "Sour", value: 1, position: 10 },
    { name: "Salty", value: 1, position: 11 },
    { name: "Savoury", value: 1, position: 12 },
  ]);

  // Get taste group
  // const taste = userPreferences.slice(8).map((name, index) => console.log(index, name.name))

  // Get dietary preference group
  // const diet = userPreferences.slice(0,4).map((name, index) => console.log(index, name.name))

  // Get allergens group
  // const allergens = userPreferences.slice(4, 8).map((name, index) => console.log(index, name.name))

  const destructAllPreferences = (p, group) => {
    let f = [...p].forEach(function (c, index) {
      if (group === "tasteGroup") {
        userPreferences[index + 8].value = c;
      } else {
        userPreferences[index].value = c;
      }
    });
    return userPreferences;
  };
  // console.log(destructAllPreferences(allPreferences))
  // console.log(destructAllPreferences("12221", "tasteGroup"))

  const { user } = useSelector((state) => state.auth); //get the user from state.auth

  // const { preference, isLoading, isError, message } = useSelector(
  //   (state) => state.preference
  // ); //get the user preference from state.preference

  const onChangeDietaryPreference = (e, index) => {
    const list = [...userPreferences];
    let item = { ...list[index] };
    item.value === 1 ? (item.value = 0) : (item.value = 1);
    list[index] = { ...item };
    setUserPreferences(list);
  };

  const onChangeTastePreference = (e, index) => {
    const list = [...userPreferences];
    list[index] = { ...list[index], value: e.target.value };
    setUserPreferences(list);
    // dispatch(setPreference('hellooooo'))
  };

  useEffect(() => {
    // const preamble = dietaryPreference.map(i => i === true ? 1 : 0)

    const preference = userPreferences
      .map((i) => i.value)
      .join("");

    dispatch(setPreference( {preference} ))
    // dispatch(getUserData())
    console.log('useEffect token', user.token)
    
    // console.log(userPreferences)
  }, [userPreferences]);

  // useEffect(() => {
  // if (isError) {
  //   console.log(message);
  // }

  // if (!user) {
  //   navigate("/login");
  // }

  // dispatch(getOrders());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, navigate, isError, message, dispatch]);

  // if(isLoading) {
  // return <Spinner />
  // }

  return (
    <div className="container">
      <section className="heading" style={{ marginBottom: 20 }}>
        <h1>Preferences</h1>
      </section>

      <p>Select your dietary preference</p>
      {userPreferences.slice(0, 8).map(({ name, position }) => {
        return (
          <React.Fragment key={position}>
            {name === "Dairy" ? (
              <p style={{ marginTop: 30 }}>Select your allergens</p>
            ) : null}

            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`custom-checkbox-${position}`}
                name={name}
                onChange={(e) => onChangeDietaryPreference(e, position)}
                style={{ marginRight: 10 }}
              />
              <label
                className="form-check-label"
                htmlFor={`custom-checkbox-${position}`}
              >
                {name}
              </label>
            </div>
          </React.Fragment>
        );
      })}

      <p style={{ marginTop: 30 }}>Select your food preferences</p>
      {/* <FaHeart
        style={{
          marginRight: 15,
          marginLeft: 15,
          color: "yellowgreen",
          cursor: "pointer",
        }}
      />
      = you love the food
      <FaThumbsUp
        style={{
          marginRight: 15,
          marginLeft: 15,
          color: "dodgerblue",
          cursor: "pointer",
        }}
      />
      = you are willing to try it
      <FaTrash
        style={{
          marginRight: 15,
          marginLeft: 15,
          color: "red",
          cursor: "pointer",
        }}
      /> 
      = you never want the food
       <br/> */}
      <div className="mx-auto w-75"  >

      {userPreferences.slice(8).map(({ name, position }) => {
        return (
          <React.Fragment key={position}>
            {/* range slider */}
            <label className="form-label">{name}</label>
            <input
              defaultValue={userPreferences[position].value}
              type="range"
              className="form-range"
              min="0"
              max="2"
              step="0"
              name={name}
              position={{ position }}
              // id={`custom-checkbox-${index}`}
              onChange={(e) => onChangeTastePreference(e, position)}
              // onChange= {onChangeTastePreference}
            />

            {/* Labels for range slider */}
            <div style={{ fontSize: 13 }}>
              <div className="row">
                <div className="col text-muted text-start">Hate</div>
                <div className="col text-muted">Willing to try</div>
                <div className="col text-muted text-end pb-5">Love</div>
              </div>
            </div>

          </React.Fragment>
        );
      })}
      </div>

      {/* <div className="album  ">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-4 g-3">
          <div className="col">
            <Card title="Pizza" description="" image="" />
          </div>
          <div className="col">
            <Card title="Pizza" description="" image="" />
          </div>
          <div className="col">
            <Card title="Pizza" description="" image="" />
          </div>
          <div className="col">
            <Card title="Pizza" description="" image="" />
          </div>
        </div>
      </div> */}

      <br />
      <br />
      <br />
    </div>
  );
}

export default Preferences;
