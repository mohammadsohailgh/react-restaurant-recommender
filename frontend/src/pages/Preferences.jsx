import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Card from "../components/Card.jsx";
import Spinner from "../components/Spinner";
import { getOrders, reset } from "../features/orders/orderSlice";
import OrderItem from "../components/OrderItem.jsx";
import { FaHeart, FaThumbsUp, FaTrash } from "react-icons/fa";
import React from "react";
import { setPreference, getPreference } from "../features/preference/preferenceSlice.js";
import { toast } from 'react-toastify'

function Preferences() {

  const { globalStatePreference, isSuccess, isLoading, isError, message } = useSelector((state) => state.globalStatePreference); //get the user from state.auth
  const { user } = useSelector((state) => state.auth); //get the user from state.auth

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allPreferences = "0000001000000";

  const [userPreference, setUserPreferences] = useState([
    { name: "Vegetarian", value: '0', position: 0 },
    { name: "Vegan", value: '0', position: 1 },
    { name: "Halal", value: '0', position: 2 },
    { name: "Kosher", value: '0', position: 3 },

    { name: "Dairy", value: '0', position: 4 },
    { name: "Fish", value: '0', position: 5 },
    { name: "Gluten", value: '0', position: 6 },
    { name: "Nuts", value: '0', position: 7 },

    { name: "Bitter", value: '1', position: 8 },
    { name: "Sweet", value: '1', position: 9 },
    { name: "Sour", value: '1', position: 10 },
    { name: "Salty", value: '1', position: 11 },
    { name: "Savoury", value: '1', position: 12 },
  ]);

  // Get taste group
  // const taste = userPreference.slice(8).map((name, index) => console.log(index, name.name))

  // Get dietary preference group
  // const diet = userPreference.slice(0,4).map((name, index) => console.log(index, name.name))

  // Get allergens group
  // const allergens = userPreference.slice(4, 8).map((name, index) => console.log(index, name.name))


  const constructAllPreferences = (p) => {
    const a = p.map((i) => i.value).join("");
    return a
  }

  const destructAllPreferences = (p, group) => {
    [...p].forEach(function (c, index) {
      if (group === "tasteGroup") {
        userPreference[index + 8].value = c;
      } else {
        userPreference[index].value = c;
      }
    });
  };

  // console.log(destructAllPreferences("12221", "tasteGroup"))

  // const a = destructAllPreferences(globalStatePreference)

  const onChangeDietaryPreference = (e, index) => {
    // e.preventDefault()
    // console.log('checked val:',e.target.checked)
    // console.log("e value is:", e.target.value)
    const list = [...userPreference];
    const item = { ...list[index] };
    item.value === '1' ? (item.value = '0') : (item.value = '1');
    list[index] = { ...item };
    dispatch(setPreference(({ preference: constructAllPreferences(list) })))
    // setUserPreferences(list);
  };

  const onChangeTastePreference = (e, index) => {
    const list = [...userPreference];
    list[index] = { ...list[index], value: e.target.value };
    // setUserPreferences(list);
    dispatch(setPreference(({ preference: constructAllPreferences(list) })))
    console.log('onChangeTastePreference hit')
  };

  useEffect(() => {
    // const preamble = dietaryPreference.map(i => i === true ? 1 : 0)
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate("/login");
    }

    // const preference = userPreference
    //   .map((i) => i.value)
    //   .join("");

    dispatch(getPreference())

    // if(globalStatePreference !== null || undefined) {
    //   destructAllPreferences(globalStatePreference.globalStatePreference)
    // }

    // dispatch(setPreference( {globalStatePreference} ))

    console.log("useEffect is hit")
    // if (globalStatePreference !== null) {
    // destructAllPreferences(globalStatePreference)
    // }

    // console.log('destructed', destructAllPreferences(globalStatePreference))
  

  }, [navigate, dispatch, user, message, isError, isSuccess]);

  if (globalStatePreference !== null) {
    console.log('global state set to local pref state')
    destructAllPreferences(globalStatePreference)
  }

  // if (isSuccess) {
    // toast.success('Preferences updated')
  // }

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <div className="container">
      <section className="heading" style={{ marginBottom: 20 }}>
        <h1>Preferences</h1>
      </section>

      <p>Select your dietary preference</p>
      {userPreference.slice(0, 8).map(({ name, position, value }) => {
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
                // onChange={onChangeDietaryPreference() }
                // defaultChecked= "off"
                checked={value === '1' ? true : false}
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

      <p style={{ marginTop: 30 }}>Select your taste preferences</p>
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
        {userPreference.slice(8).map(({ name, position }) => {
          return (
            <React.Fragment key={position}>
              {/* range slider */}
              <label className="form-label">{name}</label>
              <input
                defaultValue={userPreference[position].value}
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

    </div>
  );

}

export default Preferences;
