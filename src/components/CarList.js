import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CarList = ({ selectedModell }) => {
  const [car, setCar] = useState([]);
  const [showMoreCars, setShowMoreCars] = useState(false);
  const [carback, setCarback] = useState([]);
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
      const carData = [];
      for (let i = 0; i < 25; i++) {
        const response = await fetch(`http://localhost:8001/${i}`);
        const data = await response.json();
        carData.push(data);
      }
      setCar(carData);
      setCarback(carData);
    };

    fetchData();
  }, []);

  const moreCars = (carsmoreCars, carsSuperiorClass, carsid) => {
    const toggleButtonValue = () => {
      setButtonValues((prevState) => ({
        ...prevState,
        [carsid]: prevState[carsid] === ">" ? "<" : ">",
      }));
    };

    const toggleShowMoreCars = () => {
      setShowMoreCars(!showMoreCars);
    };

    const ShowCars = async () => {
      toggleShowMoreCars();
      if (!showMoreCars) {
        const carMoreData = [];
        for (let i = 25; i < 41; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          if (data.superiorClass === carsSuperiorClass) {
            carMoreData.push(data);
          }
        }
        const addition = (carsid) => {
          let add = 0;
          if (carsid % 3 !== 0) {
            carsid = carsid + 1;
            if (carsid % 3 !== 0) {
              carsid = carsid + 1;
              add = 2;
            } else {
              add = 1;
            }
          }
          return add;
        };
        setCar([
          ...car.slice(0, carsid + addition(carsid)),
          ...carMoreData,
          ...car.slice(carsid + addition(carsid)),
        ]);
        toggleButtonValue(); // Buttonwert basierend auf dem ButtonId wechseln
        toggleShowMoreCars();
      } else {
        setCar(carback);
        toggleButtonValue(); // Buttonwert basierend auf dem ButtonId wechseln
        toggleShowMoreCars();
      }
    };

    if (carsmoreCars) {
      return (
        <button className="moreButton" onClick={ShowCars}>
          {buttonValues[carsid]}
        </button>
      );
    }
    return null;
  };

  const showReturn = (
    carsMietModelle,
    carsKaufModelle,
    carspic,
    carsClass,
    carsmoreCars,
    carsid,
    carsSuperiorClass
  ) => {
    if (selectedModell === "mietmodell") {
      if (carsMietModelle === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${carsid}`}>
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <img src={carspic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{carsClass}</p>
            {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
          </div>
        </div>
      );
    }
    if (selectedModell === "kaufmodell") {
      if (carsKaufModelle === true) {
        if (carsmoreCars)
          return (
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
              </div>
            </div>
          );
        return (
          <Link className="linkSpecificCar" to={`/specificCar/${carsid}`}>
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
              </div>
            </div>
          </Link>
        );
      }
      return (
        <div className="showReturnFalse">
          <img src={carspic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{carsClass}</p>
            {moreCars(carsmoreCars, carsSuperiorClass, carsid)}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="returnALL">
      <div className="cars-map">
        {car.map((cars) => (
          <div className="cars-prview" key={cars.id}>
            {showReturn(
              cars.mietmodell,
              cars.kaufmodell,
              cars.pic,
              cars.class,
              cars.moreCars,
              cars.id,
              cars.superiorClass
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
