import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CarList = ({selectedModell}) => {
  const [car, setCar] = useState([]);
  const [showMoreCars, setShowMoreCars] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const carData = [];
        for (let i = 0; i < 25; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          carData.push(data);
        }
        setCar(carData);
    };
  
    fetchData();
  }, []);

  const moreCars = (carsmoreCars) => {
    const toggleShowMoreCars = () => {
      setShowMoreCars(!showMoreCars);
    };
  
    const ShowCars = async () => {
      toggleShowMoreCars(); // Zustand aktualisieren
      if (!showMoreCars) {
        const carMoreData = [];
        for (let i = 25; i < 41; i++) {
          const response = await fetch(`http://localhost:8001/${i}`);
          const data = await response.json();
          carMoreData.push(data);
        }
        setCar(car.concat(carMoreData));
        toggleShowMoreCars(); // Zustand aktualisieren
      }
      else {
        // Wenn showMoreCars false ist, entferne die zusätzlichen Daten
        setCar(car.slice(0, 25));
      }
    };
  
    if (carsmoreCars) {
      return (
        <button className="moreButton" onClick={ShowCars}>v</button>
      );
    }
    return null;
  };

  const showReturn = (carsMietModelle, carsKaufModelle, carspic, carsClass, carsmoreCars, carsid) => {
      if (selectedModell==="mietmodell"){
      	if (carsMietModelle === true){
          if (carsmoreCars) return (
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars)}
              </div>
            </div>
          )
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
              {moreCars(carsmoreCars)}
            </div>
          </div>
        );
      }
      if (selectedModell==="kaufmodell"){
      	if (carsKaufModelle === true){
          if (carsmoreCars) return (
            <div className="showReturn">
              <img src={carspic} className="carsPic" />
              <div className="carClassDiv">
                <p className="carClass">{carsClass}</p>
                {moreCars(carsmoreCars)}
              </div>
            </div>
          )
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
            {moreCars(carsmoreCars)}
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
            {showReturn(cars.mietmodell, cars.kaufmodell , cars.pic, cars.class, cars.moreCars, cars.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
