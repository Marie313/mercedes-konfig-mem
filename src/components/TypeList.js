import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const TypeList = ({ selectedModell }) => {
  const [type, setType] = useState([]);
  const [showMoreCars, setShowMoreCars] = useState(false);
  const [typeback, setTypeback] = useState([]);
  const [buttonValues, setButtonValues] = useState({});

  useEffect(() => {
    const initialButtonValues = {};
    for (let i = 0; i < 25; i++) {
      initialButtonValues[i] = ">";
    }
    setButtonValues(initialButtonValues);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const typeData = [];
      for (let i = 0; i < 8; i++) {
        const response = await fetch(`http://localhost:8002/${i}`);
        const data = await response.json();
        typeData.push(data);
      }
      setTypeback(typeData);
      setType(typeData);
    };

    fetchData();
  }, []);

  const showReturn = (
    typesMietmodell,
    typesKaufmodell,
    typespic,
    typesclass,
    typesid,
    carsmoreCars
  ) => {
    if (selectedModell === "mietmodell") {
      if (typesMietmodell === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{typesclass}</p>
                {moreCars(carsmoreCars, typesid, typesclass)}
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${typesid}`}>
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{typesclass}</p>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <img src={typespic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{typesclass}</p>
            {moreCars(carsmoreCars, typesid, typesclass)}
          </div>
        </div>
      );
    }
    if (selectedModell === "kaufmodell") {
      if (typesKaufmodell === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{typesclass}</p>
                {moreCars(carsmoreCars, typesid, typesclass)}
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${typesid}`}>
            <div className="showReturn">
              <img src={typespic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{typesclass}</p>
                {moreCars(carsmoreCars, typesid, typesclass)}
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <img src={typespic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{typesclass}</p>
            {moreCars(carsmoreCars, typesid, typesclass)}
          </div>
        </div>
      );
    }
  };

  const moreCars = (carsmoreCars, typesid, typeskarosserie) => {
    const toggleButtonValue = () => {
      setButtonValues((prevState) => ({
        ...prevState,
        [typesid]: prevState[typesid] === ">" ? "<" : ">",
      }));
    };

    const toggleShowMoreCars = () => {
      setShowMoreCars(!showMoreCars);
    };

    const ShowCars = async () => {
      if (!showMoreCars) {
        const carMoreData = [];
        for (let i = 0; i < 41; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          if (data.karosserie === typeskarosserie) {
            carMoreData.push(data);
          }
        }
        setType([
          ...type.slice(0, typesid),
          ...carMoreData,
          ...type.slice(typesid),
        ]);
        toggleShowMoreCars();
        toggleButtonValue();
        return <div className="newCars"></div>;
      } else {
        setType(typeback);
        toggleButtonValue();
        toggleShowMoreCars();
      }
    };
    if (carsmoreCars) {
      return (
        <button className="moreButton" onClick={ShowCars}>
          {buttonValues[typesid]}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="returnALL">
      <div className="cars-map">
        {type.map((types) => (
          <div className="cars-prview" key={types.id}>
            {showReturn(
              types.mietmodell,
              types.kaufmodell,
              types.pic,
              types.class,
              types.id,
              types.moreCars
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeList;
