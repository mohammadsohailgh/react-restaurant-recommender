import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import Spinner from "../components/Spinner";
import React from "react";
import { setPreference, getPreference, reset } from "../features/preference/preferenceSlice.js";
import { toast } from 'react-toastify'
import TasteRadarChart from '../components/TasteRadarChart'

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'


function Preferences() {

  const { globalStatePreference, isSuccess, isLoading, isError, message } = useSelector((state) => state.globalStatePreference); //get the user from state.auth
  const { user } = useSelector((state) => state.auth); //get the user from state.auth

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const mealTime = 0
  const dietary = 1 
  const allergens = 2
  const taste = 3
  
  const constructAllPreferences = (p) => {
    const a = p.map((i) => i.value).join("");
    return a
  }

  const destructAllPreferences = (p, group) => {
    [...p].forEach(function (c, index) {
      if (group === "tasteGroup") {
        userPreference[index + 8].value = c;
      } else {
        if (index === 2) { }
        userPreference[index].value = c;
      }
    });
  };

  const successToast = () => toast.success('Preferences updated', { autoClose: 100, hideProgressBar: true })

  const onChangeDietaryPreference = (e, index) => {
    // e.preventDefault()
    const list = [...userPreference];
    const item = { ...list[index] };
    item.value === '1' ? (item.value = '0') : (item.value = '1');
    list[index] = { ...item };
    dispatch(setPreference(({ preference: constructAllPreferences(list) })))

    successToast()
  };

  const onChangeTastePreference = (e, index) => {
    const list = [...userPreference];
    list[index] = { ...list[index], value: e.target.value };
    // setUserPreferences(list);
    dispatch(setPreference(({ preference: constructAllPreferences(list) })))

    successToast()

  };

  useEffect(() => {
    // const preamble = dietaryPreference.map(i => i === true ? 1 : 0)
    if (isError) {
      toast.error(message)
      console.log(message)
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPreference())

    console.log("useEffect is hit")

    return () => {
      dispatch(reset());
    };

  }, [navigate, dispatch, user, message, isError]);

  if (globalStatePreference !== null) {
    destructAllPreferences(globalStatePreference)
  }

  console.log(constructAllPreferences(userPreference).slice(8))

  return (
    <div className="container">
      {isSuccess ? (
        <>
          <section className="heading" style={{ marginBottom: 20 }}>
            <h1>Preferences</h1>
          </section>

          <div>
            <p className="fw-bold mb-1" >Select dietary preference</p>
            {userPreference.slice(0, 8).map(({ name, position, value }) => {
              return (
                <React.Fragment key={position}>
                  {name === "Dairy" ? (
                    <p className="fw-bold mt-2 mb-1">Select allergens</p>
                  ) : null}

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`custom-checkbox-${position}`}
                      name={name}
                      onChange={(e) => onChangeDietaryPreference(e, position)}
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

          </div>


          <div className="row justify-content-md-center pt-3">

            <div className="fw-bold ">
              <p>Select your taste preferences</p>
            </div>

            <div className="row justify-content-md-center">
              <div className="col-sm-6">
                <div className="mt-2"  >
                  {userPreference.slice(8).map(({ name, position, value }) => {
                    return (
                      <React.Fragment key={position}>

                        <div className="row">
                          <div className="col-sm-4 text-end text-center bor ">
                            {name}
                          </div>
                          <div className="col-sm">
                            <div className="row ">

                              <input
                                defaultValue={value}
                                type="range"
                                className="form-range"
                                min="0"
                                max="2"
                                step="0"
                                name={name}
                                position={{ position }}
                                onChange={(e) => onChangeTastePreference(e, position)}
                              />
                            </div>
                            <div className="row " style={{ fontSize: 13 }}>

                              <div className="col-3 text-muted text-start">
                                Hate
                              </div>
                              <div className="col-6 text-muted">
                                Willing to try
                              </div>
                              <div className="col-3 text-muted text-end mb-3">
                                Love
                              </div>

                            </div>
                          </div>

                        </div>


                      </React.Fragment>
                    );
                  })}
                </div>

              </div>

              <div className="col-sm-5 align-self-start ">
                <p className="text-muted mb-0" style={{ fontSize: 13 }}>To edit chart, change sliders</p>



                <TasteRadarChart
                  taste_group={constructAllPreferences(userPreference).slice(8)}
                  size={300}
                  colour='green'
                />
              </div>
            </div>

          </div>

        </>
      ) : (null)}



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


    </div>
  );

}

export default Preferences;

