import { useEffect, useState } from "react";

const CarList = () => {
  const [car, setCar] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/cars")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCar(data);
      });
  }, []);

  const showReturn = (carsAvailable, carspic, carsClass) => {
    if (carsAvailable === true) return (
        <div className="showReturn">
          <img src={carspic} className="carsPic" />
          <div className="carClassDiv">
            <p className="carClass">{carsClass}</p>
          </div>
        </div>
      );
    return (
      <div className="showReturnFalse">
        <img src={carspic} className="carsPic" />
        <div className="carClassDiv">
          <p className="carClass">{carsClass}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="returnALL">
      <div className="cars-map">
        {car.map((cars) => (
          <div className="cars-prview" key={cars.id}>
            {showReturn(cars.available, cars.pic, cars.class)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
