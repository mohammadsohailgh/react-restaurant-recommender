import { useEffect, useState } from "react"; //
import { useNavigate } from "react-router-dom"; //used to redierct user
import { useSelector, useDispatch } from "react-redux"; // used to grab user from state to see if theyre logged in
import React from "react";
import { Link } from "react-router-dom";

import {
  setPreference,
  getPreference,
  reset,
} from "../features/preference/preferenceSlice.js";
import { toast } from "react-toastify";
import RadarChartTaste from "../components/RadarChartTaste";

import "react-svg-radar-chart/build/css/index.css";

function Preferences() {
  const { globalStatePreference, isSuccess, isError, message } = useSelector(
    (state) => state.globalStatePreference
  ); //get the user from state.auth
  const { user } = useSelector((state) => state.auth); //get the user from state.auth

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userPreference, setUserPreferences] = useState([
    { name: "Vegetarian", value: "0", position: 0 },
    { name: "Vegan", value: "0", position: 1 },
    { name: "Halal", value: "0", position: 2 },
    { name: "Kosher", value: "0", position: 3 },

    { name: "Dairy", value: "0", position: 4 },
    { name: "Fish", value: "0", position: 5 },
    { name: "Gluten", value: "0", position: 6 },
    { name: "Nuts", value: "0", position: 7 },

    { name: "Spice Tolerance", value: "1", position: 8, description: "" },
    {
      name: "Bitter",
      value: "1",
      position: 9,
      description:
        "Fenugreek, turmeric, mustard, cocoa, coffee. Bitter flavors provide counterpoints to sweet and savory foods. Bitter is more of a sensation than a flavor description. It is detectable in coffee, mustard, cocoa, olives and citrus peel. We have a funny relationship with bitter. We enjoy it with other things. Coffee with cream and sugar, mustard with meat, cocoa with sugar and fat. By itself, not so much.",
    },
    {
      name: "Sweet",
      value: "1",
      position: 10,
      description:
        "Sugar, honey, maple syrup, jaggery. The degree to which sugars are detectable in food. Sugar is by far our favorite flavor sensation. We eat entirely too much sweet food. Considering that refined sugar only entered the industrial age in the eighteenth century, it quickly became an integral part of cuisines throughout Europe. Prior to that, other means of sweetening foods were more common, including honey, palm sugar and date syrup. Sweet is the primary taste component in desserts, but is also frequently paired with sour and salty for contrasting flavors in savory dishes.",
    },
    {
      name: "Sour",
      value: "1",
      position: 11,
      description:
        "Citrus, vinegar, acid. The degree to which acid is detectable in food. Acidity is used to temper the richness of foods that are high in fat. It’s also very popular as a counterpoint to sweet flavors in numerous cuisines, as well as in sour candy. We have learned to harness and control the souring of food and convert it into foods like cheese, wine, pickles, and the like.",
    },
    {
      name: "Salty",
      value: "1",
      position: 12,
      description:
        "Salt, soy sauce, red miso. The degree to which sodium is detectable in food. It is the oldest known flavoring agent in the world. Salt acts to enhance flavors in food by brightening the other flavors in the dish. We all know the taste of salty. The crunchy snack food industry is built on pushing the envelope of salty food. Lot’s wife was punished with salt because she betrayed her guests by requesting salt from her neighbors, alerting them to the presence of strangers. When used properly, salt is almost a background element, only noticed if it’s missing. Too much salt, and a dish can become unpalatable.",
    },
    {
      name: "Savoury",
      value: "1",
      position: 13,
      description:
        "Meat, eggplant, mushrooms, beans, MSG. savoury uses ingredients whose flavors are commonly described as earthy or meaty. This is the elusive “fifth taste” that registers on a person’s tongue. Technically, it is the detection of glutamates in food. Glutamates are an amino acid, the metabolic product of protein. And, if it hasn’t dawned on you yet, it is the ‘G’ in MSG – Monosodium Glutamate.",
    },
  ]);

  // const color = d.y >= 70 ? "green" : d.y >= 50 ? "yellow" : "red";
  const spiceColour =
    userPreference[8].value === "0"
      ? "green"
      : userPreference[8].value === "1"
        ? "orange"
        : "red";

  const constructAllPreferences = (p) => {
    const preferenceBits = p
      .map((preferenceItem) => preferenceItem.value)
      .join("");
    return preferenceBits;
  };

  // Gets globalStatePreference from database and adjusts preferences page UI to current values: 01100101010000000 to JSON Object UserPreferences
  const destructAllPreferences = (p) => {
    [...p].forEach(function (c, index) {
      userPreference[index].value = c;
    });
  };

  const successToast = () =>
    toast.success("Preferences updated", {
      autoClose: 1000,
      hideProgressBar: true,
    });

  const onChangeDietaryPreference = (e, index) => {
    // e.preventDefault()\
    const list = [...userPreference];
    const item = { ...list[index] };
    item.value === "1" ? (item.value = "0") : (item.value = "1");
    list[index] = { ...item };
    dispatch(setPreference({ preference: constructAllPreferences(list) }));

    successToast();
  };

  const onChangeTastePreference = (e, index) => {
    const list = [...userPreference];
    list[index] = { ...list[index], value: e.target.value };
    dispatch(setPreference({ preference: constructAllPreferences(list) }));

    successToast();
  };

  const navigateRecommender = (e) => {
    navigate("/");
  };


  useEffect(() => {
    // const preamble = dietaryPreference.map(i => i === true ? 1 : 0)
    if (isError) {
      toast.error(message);
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getPreference());

    console.log("useEffect is hit");

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user, message, isError]);

  if (globalStatePreference !== null) {
    destructAllPreferences(globalStatePreference);
  }

  return (
    <>
      {isSuccess ? (
        <>
          <div className="container">
            <section className="heading " style={{ marginBottom: 20 }}>
              <h1>Preferences</h1>
            </section>

            <div className=" justify-content-center">
              <p className="fw-bold mb-1">Select dietary preference</p>
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
                        checked={value === "1" ? true : false}
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

            <div className="row justify-content-center pt-3">
              <div className="fw-bold ">
                <p>Select your taste preferences</p>
              </div>

              <div
                className="row justify-content-md-center"
                style={{ marginBottom: 70 }}
              >
                <div className="col-sm-6">
                  <div className="mt-2">
                    {userPreference
                      .slice(8)
                      .map(({ name, position, value, description }) => {
                        return (
                          <React.Fragment key={position}>
                            <div className="row">
                              <div className="col-sm-5 text-center  ">
                                {name}

                                <button
                                  type="button"
                                  className="btn btn-link"
                                  data-bs-toggle="tooltip"
                                  title={description}
                                  style={{ fontSize: 13 }}
                                >
                                  {" "}
                                  Click for example{" "}
                                </button>
                              </div>
                              <div className="col-sm">
                                <div className="row ">
                                  <input
                                    defaultValue={value}
                                    type="range"
                                    className="form-range "
                                    min="0"
                                    max="2"
                                    step="0"
                                    name={name}
                                    position={{ position }}
                                    onChange={(e) =>
                                      onChangeTastePreference(e, position)
                                    }
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
                  <p className="text-muted mb-0 " style={{ fontSize: 13 }}>
                    Chart will automatically update <br /> when sliders moved
                  </p>
                  <RadarChartTaste
                    taste_group={globalStatePreference.slice(9)}
                    size={300}
                    colour={spiceColour}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div class="position-fixed position-absolute bottom-0 end-0 ">
            <label className="btn btn-danger" htmlFor="0">
              Submit preferences
            </label>
          </div> */}

          <footer class="footer mt-auto py-3 bg-light  fixed-bottom ">
            <div class="container">
              {/* <button type="button" class="btn btn-success">Submit preferences</button> */}
              {/* <Link to="/roulette"> */}
       
                <button type="button" class="btn btn-success" onClick={navigateRecommender} >
                  Submit preferences
                </button>
              {/* </Link> */}
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
}

export default Preferences;
